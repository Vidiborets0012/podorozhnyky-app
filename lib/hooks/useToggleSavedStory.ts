// import { useState } from "react";
// import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
// import useAuthStore from "@/lib/store/authStore";

// export function useToggleSavedStory(storyId: string) {
//   const user = useAuthStore((s) => s.user);
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
//   const addSavedStory = useAuthStore((s) => s.addSavedStory);
//   const removeSavedStory = useAuthStore((s) => s.removeSavedStory);

//   const [isLoading, setIsLoading] = useState(false);

//   const savedStories = user?.savedStories ?? [];
//   const isSaved = savedStories.includes(storyId);

//   const toggle = async () => {
//     if (!isAuthenticated) return false;

//     try {
//       setIsLoading(true);

//       if (isSaved) {
//         await removeFromFavorite(storyId);
//         removeSavedStory(storyId);
//       } else {
//         await addToFavorite(storyId);
//         addSavedStory(storyId);
//       }

//       return true;
//     } catch (error) {
//       console.error("Toggle failed", error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isSaved, isLoading, toggle };
// }

// export function useToggleSavedStory(storyId: string) {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
//   const savedStories = useAuthStore((s) => s.user?.savedStories ?? []);
//   const addSavedStory = useAuthStore((s) => s.addSavedStory);
//   const removeSavedStory = useAuthStore((s) => s.removeSavedStory);

//   const [isLoading, setIsLoading] = useState(false);

//   const isSaved = savedStories.includes(storyId);

//   const toggle = async () => {
//     if (!isAuthenticated) return false;

//     try {
//       setIsLoading(true);

//       if (isSaved) {
//         await removeFromFavorite(storyId);
//         removeSavedStory(storyId);
//       } else {
//         await addToFavorite(storyId);
//         addSavedStory(storyId);
//       }

//       return true;
//     } catch (error) {
//       console.error("Toggle failed", error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isSaved, isLoading, toggle };
// }

import { useState } from "react";
import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";

export function useToggleSavedStory(storyId: string) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const addSavedStory = useAuthStore((s) => s.addSavedStory);
  const removeSavedStory = useAuthStore((s) => s.removeSavedStory);

  const [isLoading, setIsLoading] = useState(false);

  const savedStories = user?.savedStories || [];
  const isSaved = savedStories.includes(storyId);

  const toggle = async () => {
    if (!isAuthenticated) return false;

    try {
      setIsLoading(true);

      if (isSaved) {
        await removeFromFavorite(storyId);
        removeSavedStory(storyId);
      } else {
        await addToFavorite(storyId);
        addSavedStory(storyId);
      }

      return true;
    } catch (error) {
      console.error("Toggle failed", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isSaved, isLoading, toggle };
}
