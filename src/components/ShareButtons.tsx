import { useState } from 'react';

interface Props {
  menuName: string;
  category: string;
}

const SITE_URL = 'https://jydev-jocoding.pages.dev';

export default function ShareButtons({ menuName, category }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `오늘 저녁은 "${menuName}" 어때요? 🍽️`;
  const shareUrl = SITE_URL;

  // 네이티브 공유 (모바일)
  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareText, url: shareUrl });
      } catch { /* 취소 */ }
    }
  }

  // 카카오톡 공유 (SDK)
  function handleKakao() {
    const kakao = (window as any).Kakao;
    if (kakao?.isInitialized()) {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '오늘 뭐 먹지?',
          description: shareText,
          imageUrl: 'https://jydev-jocoding.pages.dev/og-image.png',
          link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
        },
      });
    } else {
      // SDK 미로드 fallback: 링크 복사 후 안내
      navigator.clipboard.writeText(shareUrl).catch(() => {});
      alert('카카오톡 앱에서 링크를 직접 공유해 주세요.\n링크가 복사되었습니다.');
    }
  }

  // 트위터/X
  function handleTwitter() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  }

  // 페이스북
  function handleFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=580,height=480');
  }

  // 링크 복사
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = shareUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="mt-6 pt-6 border-t border-outline-variant/20">
      <p className="text-sm font-semibold text-on-surface-variant mb-3 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">share</span>
        <span className="font-headline">{category} 추천 결과 공유하기</span>
      </p>
      <div className="flex flex-wrap gap-2">

        {/* 카카오톡 */}
        <button
          onClick={handleKakao}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 hover:opacity-90"
          style={{ backgroundColor: '#FEE500', color: '#3C1E1E' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.54 1.524 4.777 3.837 6.18L4.5 21l4.373-2.916A11.8 11.8 0 0 0 12 18c5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
          </svg>
          카카오톡
        </button>

        {/* 트위터/X */}
        <button
          onClick={handleTwitter}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-black text-white transition-all active:scale-95 hover:opacity-80"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X (트위터)
        </button>

        {/* 페이스북 */}
        <button
          onClick={handleFacebook}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 hover:opacity-90"
          style={{ backgroundColor: '#1877F2', color: '#fff' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          페이스북
        </button>

        {/* 링크 복사 */}
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-surface-container text-on-surface hover:bg-surface-container-high dark:bg-zinc-700 dark:text-zinc-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {copied ? 'check' : 'link'}
          </span>
          {copied ? '복사됨!' : '링크 복사'}
        </button>

        {/* 모바일 네이티브 공유 */}
        {hasNativeShare && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold bg-primary text-white transition-all active:scale-95 hover:opacity-90"
          >
            <span className="material-symbols-outlined text-base">ios_share</span>
            더보기
          </button>
        )}
      </div>
    </div>
  );
}
