import { useMemo, useState } from 'react'

/**
 * Client-side pagination for list views (members, blog, gallery, reviews).
 * Mock data collections are small right now, so this works entirely in
 * memory -- once a real backend exists, swap this for cursor/offset params
 * passed to the query function, keeping the same `visible`/`hasMore`/`loadMore`
 * shape so consuming components don't change.
 */
export function usePagination(items = [], pageSize = 6) {
  const [page, setPage] = useState(1)

  const visible = useMemo(() => items.slice(0, page * pageSize), [items, page, pageSize])
  const hasMore = visible.length < items.length

  return {
    visible,
    hasMore,
    loadMore: () => setPage((p) => p + 1),
    reset: () => setPage(1),
  }
}
