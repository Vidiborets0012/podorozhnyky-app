"use client";

import Button from "@/components/common/Button/Button";
import { useToggleSavedStory } from "@/lib/hooks/useToggleSavedStory";

interface SaveButtonProps {
  storyId: string;
}

export default function SaveButton({ storyId }: SaveButtonProps) {
  const { isSaved, isLoading, toggle } = useToggleSavedStory(storyId);

  return (
    <Button
      type="button"
      variant={isSaved ? "saved" : "primary"}
      onClick={toggle}
      disabled={isLoading}
    >
      {isLoading ? "..." : isSaved ? "Збережено" : "Зберегти"}
    </Button>
  );
}
