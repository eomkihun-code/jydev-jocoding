import SEOHead from '../components/SEOHead';

export default function Privacy() {
  return (
    <div className="w-full max-w-3xl px-4 py-12 mx-auto">
      <SEOHead 
        title="개인정보처리방침" 
        description="오늘 뭐 먹지 서비스의 개인정보처리방침 안내입니다."
      />
      
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black mb-4">개인정보처리방침 (Privacy Policy)</h1>
        <p className="text-zinc-500 text-sm">최종 수정일: 2026년 4월 1일</p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 bg-white dark:bg-zinc-800/50 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-700">
        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">1. 개인정보의 수집 및 이용 목적</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            &lt;오늘 뭐 먹지?&gt; (이하 "서비스")는 구글 애드센스 등 제3자 광고 사업자가 맞춤형 광고를 게재하기 위해 쿠키(Cookies)를 통해 이용자의 브라우저 정보 및 방문 기록 등을 익명화된 상태로 수집할 수 있습니다. 수집된 정보는 서비스의 원활한 운영 및 광고 품질 향상의 목적으로만 사용됩니다.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">2. 제3자 쿠키(Cookies) 사용에 대한 안내</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            Google 등의 제3자 공급업체는 쿠키를 사용하여 사용자가 당사 웹사이트 또는 다른 웹사이트를 방문한 기록을 기반으로 광고를 게재합니다. 
            Google에서 광고 쿠키를 사용하면 Google 및 해당 파트너가 인터넷의 당사 사이트 및/또는 다른 사이트 방문 기록을 바탕으로 사용자에게 맞춤 광고(AdSense)를 게재할 수 있습니다.
            사용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline">광고 설정</a>을 방문하여 맞춤 광고 목적의 쿠키 사용을 중지할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">3. 개인정보 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 이용자는 웹 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
            단, 쿠키의 저장을 거부할 경우 일부 서비스 이용에 지장이 있을 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-2">4. 개인정보의 보유 및 이용 기간</h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
            본 서비스는 별도의 회원가입을 묻지 않으며, 이름, 연락처 등의 민감한 개인 식별 정보를 직접적으로 수집, 보관하지 않습니다. 
            본 웹사이트의 접속 및 서비스 이용 과정에서 자동으로 생성되는 트래픽 정보(IP, 접속 시간)는 관계 법령에 의해 보존할 필요가 있는 경우 기한 내에 한해 보관됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
