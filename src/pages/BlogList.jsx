import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import SectionWrapper, { RevealItem } from '../components/ui/SectionWrapper'
import FlatCard from '../components/ui/FlatCard'
import PillButton from '../components/ui/PillButton'
import { Badge } from '../components/ui/Badge'
import { SkeletonCard } from '../components/ui/Skeleton'
import { EmptyState, ErrorState } from '../components/ui/EmptyState'
import { api } from '../lib/api'
import { useDocumentHead } from '../lib/seo'
import { usePagination } from '../hooks/usePagination'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogList() {
  useDocumentHead({ title: 'Blog', description: 'Training notes and studio updates from Fit Elegant Gym & Café.' })
  const { data: posts, isLoading, isError, refetch } = useQuery({ queryKey: ['blogPosts'], queryFn: api.getBlogPosts })
  const { visible, hasMore, loadMore } = usePagination(posts ?? [], 6)

  return (
    <div className="pt-14">
      <SectionWrapper eyebrow="Blog" title="Training notes & studio updates" subtitle="Sample posts shown below — real articles to be added by the client.">
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {isError && <ErrorState onRetry={refetch} />}

        {posts && posts.length === 0 && (
          <EmptyState title="No posts yet" description="Check back soon for training tips and studio updates." />
        )}

        {posts && posts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <RevealItem key={post.id}>
                <Link to={`/blog/${post.slug}`}>
                  <FlatCard className="group flex h-full flex-col overflow-hidden">
                    <div className="aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.map((t) => <Badge key={t}>{t}</Badge>)}
                      </div>
                      <h3 className="font-body text-lg font-bold normal-case leading-snug text-white">{post.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-ink-muted">{post.excerpt}</p>
                      <p className="mt-4 text-xs text-ink-muted">{formatDate(post.date)} · {post.readMinutes} min read</p>
                    </div>
                  </FlatCard>
                </Link>
              </RevealItem>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <PillButton variant="dark" onClick={loadMore}>Load More</PillButton>
          </div>
        )}
      </SectionWrapper>
    </div>
  )
}
