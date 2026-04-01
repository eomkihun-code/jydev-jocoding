import { ParsedIngredient } from '../types/recipe';

/**
 * RCP_PARTS_DTLS 텍스트를 섹션별 재료 배열로 파싱
 * 예) "●주재료\n닭 1마리, 감자 2개\n●양념\n간장 2큰술"
 */
export function parseIngredients(raw: string): ParsedIngredient[] {
  if (!raw || !raw.trim()) return [];

  const result: ParsedIngredient[] = [];

  // 섹션 구분자: ●, ■, ▶, 【, 】 등으로 시작하는 줄
  const sectionRegex = /[●■▶【】◆◇○△▲\*]+\s*/g;

  // 섹션이 있는 경우
  if (sectionRegex.test(raw)) {
    const parts = raw.split(/(?=[●■▶【◆◇○△▲])/);
    for (const part of parts) {
      const lines = part.replace(/[●■▶【】◆◇○△▲]/g, '').trim();
      if (!lines) continue;

      const firstNewline = lines.indexOf('\n');
      let section = '재료';
      let itemText = lines;

      if (firstNewline > 0 && firstNewline < 20) {
        section = lines.slice(0, firstNewline).trim() || '재료';
        itemText = lines.slice(firstNewline).trim();
      }

      const items = splitItems(itemText);
      if (items.length > 0) {
        result.push({ section, items });
      }
    }
  } else {
    // 섹션 없이 쉼표/줄바꿈으로만 구분된 경우
    const items = splitItems(raw);
    if (items.length > 0) {
      result.push({ section: '재료', items });
    }
  }

  // 파싱 결과가 없으면 원본 텍스트를 하나의 아이템으로
  if (result.length === 0) {
    result.push({ section: '재료', items: [raw.trim()] });
  }

  return result;
}

function splitItems(text: string): string[] {
  return text
    .split(/[\n,、·•]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0 && s.length < 60);
}
