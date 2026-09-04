(() => {
  "use strict";

  const form = document.querySelector("#wizard");
  const steps = [...form.querySelectorAll("fieldset[data-step]")];
  const progress = document.querySelector("#progress");
  const worksRoot = document.querySelector("#works");
  const workTemplate = document.querySelector("#work-template");
  const preview = document.querySelector("#preview");
  const backButton = document.querySelector("#back");
  const nextButton = document.querySelector("#next");
  let step = 0;

  progress.replaceChildren(...steps.map(() => document.createElement("span")));

  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);

  const safeUrl = value => {
    const url = String(value || "").trim();
    if (!url) return "";
    if (/^images\/[a-zA-Z0-9._/-]+$/.test(url)) return url;
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" ? parsed.href : "";
    } catch {
      return "";
    }
  };

  const checked = group => [...document.querySelectorAll(`[data-group="${group}"] input:checked`)].map(input => input.value);

  const collect = () => {
    const data = new FormData(form);
    return {
      version: 1,
      profile: {
        name: String(data.get("name") || "").trim(),
        role: String(data.get("role") || ""),
        interests: checked("interests"),
        strengths: checked("strengths"),
        future: String(data.get("future") || "").trim(),
        bio: String(data.get("bio") || "").trim()
      },
      works: [...worksRoot.querySelectorAll(".work-card")].map(card => Object.fromEntries(
        [...card.querySelectorAll("[data-field]")].map(input => [input.dataset.field, input.value.trim()])
      )).filter(work => Object.values(work).some(Boolean)),
      links: [
        ["GitHub", data.get("github")], ["YouTube", data.get("youtube")], ["Music", data.get("music")], ["作品サイト・SNS", data.get("social")]
      ].map(([label, url]) => ({ label, url: safeUrl(url) })).filter(link => link.url),
      theme: { preset: String(data.get("theme") || "gallery"), accent: String(data.get("accent") || "#0b7285") },
      disclosure: { usesGenerativeAI: data.get("ai") === "on" },
      rsl: {
        policy: String(data.get("rsl") || "ai-train-free"),
        file: "rsl.xml"
      }
    };
  };

  const makeBio = () => {
    const data = collect();
    const fields = form.elements;
    if (fields.bio.value.trim()) return;
    const interest = data.profile.interests.length ? `${data.profile.interests.join("・")}を中心に` : "デジタルコンテンツを中心に";
    const strength = data.profile.strengths.length ? `${data.profile.strengths.join("・")}を得意とし、` : "制作を学びながら、";
    const future = data.profile.future ? `将来は${data.profile.future}に取り組みたいと考えています。` : "新しい表現に挑戦しています。";
    fields.bio.value = `${interest}制作しています。${strength}${future}`;
  };

  const portfolioHtml = data => {
    const themes = {
      gallery: { bg: "#ffffff", text: "#17202a", panel: "#f4f5f3", muted: "#475569", label: "#075985", font: 'system-ui, "Noto Sans JP", sans-serif' },
      night: { bg: "#11131a", text: "#f4f0e8", panel: "#1c202b", muted: "#cbd5e1", label: "#67e8f9", font: 'system-ui, "Noto Sans JP", sans-serif' },
      paper: { bg: "#f1ecdf", text: "#2c2924", panel: "#fffaf0", muted: "#57534e", label: "#9a3412", font: 'Georgia, "Yu Mincho", serif' }
    };
    const theme = themes[data.theme.preset] || themes.gallery;
    const works = data.works.map(work => {
      const image = safeUrl(work.image);
      return `<article class="work">${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(work.alt || work.title)}" loading="lazy" decoding="async">` : '<div class="placeholder">IMAGE</div>'}<div class="copy"><p class="meta">${escapeHtml(work.year || "制作年未設定")}</p><h3>${escapeHtml(work.title || "無題の作品")}</h3>${work.tools ? `<p class="tools">${escapeHtml(work.tools)}</p>` : ""}<p>${escapeHtml(work.description || "作品の説明をここに表示します。")}</p></div></article>`;
    }).join("") || '<p class="empty">最初の作品を追加しましょう。</p>';
    const links = data.links.map(link => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join("");
    const ai = data.disclosure.usesGenerativeAI ? "このポートフォリオには生成AIを用いた作品が含まれます。" : "";
    const usesRsl = data.rsl?.policy !== "none";
    const rsl = usesRsl ? "このサイトはRSLにより、コンテンツのAI学習への無料利用を許可しています。" : "";
    const title = data.profile.name || "わたしのポートフォリオ";
    const backgroundImage = safeUrl(data.works[0]?.image);
    return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | Portfolio</title><meta name="description" content="${escapeHtml(data.profile.bio || "作品ポートフォリオ")}"><meta name="generator" content="https://github.com/kaitas/github-portfolio-template"><meta name="author" content="https://aicu.ai/">${usesRsl ? '<link rel="rsl" type="application/rsl+xml" href="rsl.xml">' : ""}<style>
:root{--accent:${escapeHtml(data.theme.accent)};--bg:${theme.bg};--text:${theme.text};--panel:${theme.panel};--muted:${theme.muted};--label:${theme.label}}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--text);font-family:${theme.font};font-size:16px;line-height:1.65;overflow-wrap:anywhere;opacity:.25;animation:reveal .5s ease-out forwards}body::before{content:"";position:fixed;z-index:-2;inset:0;background:${backgroundImage ? `linear-gradient(color-mix(in srgb,var(--bg) 68%,transparent),color-mix(in srgb,var(--bg) 82%,transparent)),url("${escapeHtml(backgroundImage)}") center/cover no-repeat` : "var(--bg)"}}body::after{content:"";position:fixed;z-index:-1;inset:0;background:radial-gradient(circle at center,transparent 0 20%,var(--bg) 78%)}#particles{position:fixed;z-index:-1;inset:0;width:100%;height:100%;pointer-events:none}
@keyframes reveal{to{opacity:1}}
a{color:inherit}.skip{position:fixed;z-index:10;top:.5rem;left:.5rem;padding:.7rem 1rem;background:var(--text);color:var(--bg);transform:translateY(-150%)}.skip:focus{transform:none}
a:focus-visible{outline:3px solid var(--label);outline-offset:3px;border-radius:2px}
.hero,main{width:min(1120px,100%);margin:auto;padding-inline:clamp(1rem,4vw,2rem)}
.hero{padding-top:clamp(2.5rem,7vh,4.5rem);padding-bottom:clamp(1.75rem,4vh,3rem);border-bottom:1px solid color-mix(in srgb,var(--text) 22%,transparent)}
.eyebrow,.meta{color:var(--label);font-size:.8rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase}
.hero h1{max-width:16ch;margin:.3rem 0 .75rem;font-size:clamp(2.5rem,5vw,4.75rem);line-height:1.05;letter-spacing:-.04em}
.role{margin:.5rem 0;font-weight:750}.bio{max-width:65ch;margin-block:.75rem;font-size:clamp(1rem,1.3vw,1.1rem)}
.links{display:flex;flex-wrap:wrap;gap:.4rem .8rem;margin-top:1rem}.links a{display:inline-flex;align-items:center;min-height:44px;border-bottom:2px solid var(--accent);font-weight:650;text-decoration:none}
main{padding-top:clamp(1.5rem,3vh,2.5rem);padding-bottom:clamp(2.5rem,6vh,5rem)}
h2{margin:0 0 1rem;font-size:1rem;letter-spacing:.1em}.works{display:grid;gap:2rem}
.work{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(260px,.65fr);min-height:0;background:var(--panel);border-top:4px solid var(--accent)}
.work img,.placeholder{display:block;width:100%;height:100%;min-height:0;max-height:480px;aspect-ratio:16/9;object-fit:cover}
.placeholder{display:grid;place-items:center;color:var(--label);background:color-mix(in srgb,var(--accent) 12%,var(--panel));letter-spacing:.2em}
.copy{align-self:center;padding:clamp(1.25rem,3vw,2rem)}.copy h3{margin:.25rem 0;font-size:clamp(1.4rem,2.2vw,1.8rem);line-height:1.2}.copy p{margin:.75rem 0}.tools{color:var(--muted);font-size:.9rem}.empty{padding:3rem;background:var(--panel)}
footer{padding:1.25rem;line-height:1.5;text-align:center;border-top:1px solid color-mix(in srgb,var(--text) 22%,transparent);color:var(--muted);font-size:.8125rem}footer p{margin:.35rem}footer a{text-decoration-thickness:2px;text-underline-offset:3px}
@media(min-width:1100px) and (min-height:800px){.hero{padding-top:2rem;padding-bottom:1.25rem}main{padding-top:1.25rem;padding-bottom:1.25rem}.work img,.placeholder{max-height:390px}footer{padding:.65rem}}
@media(max-width:700px){.hero{padding-top:2rem;padding-bottom:1.5rem}.hero h1{font-size:clamp(2.35rem,12vw,3.75rem)}.work{grid-template-columns:1fr}.work img,.placeholder{max-height:none;aspect-ratio:4/3}.copy{padding:1.25rem}.links{gap:.25rem .7rem}footer{text-align:left}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}body{opacity:1;animation:none}#particles{display:none}}
</style></head><body><canvas id="particles" aria-hidden="true"></canvas><a class="skip" href="#works">作品へ移動</a><header class="hero"><p class="eyebrow">Portfolio</p><h1>${escapeHtml(title)}</h1><p class="role">${escapeHtml(data.profile.role)}</p><p class="bio">${escapeHtml(data.profile.bio || "興味や得意なことを選ぶと、自己紹介が作られます。")}</p>${links ? `<nav class="links" aria-label="外部リンク">${links}</nav>` : ""}</header><main id="works"><h2>SELECTED WORKS</h2><section class="works" aria-label="作品一覧">${works}</section></main><footer>${ai ? `<p>${ai}</p>` : ""}${rsl ? `<p>${rsl} <a href="rsl.xml">条件を確認</a></p>` : ""}</footer><script>
if(!matchMedia("(prefers-reduced-motion: reduce)").matches){const c=document.querySelector("#particles"),x=c.getContext("2d"),d=Math.min(devicePixelRatio,2),n=innerWidth<700?350:1000,p=Array.from({length:n},()=>{const a=Math.random()*Math.PI*2,s=.15+Math.random()*.85;return{a,r:Math.random()*24,s,z:.3+Math.random()*1.4}});function size(){c.width=innerWidth*d;c.height=innerHeight*d;x.setTransform(d,0,0,d,0,0)}function draw(){x.clearRect(0,0,innerWidth,innerHeight);x.fillStyle="${theme.label}66";for(const q of p){q.r+=q.s;if(q.r>Math.hypot(innerWidth,innerHeight)*.56)q.r=0;const px=innerWidth/2+Math.cos(q.a)*q.r,py=innerHeight/2+Math.sin(q.a)*q.r;x.fillRect(px,py,q.z,q.z)}requestAnimationFrame(draw)}addEventListener("resize",size,{passive:true});size();draw()}
</script></body></html>`;
  };

  const render = () => {
    preview.srcdoc = portfolioHtml(collect());
    [...progress.children].forEach((bar, index) => bar.classList.toggle("current", index <= step));
  };

  const showStep = nextStep => {
    step = Math.max(0, Math.min(steps.length - 1, nextStep));
    steps.forEach((fieldset, index) => fieldset.hidden = index !== step);
    backButton.hidden = step === 0;
    nextButton.hidden = step === steps.length - 1;
    if (step === 1) makeBio();
    if (step === steps.length - 1) checkPii();
    render();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addWork = work => {
    const card = workTemplate.content.firstElementChild.cloneNode(true);
    Object.entries(work || {}).forEach(([field, value]) => {
      const input = card.querySelector(`[data-field="${field}"]`);
      if (input) input.value = value;
    });
    card.querySelector(".remove-work").addEventListener("click", () => { card.remove(); numberWorks(); render(); });
    card.addEventListener("input", render);
    worksRoot.append(card);
    numberWorks();
  };

  const numberWorks = () => [...worksRoot.querySelectorAll(".work-card")].forEach((card, index) => card.querySelector("h3 span").textContent = index + 1);

  const checkPii = () => {
    const warning = document.querySelector("#pii-warning");
    const text = JSON.stringify(collect());
    const risks = [];
    if (/[\w.+-]+@(?:[\w-]+\.)+[\w-]{2,}/i.test(text)) risks.push("メールアドレスらしい文字列");
    if (/(?:0\d{1,4}[-ー‐ ]?\d{1,4}[-ー‐ ]?\d{3,4})/.test(text)) risks.push("電話番号らしい文字列");
    if (/(学籍番号|学生番号|住所|郵便番号)/.test(text)) risks.push("個人情報を示す言葉");
    warning.hidden = risks.length === 0;
    warning.textContent = risks.length ? `${risks.join("、")}が含まれている可能性があります。公開前に削除できないか確認してください。` : "";
  };

  const download = (filename, content, type) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type }));
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };

  const load = config => {
    if (!config || config.version !== 1 || !config.profile || !Array.isArray(config.works)) throw new Error("このウィザード用のJSONではありません。");
    const fields = form.elements;
    ["name", "role", "future", "bio"].forEach(field => fields[field].value = config.profile[field] || "");
    ["interests", "strengths"].forEach(group => document.querySelectorAll(`[data-group="${group}"] input`).forEach(input => input.checked = (config.profile[group] || []).includes(input.value)));
    fields.github.value = config.links?.find(link => link.label === "GitHub")?.url || "";
    fields.youtube.value = config.links?.find(link => link.label === "YouTube")?.url || "";
    fields.music.value = config.links?.find(link => link.label === "Music")?.url || "";
    fields.social.value = config.links?.find(link => link.label === "作品サイト・SNS")?.url || "";
    fields.theme.value = config.theme?.preset || "gallery";
    fields.accent.value = config.theme?.accent || "#0b7285";
    fields.ai.checked = Boolean(config.disclosure?.usesGenerativeAI);
    fields.rsl.value = config.rsl?.policy || "ai-train-free";
    worksRoot.replaceChildren();
    config.works.forEach(addWork);
    if (!config.works.length) addWork();
    showStep(0);
  };

  nextButton.addEventListener("click", () => {
    const invalid = steps[step].querySelector(":invalid");
    if (invalid) return invalid.reportValidity();
    if (step === 1) makeBio();
    showStep(step + 1);
  });
  backButton.addEventListener("click", () => showStep(step - 1));
  document.querySelector("#add-work").addEventListener("click", () => { addWork(); render(); });
  document.querySelector("#download-html").addEventListener("click", () => download("index.html", portfolioHtml(collect()), "text/html;charset=utf-8"));
  document.querySelector("#download-json").addEventListener("click", () => download("portfolio.json", `${JSON.stringify(collect(), null, 2)}\n`, "application/json"));
  document.querySelector("#load-json").addEventListener("change", async event => {
    try { load(JSON.parse(await event.target.files[0].text())); } catch (error) { alert(error.message); }
    event.target.value = "";
  });
  form.addEventListener("input", () => {
    document.querySelector("#rsl-warning").hidden = form.elements.rsl.value !== "none";
    render();
  });
  addWork({ year: String(new Date().getFullYear()), image: "images/HakaseOG.png" });
  showStep(0);
})();
