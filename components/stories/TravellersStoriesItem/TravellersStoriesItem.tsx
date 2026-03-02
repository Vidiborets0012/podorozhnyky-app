"use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { Story } from "@/types";
// import { addToFavorite, removeFromFavorite } from "@/lib/api/clientApi";
// import useAuthStore from "@/lib/store/authStore";
// import styles from "./TravellersStoriesItem.module.css";

// interface Props {
//   story: Story;
//   isAuthenticated: boolean;
// }

// export function TravellersStoriesItem({ story, isAuthenticated }: Props) {
//   const user = useAuthStore((s) => s.user);
//   const setUser = useAuthStore((s) => s.setUser);

//   const [isLoading, setIsLoading] = useState(false);

//   // 🔥 ЛОКАЛЬНИЙ count для optimistic update
//   const [localFavoriteCount, setLocalFavoriteCount] = useState(
//     story.favoriteCount ?? 0,
//   );

//   const isSaved = user?.savedStories?.includes(story._id) ?? false;

//   const handleToggleLike = async () => {
//     if (!isAuthenticated || !user) return;

//     const wasSaved = isSaved;

//     // 🔥 1. Оптимістично міняємо count
//     setLocalFavoriteCount((prev) => (wasSaved ? prev - 1 : prev + 1));

//     try {
//       setIsLoading(true);

//       let updatedSavedStories: string[];

//       if (wasSaved) {
//         updatedSavedStories = await removeFromFavorite(story._id);
//       } else {
//         updatedSavedStories = await addToFavorite(story._id);
//       }

//       // 🔥 2. Оновлюємо user у zustand
//       setUser({
//         ...user,
//         savedStories: updatedSavedStories,
//       });
//     } catch (error) {
//       console.error("Toggle favorite failed", error);

//       // ❗ 3. Якщо помилка — відкочуємо count назад
//       setLocalFavoriteCount((prev) => (wasSaved ? prev + 1 : prev - 1));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <li className={styles.storyCard}>
//       <Image
//         src={
//           story?.img ??
//           "https://ac.goit.global/fullstack/react/default-avatar.jpg"
//         }
//         alt={story.title}
//         className={styles.storyImg}
//         width={400}
//         height={200}
//       />

//       <div className={styles.storyContent}>
//         <div className={styles.content}>
//           <span className={styles.storyRegion}>
//             {story.category?.name ?? "Без категорії 😱"}
//           </span>

//           <h3>{story?.title ?? "Назви ще немає 🥲"}</h3>

//           <p className={styles.storyArticle}>
//             {story?.article ?? "Опису поки не додали 🤨"}
//           </p>
//         </div>

//         <StoryAuthor
//           author={story.ownerId}
//           date={new Date(story.date).toLocaleDateString("uk-UA")}
//           savedNumber={localFavoriteCount}
//         />

//         <div className={styles.cardActions}>
//           <Link className={styles.storyViewBtn} href={`/stories/${story._id}`}>
//             Переглянути статтю
//           </Link>

//           <button
//             className={isSaved ? styles.likeBtnSaved : styles.likeBtnNotSaved}
//             onClick={handleToggleLike}
//             disabled={isLoading}
//           >
//             <svg
//               className={isSaved ? styles.iconSaved : styles.iconNotSaved}
//               width={24}
//               height={24}
//             >
//               <use href="/sprite-final-opt.svg#icon-bookmark" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </li>
//   );
// }

// interface StoryAuthorProps {
//   author: Author;
//   date: string;
//   savedNumber: number;
// }

// export type Author = {
//   _id: string;
//   name: string;
//   avatarUrl: string;
// };

// function StoryAuthor({ author, date, savedNumber }: StoryAuthorProps) {
//   return (
//     <div className={styles.storyMeta}>
//       <Image
//         src={
//           author?.avatarUrl ??
//           "https://ac.goit.global/fullstack/react/default-avatar.jpg"
//         }
//         alt={author?.name ?? "Unknown 😱"}
//         width={48}
//         height={48}
//         className={styles.avatar}
//       />

//       <div>
//         <h6 className={styles.author}>{author?.name ?? "Unknown 😱"}</h6>

//         <div className={styles.meta}>
//           <span className={styles.favoriteCount}>{date}</span>
//           <span className={styles.point}>●</span>
//           <span className={styles.savedNumber}>{savedNumber}</span>

//           <svg width={24} height={24}>
//             <use href="/sprite-final-opt.svg#icon-bookmark" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Story } from "@/types";
import { useToggleSavedStory } from "@/lib/hooks/useToggleSavedStory";
import styles from "./TravellersStoriesItem.module.css";

interface Props {
  story: Story;
}

export function TravellersStoriesItem({ story }: Props) {
  const { isSaved, isLoading, toggle } = useToggleSavedStory(story._id);

  const [localFavoriteCount, setLocalFavoriteCount] = useState(
    story.favoriteCount ?? 0,
  );

  const handleToggleLike = async () => {
    const wasSaved = isSaved;

    // 🔥 optimistic count
    setLocalFavoriteCount((prev) => (wasSaved ? prev - 1 : prev + 1));

    const success = await toggle();

    // ❗ rollback якщо помилка
    if (!success) {
      setLocalFavoriteCount((prev) => (wasSaved ? prev + 1 : prev - 1));
    }
  };

  return (
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
          <Link className={styles.storyViewBtn} href={`/stories/${story._id}`}>
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
        </div>
      </div>
    </li>
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
