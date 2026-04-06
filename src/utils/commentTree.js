/**
 * Converts a flat list of comments into a nested tree structure.
 * Each comment must have an `id` and a `parent` field (0 if root-level).
 * Orphaned comments (parent not found) are treated as root-level.
 */
export function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c.id] = { ...c, children: [] };
  });

  comments.forEach((c) => {
    if (c.parent === 0) {
      roots.push(map[c.id]);
    } else if (map[c.parent]) {
      map[c.parent].children.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
}
