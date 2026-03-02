// "use client";

// import Button from "@/components/common/Button/Button";
// import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
// import useAuthStore from "@/lib/store/authStore";
// import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";

// interface SaveButtonProps {
//   storyId: string;
//   isSaved: boolean;
//   setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function SaveButton({
//   storyId,
//   isSaved,
//   setIsSaved,
// }: SaveButtonProps) {
//   const router = useRouter();
//   const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

//   const mutation = useMutation({
//     mutationFn: (shouldSave: boolean) =>
//       shouldSave ? addToFavorite(storyId) : removeFromFavorite(storyId),

//     onMutate: (shouldSave) => {
//       setIsSaved(shouldSave); //  миттєве оновлення UI
//     },

//     onError: (_, shouldSave) => {
//       setIsSaved(!shouldSave); //  rollback
//       alert("Помилка. Спробуйте ще раз.");
//     },

//     onSuccess: () => {
//       router.refresh(); // щоб серверні дані підтягнулись
//     },
//   });

//   const handleClick = () => {
//     if (!isAuthenticated) {
//       alert("Щоб зберегти статтю, потрібно увійти.");
//       return;
//     }

//     const shouldSave = !isSaved;
//     mutation.mutate(shouldSave);
//   };

//   return (
//     <Button
//       type="button"
//       variant={isSaved ? "saved" : "primary"}
//       onClick={handleClick}
//       disabled={mutation.isPending}
//     >
//       {mutation.isPending ? "..." : isSaved ? "Збережено" : "Зберегти"}
//     </Button>
//   );
// }

"use client";

import Button from "@/components/common/Button/Button";
import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import { useState } from "react";

interface SaveButtonProps {
  storyId: string;
  isSaved: boolean;
}

export default function SaveButton({ storyId, isSaved }: SaveButtonProps) {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      alert("Щоб зберегти статтю, потрібно увійти.");
      return;
    }

    try {
      setIsLoading(true);

      let updatedSavedStories: string[];

      if (isSaved) {
        updatedSavedStories = await removeFromFavorite(storyId);
      } else {
        updatedSavedStories = await addToFavorite(storyId);
      }

      setUser({
        ...user,
        savedStories: updatedSavedStories,
      });
    } catch (error) {
      console.error("Save failed", error);
      alert("Помилка. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={isSaved ? "saved" : "primary"}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "..." : isSaved ? "Збережено" : "Зберегти"}
    </Button>
  );
}
