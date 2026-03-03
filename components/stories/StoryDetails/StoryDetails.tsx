"use client";

import Image from "next/image";
import { Story } from "@/types";
import styles from "./StoryDetails.module.css";
import SaveButton from "./SaveButton.client";

interface StoryDetailsProps {
  story: Story;
}

export default function StoryDetails({ story }: StoryDetailsProps) {
  if (!story || !story.img) return null;

  return (
    <article className={styles.article}>
      <div className="container">
        <h1 className={styles.title}>{story.title}</h1>

        <div className={styles.meta}>
          <div className={styles.metaInfoInner}>
            <div className={styles.infoGroup}>
              <p>
                <strong>Автор статті:</strong>{" "}
                {story.ownerId?.name || "Мандрівник"}
              </p>
              <p>
                <strong>Опубліковано:</strong> {story.date}
              </p>
            </div>
            <span className={styles.categoryBadge}>{story.category?.name}</span>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={story.img}
              alt={story.title}
              fill
              sizes="(max-width: 767px) 100vw, 1312px"
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.textBlock}>{story.article}</div>

          <aside className={styles.saveAside}>
            <div className={styles.saveCard}>
              <p>Збережіть собі історію</p>

              <SaveButton storyId={story._id} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
