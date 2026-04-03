import { useState } from 'react';
import { useNaverBlog } from '../hooks/useNaverBlog';
import { NaverBlogItem } from '../types';

interface Props { menuName: string; }

function BlogCard({ item }: { item: NaverBlogItem }) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600">
      <p className="text-sm font-semibold text-on-surface dark:text-zinc-100 line-clamp-2 mb-1">{item.title}</p>
      <p className="text-xs text-primary font-medium mb-2">{item.bloggername}</p>
      <p className="text-xs text-on-surface-variant dark:text-zinc-400 line-clamp-2">{item.description}</p>
    </a>
  );
}

export default function NaverBlogResults({ menuName }: Props) {
  const { items, loading, error, search, reset } = useNaverBlog();
  const [opened, setOpened] = useState(false);

  function handleClick() {
    if (opened) { reset(); setOpened(false); }
    else { search(menuName); setOpened(true); }
  }

  return (
    <div className="mt-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 p-4 border border-outline-variant/30 rounded-lg text-on-surface-variant/70 hover:bg-surface-container/30 hover:text-on-surface transition-all text-sm disabled:opacity-60"
      >
        <span className="material-symbols-outlined text-lg opacity-60">article</span>
        <span className="font-headline italic">
          {loading ? '검색 중...' : opened ? '블로그 레시피 닫기' : '블로그 레시피 더보기'}
        </span>
      </button>

      {opened && !loading && (
        <div className="mt-3 space-y-2">
          {error && <p className="text-center text-on-surface-variant text-sm py-4">검색 결과를 불러오지 못했어요.</p>}
          {!error && items.length === 0 && <p className="text-center text-on-surface-variant text-sm py-4">검색 결과가 없어요.</p>}
          {items.map((item, i) => <BlogCard key={i} item={item} />)}
        </div>
      )}
    </div>
  );
}
