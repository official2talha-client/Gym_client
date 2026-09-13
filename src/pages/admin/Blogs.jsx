import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FlatCard from '../../components/ui/FlatCard'
import PillButton from '../../components/ui/PillButton'
import Drawer from '../../components/Drawer'
import { Skeleton } from '../../components/ui/Skeleton'
import { ErrorState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { api } from '../../lib/api'

export default function Blogs() {
  const [editing, setEditing] = useState(null)
  const [isNew, setIsNew] = useState(false)
  const { push } = useToast()
  const queryClient = useQueryClient()
  const { data: posts, isLoading, isError, refetch } = useQuery({ queryKey: ['blogPosts'], queryFn: api.getBlogPosts })

  const mutation = useMutation({
    mutationFn: (record) => api.saveRecord('blogPosts', record),
    onSuccess: () => {
      push(isNew ? 'Post created.' : 'Post updated.', { tone: 'success' })
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] })
      setEditing(null)
    },
  })

  const openNew = () => {
    setIsNew(true)
    setEditing({ title: '', excerpt: '', body: '' })
  }
  const openEdit = (post) => {
    setIsNew(false)
    setEditing(post)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-muted">{posts?.length ?? 0} posts published</p>
        <PillButton variant="orange" size="sm" onClick={openNew}>New Post</PillButton>
      </div>

      {isLoading && <div className="space-y-3">{[0, 1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}</div>}
      {isError && <ErrorState onRetry={refetch} />}

      {posts && (
        <div className="space-y-3">
          {posts.map((p) => (
            <FlatCard key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img src={p.coverImage} alt={p.title} className="h-14 w-20 shrink-0 rounded-lg object-cover" />
                <div>
                  <p className="font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-ink-muted">{p.author} · {p.readMinutes} min read</p>
                </div>
              </div>
              <PillButton size="sm" variant="dark" onClick={() => openEdit(p)}>Edit</PillButton>
            </FlatCard>
          ))}
        </div>
      )}

      <Drawer open={!!editing} onClose={() => setEditing(null)} title={isNew ? 'New Post' : 'Edit Post'}>
        {editing && (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); mutation.mutate(editing) }}>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="post-title">Title</label>
              <input id="post-title" defaultValue={editing.title} className="w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="post-excerpt">Excerpt</label>
              <textarea id="post-excerpt" rows={2} defaultValue={editing.excerpt} className="w-full resize-none rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white" htmlFor="post-body">Body</label>
              <textarea id="post-body" rows={6} defaultValue={editing.body} className="w-full resize-none rounded-xl border border-white/10 bg-base px-4 py-3 text-white focus:border-accent" />
            </div>
            <PillButton type="submit" variant="orange" loading={mutation.isPending} className="w-full justify-center">
              {isNew ? 'Publish Post' : 'Save Changes'}
            </PillButton>
          </form>
        )}
      </Drawer>
    </div>
  )
}
