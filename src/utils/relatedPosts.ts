import type { CollectionEntry } from "astro:content";

/**
 * Find posts related to a given post based on shared tags.
 * Excludes the current post and sorts by number of matching tags (descending).
 *
 * @param currentPostId - ID of the current post
 * @param allPosts - Array of all posts in the collection
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related posts, sorted by relevance
 */
export function getRelatedPosts(
  currentPostId: string,
  allPosts: CollectionEntry<"blog" | "notes">[],
  limit: number = 3
): CollectionEntry<"blog" | "notes">[] {
  const currentPost = allPosts.find((post) => post.id === currentPostId);
  if (!currentPost || !currentPost.data.tags?.length) {
    return [];
  }

  const currentTags = new Set(currentPost.data.tags);

  // Calculate relevance score for each post
  const relatedPosts = allPosts
    .filter((post) => post.id !== currentPostId) // Exclude current post
    .map((post) => {
      const matchingTags = post.data.tags?.filter((tag) =>
        currentTags.has(tag)
      ) || [];
      return {
        post,
        matchCount: matchingTags.length,
      };
    })
    .filter((item) => item.matchCount > 0) // Only include posts with shared tags
    .sort((a, b) => b.matchCount - a.matchCount) // Sort by most matching tags
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}
