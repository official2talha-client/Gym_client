import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import SectionWrapper from '../components/ui/SectionWrapper'
import { Badge } from '../components/ui/Badge'
import PillButton from '../components/ui/PillButton'
import { Skeleton } from '../components/ui/Skeleton'
import { ErrorState } from '../components/ui/EmptyState'
import { api } from '../lib/api'
import { useDocumentHead } from '../lib/seo'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const { data: post, isLoading, isError, refetch } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => api.getBlogPostBySlug(slug),
  })

  useDocumentHead({
    title: post?.title ?? 'Blog',
    description: post?.excerpt ?? 'Training notes and studio updates from Fit Elegant Gym & Café.',
    image: post?.coverImage,
    type: 'article',
  })

  if (isLoading) {
    return (
      <div className="container-page pt-32">
        <Skeleton className="mb-6 h-8 w-1/2" />
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container-page pt-32 pb-20">
        <ErrorState onRetry={refetch} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container-page pt-32 pb-20 text-center">
        <h1 className="font-display text-3xl text-white">Post not found</h1>
        <PillButton to="/blog" variant="orange" className="mt-6">Back to Blog</PillButton>
      </div>
    )
  }

  return (
    <div className="pt-28">
      <SectionWrapper className="max-w-3xl">
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
        <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-ink-muted">
          {post.author} · {formatDate(post.date)} · {post.readMinutes} min read
        </p>
        <img src={post.coverImage} alt={post.title} className="my-8 aspect-[16/9] w-full rounded-2xl object-cover" />
        <p className="text-base leading-relaxed text-ink-muted">{post.body}</p>
        <PillButton to="/blog" variant="dark" className="mt-10">Back to Blog</PillButton>
      </SectionWrapper>
    </div>
  )
}
