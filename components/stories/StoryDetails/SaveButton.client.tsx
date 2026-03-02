"use client";

import Button from "@/components/common/Button/Button";
import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
import useAuthStore from "@/lib/store/authStore";
import { useState } from "react";

interface SaveButtonProps {
  storyId: string;
  // isSaved: boolean;
}

export default function SaveButton({ storyId }: SaveButtonProps) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const addSavedStory = useAuthStore((s) => s.addSavedStory);
  const removeSavedStory = useAuthStore((s) => s.removeSavedStory);

  const [isLoading, setIsLoading] = useState(false);

  const savedStories = user?.savedStories ?? [];
  const isSaved = savedStories.includes(storyId);

  const handleClick = async () => {
    if (!isAuthenticated) {
      alert("Щоб зберегти статтю, потрібно увійти.");
      return;
    }

    try {
      setIsLoading(true);

      if (isSaved) {
        await removeFromFavorite(storyId);
        removeSavedStory(storyId);
      } else {
        await addToFavorite(storyId);
        addSavedStory(storyId);
      }
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
