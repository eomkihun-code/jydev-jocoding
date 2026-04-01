import { useState } from 'react';
import { useNaverBlog } from '../hooks/useNaverBlog';
import { NaverBlogItem } from '../types';

interface Props {
  menuName: string;
}

function BlogCard({ item }: { item: NaverBlogItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-zinc-700 hover:bg-zinc-600 transition-colors border border-zinc-600 hover:border-zinc-500"
    >
      <p className="text-sm font-semibold text-white line-clamp-2 mb-1">{item.title}</p>
      <p className="text-xs text-brand-400 font-medium mb-2">{item.bloggername}</p>
      <p className="text-xs text-zinc-400 line-clamp-2">{item.description}</p>
    </a>
  );
}

export default function NaverBlogResults({ menuName }: Props) {
  const { items, loading, error, search, reset } = useNaverBlog();
  const [opened, setOpened] = useState(false);

  function handleClick() {
    if (opened) {
      reset();
      setOpened(false);
    } else {
      search(menuName);
      setOpened(true);
    }
  }

  return (
    <div className="mt-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-600
          text-sm font-semibold text-zinc-300 hover:bg-zinc-700 transition-colors disabled:opacity-60"
      >
        {loading
          ? '🔍 검색 중...'
          : opened
            ? '✕ 블로그 레시피 닫기'
            : '📝 블로그 레시피 더보기'}
      </button>

      {opened && !loading && (
        <div className="mt-3 space-y-2">
          {error && (
            <p className="text-center text-zinc-500 text-sm py-4">
              검색 결과를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          )}
          {!error && items.length === 0 && (
            <p className="text-center text-zinc-500 text-sm py-4">검색 결과가 없어요.</p>
          )}
          {items.map((item, i) => (
            <BlogCard key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
