"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button/Button";
import AuthNavModal from "@/components/modals/AuthNavModal/AuthNavModal";
import { useToggleSavedStory } from "@/lib/hooks/useToggleSavedStory";

interface StorySaveIconButtonProps {
  storyId: string;
}

export default function StorySaveIconButton({
  storyId,
}: StorySaveIconButtonProps) {
  const { isSaved, isLoading, toggle } = useToggleSavedStory(storyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const success = await toggle();

    // if (success) {
    //   router.refresh();
    // }

    if (!success) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Button
        type="button"
        // variant="secondary"
        variant={isSaved ? "saved" : "secondary"}
        iconOnly
        onClick={handleClick}
        disabled={isLoading}
      >
        <svg width={24} height={24}>
          <use href="/sprite-final-opt.svg#icon-bookmark" />
        </svg>
      </Button>

      <AuthNavModal
        isOpen={isModalOpen}
        onLogIn={() => {
          setIsModalOpen(false);
          router.push("/auth/login");
        }}
        onRegister={() => {
          setIsModalOpen(false);
          router.push("/auth/register");
        }}
        onClose={() => setIsModalOpen(false)}
        title="Помилка під час збереження"
        message="Щоб зберегти статтю вам треба увійти або зареєструватися"
        LoginText="Увійти"
        RegisterText="Зареєструватись"
      />
    </>
  );
}
