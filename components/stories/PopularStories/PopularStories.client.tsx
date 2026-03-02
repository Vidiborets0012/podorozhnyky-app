// "use client";

// import { TravellersStoriesItem } from "@/components/stories/TravellersStoriesItem/TravellersStoriesItem";
// import styles from "./PopularStories.module.css";
// import { Story } from "@/types/index";
// // import { useEffect, useState } from 'react';
// import useAuthStore from "@/lib/store/authStore";

// interface PopularStoriesClientProps {
//   stories: Story[];
// }

// export function PopularStoriesClient({ stories }: PopularStoriesClientProps) {
//   const user = useAuthStore((state) => state.user);
//   const isAuthenticated = !!user?._id;

//   // 🔥 Єдине джерело істини для isSaved
//   const storiesWithFlag = isAuthenticated
//     ? stories.map((story) => ({
//         ...story,
//         isSaved: user.savedStories?.includes(story._id) || false,
//       }))
//     : stories;

//   return (
//     <ul className={styles.storyList}>
//       {storiesWithFlag.map((story) => (
//         <TravellersStoriesItem
//           key={story._id}
//           story={story}
//           isAuthenticated={isAuthenticated}
//         />
//       ))}
//     </ul>
//   );
// }

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
