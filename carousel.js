// トップのメインビジュアル: 新しいスライドが右から飛んできて、今のスライドの上に重なる
(() => {
  const stage = document.querySelector('.mv-slides');
  if (!stage) return;

  // HTMLに書いたスライドは雛形として外し、表示のたびに複製を入れる
  const templates = [...stage.children];
  templates.forEach((t) => t.remove());
  if (templates.length === 0) return;

  const HOLD = 7000;  // 表示する時間
  const SLIDE = 1000; // 飛んでくる時間（style.css の transition と合わせる）

  let index = -1;
  let current = null;

  const show = (animate) => {
    index = (index + 1) % templates.length;
    const next = templates[index].cloneNode(true);

    if (animate) {
      // 枠の右外に置いてから追加し、中央まで動かす
      next.style.transition = 'none';
      next.style.transform = 'translateX(100%)';
      stage.append(next);
      void next.offsetWidth;
      next.style.transition = '';
      next.style.transform = 'none';
    } else {
      stage.append(next);
    }
    if (next.tagName === 'VIDEO') next.play().catch(() => {});

    // 完全に覆い終わったら、下になった前のスライドを取り除く
    const prev = current;
    current = next;
    setTimeout(() => prev?.remove(), animate ? SLIDE : 0);

    if (templates.length > 1) setTimeout(() => show(true), (animate ? SLIDE : 0) + HOLD);
  };

  show(false);
})();
