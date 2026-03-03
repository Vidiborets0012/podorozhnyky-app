"use client";

import { TravellersStoriesItem } from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
import styles from "./PopularStories.module.css";
import { Story } from "@/types";

interface PopularStoriesClientProps {
  stories: Story[];
}

export function PopularStoriesClient({ stories }: PopularStoriesClientProps) {
  return (
    <ul className={styles.storyList}>
      {stories.map((story) => (
        <TravellersStoriesItem key={story._id} story={story} />
      ))}
    </ul>
  );
}
