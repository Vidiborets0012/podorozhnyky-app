"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Story } from "@/types";
import { useToggleSavedStory } from "@/lib/hooks/useToggleSavedStory";
import styles from "./TravellersStoriesItem.module.css";
import AuthNavModal from "@/components/modals/AuthNavModal/AuthNavModal";
import { useRouter } from "next/navigation";
// import StorySaveIconButton from "./StorySaveIconButton";

interface Props {
  story: Story;
}

export function TravellersStoriesItem({ story }: Props) {
  const { isSaved, isLoading, toggle } = useToggleSavedStory(story._id);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 БАЗОВИЙ лічильник з бекенду
  const baseCount = story.favoriteCount ?? 0;

  // 🔥 Derived значення (без useState!)
  const localFavoriteCount = isSaved ? baseCount + 1 : baseCount;
  // const localFavoriteCount = story.favoriteCount ?? 0;

  const handleToggleLike = async () => {
    const success = await toggle();

    if (!success) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <li className={styles.storyCard}>
        <Image
          src={
            story?.img ??
            "https://ac.goit.global/fullstack/react/default-avatar.jpg"
          }
          alt={story.title}
          className={styles.storyImg}
          width={400}
          height={200}
        />

        <div className={styles.storyContent}>
          <div className={styles.content}>
            <span className={styles.storyRegion}>
              {story.category?.name ?? "Без категорії 😱"}
            </span>

            <h3>{story?.title ?? "Назви ще немає 🥲"}</h3>

            <p className={styles.storyArticle}>
              {story?.article ?? "Опису поки не додали 🤨"}
            </p>
          </div>

          <StoryAuthor
            author={story.ownerId}
            date={new Date(story.date).toLocaleDateString("uk-UA")}
            savedNumber={localFavoriteCount}
          />

          <div className={styles.cardActions}>
            <Link
              className={styles.storyViewBtn}
              href={`/stories/${story._id}`}
            >
              Переглянути статтю
            </Link>
            <button
              className={isSaved ? styles.likeBtnSaved : styles.likeBtnNotSaved}
              onClick={handleToggleLike}
              disabled={isLoading}
            >
              <svg
                className={isSaved ? styles.iconSaved : styles.iconNotSaved}
                width={24}
                height={24}
              >
                <use href="/sprite-final-opt.svg#icon-bookmark" />
              </svg>
            </button>
            {/* <StorySaveIconButton storyId={story._id} /> */}
          </div>
        </div>
      </li>

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

interface StoryAuthorProps {
  author: Author;
  date: string;
  savedNumber: number;
}

export type Author = {
  _id: string;
  name: string;
  avatarUrl: string;
};

function StoryAuthor({ author, date, savedNumber }: StoryAuthorProps) {
  return (
    <div className={styles.storyMeta}>
      <Image
        src={
          author?.avatarUrl ??
          "https://ac.goit.global/fullstack/react/default-avatar.jpg"
        }
        alt={author?.name ?? "Unknown 😱"}
        width={48}
        height={48}
        className={styles.avatar}
      />

      <div>
        <h6 className={styles.author}>{author?.name ?? "Unknown 😱"}</h6>

        <div className={styles.meta}>
          <span className={styles.favoriteCount}>{date}</span>
          <span className={styles.point}>●</span>
          <span className={styles.savedNumber}>{savedNumber}</span>

          <svg width={24} height={24}>
            <use href="/sprite-final-opt.svg#icon-bookmark" />
          </svg>
        </div>
      </div>
    </div>
  );
}

{
  /* <Button iconOnly aria-label="Save">
              <svg width="24" height="24">
                <use href="/sprite-final-opt.svg#icon-bookmark" />
              </svg>
            </Button> */
}
