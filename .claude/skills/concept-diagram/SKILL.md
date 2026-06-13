---
name: concept-diagram
description: >-
  Create dark-theme SVG concept/metaphor diagrams for this blog's MDX posts and
  embed them. Use whenever the user wants to visualize a concept, analogy, or
  metaphor as an image/diagram/illustration for a post — phrases like "이미지로
  표현", "비유를 그림으로", "다이어그램 만들어줘", "개념 시각화", "예시 이미지", "그림으로 보여줘",
  "illustrate this" — or when a post's explanation clearly benefits from a visual
  even if the user doesn't say "diagram". Handles the house visual style (slate
  dark theme, Korean labels, emojis), saves the .svg into the post folder,
  renders it to PNG to verify legibility, embeds it with relative markdown, and
  runs copy-assets. Do not reach for raster/AI image generation — this blog's
  visuals are hand-authored SVG.
---

# Concept Diagram (블로그 개념 비유 SVG)

This blog explains technical concepts, and the most memorable explanations use
**analogies** (e.g. "RAM은 책상, 디스크는 창고, swap은 보관함"). This skill turns such an
analogy or concept into a clean **SVG diagram** that sits inside the post — crisp at
any zoom, dark-theme native, editable as code, and accurate (no AI-art guesswork).

There is no image-generation model here, and that's fine: for labeled conceptual
diagrams, hand-authored SVG is *better* than illustration — it says exactly what you
mean. Author the SVG directly.

## Workflow

1. **Confirm the brief.** Before drawing, settle three things with the user (propose
   defaults, don't interrogate):
   - *What* concept/analogy to visualize, and its parts (the mapping).
   - *Which* post — its folder is `contents/posts/<slug>/`.
   - *Where* it goes in the post (which section/callout). The diagram usually lands
     right after the prose that explains the mechanism, so the reader gets text →
     visual reinforcement.
2. **Author the SVG** in the house style (see below). Save to
   `contents/posts/<slug>/<descriptive-name>.svg`.
3. **Render and eyeball it.** Embedded SVG is unforgiving about overflow and font
   metrics, so always verify visually before embedding:
   ```bash
   qlmanage -t -s 920 -o /tmp contents/posts/<slug>/<name>.svg
   ```
   This writes `/tmp/<name>.svg.png`. Read that PNG and check: text fits its boxes,
   nothing overlaps, emojis render, alignment is clean, Korean shows correctly. Fix
   and re-render until it's right. (`rsvg-convert -w 920 <file>.svg -o out.png` works
   too if installed.)
4. **Embed** with a relative markdown image and a descriptive Korean alt:
   ```md
   ![비유 구성요소를 서술한 alt 텍스트](<name>.svg)
   ```
   Put the takeaway sentence as **markdown text below the image**, not inside the SVG
   (see "Captions live in MDX").
5. **Confirm the asset pipeline picks it up:**
   ```bash
   npm run copy-assets
   ```
   Then verify `public/assets/posts/<slug>/<name>.svg` exists. (`prebuild` runs this
   automatically on build, so this step is just a sanity check.)
6. **Show the rendered PNG to the user** and offer companion diagrams if the concept
   has multiple facets worth their own panel.

## House visual style

The look is a dark, calm "slate" dashboard with one bright accent per panel. Match it
so diagrams feel native to the blog. Copy patterns from
`references/example-office-metaphor.svg` — it's a proven, complete example.

**Canvas & fonts**
- Landscape `viewBox="0 0 920 <H>"`; pick `<H>` to fit content snugly (≈430–540). A
  self-contained rounded background rect keeps it consistent on the post's
  `bg-slate-950` image frame:
  `<rect x="0" y="0" width="920" height="<H>" rx="16" fill="#0f172a"/>`
- Set a Korean-safe font stack on the root `<svg>`. The post embeds the SVG via
  `<img>`, so **web fonts (Pretendard) won't load** — it falls back to system Korean
  fonts. This stack covers macOS/Windows:
  `font-family="Pretendard, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"`

**Palette**
- Background `#0f172a` · panel `#111827` · card `#1f2937` · green-tint panel `#14241d`
- Borders `#334155` / `#475569` · text `#e2e8f0` · muted `#94a3b8` / `#64748b`
- Accents (one per panel/idea): blue `#38bdf8`, amber `#fbbf24`, green `#34d399`,
  red `#f87171`; green-on-tint text `#d1fae5`

**Components**
- Panels: `rx="14"`, 2px colored stroke (the panel's accent).
- Cards inside panels: `rx="8"`, subtle fill + border.
- A "special" sub-box (e.g. swap): green-tint fill + dashed stroke
  `stroke-dasharray="6 5"` to read as set-apart.
- Arrows: define `<marker>`s in `<defs>` (one per accent color) and use
  `marker-end`; label each arrow with a short word above/below the line.

**Type scale** (slightly large for legibility on retina + when scaled down):
- Title ≈ 26 bold · subtitle ≈ 14 muted · panel header ≈ 20 bold · panel sub ≈ 13
- card / body text ≈ 14.5 · inline labels ≈ 13–16

**Emojis** — use them, deliberately. A leading emoji on the title and on each
panel/card header makes the diagram warmer and faster to scan (💾 title, 🖥️ RAM,
🗄️ disk, 📦 swap, 🧑‍💼 kernel, 👷 worker, 📄/🗂️/🧠 items). Don't sprinkle them on
every line — anchor the key nouns and stop.

**Accessibility** — keep label text concise (long Korean lines overflow boxes, and
there's no text-wrapping in plain `<text>`). Always write a descriptive `alt`.

## Captions live in MDX, not in the SVG

Keep the SVG to the *diagram*. Put the one-line takeaway/conclusion as a normal
markdown sentence right below the image. Reasons: it's far easier to edit, gets real
body typography and `word-break: keep-all`, and keeps the SVG compact. A boxed caption
baked into the image is heavier and harder to tweak.

**Example:**
```md
![메모리 압박과 swap 비유: 책상(RAM)·창고(디스크)·swap(보관함)·커널(관리자)](swap-office-metaphor.svg)

즉 swap은 **더 넓은 책상이 아니라 느린 보관함**이다. 그래서 작은 swap만으로도 악순환을 끊을 수 있었다.
```

## Blog asset pipeline (how images work here)

- `scripts/copy-assets.mjs` copies image assets (`png|jpe?g|gif|svg|webp|mov`) from
  each `contents/posts/<slug>/` into `public/assets/posts/<slug>/`. SVG is supported.
- In MDX, reference images **relatively**: `![alt](name.svg)`. A remark plugin
  rewrites the path to the public asset at build; the custom `img` component renders
  it centered on a `bg-slate-950` frame (`object-contain`). So the SVG's own dark bg
  blends in.
- The file must sit directly in the post folder (not a subdirectory) to be copied.

## MDX gotcha: bold (`**`) flanking

CommonMark won't close `**` when it's immediately preceded by punctuation **and**
followed by a letter — so `**...보관함'**이다` renders the literal `**`. When writing the
caption/prose, end bold on a letter (`**느린 보관함**이다`) or ensure a space/punctuation
follows the closing `**`. After editing, a quick scan catches stragglers:
```bash
grep -nP '\p{P}\*\*[가-힣A-Za-z0-9]' contents/posts/<slug>/index.mdx
```

## Notes

- If the user explicitly wants an illustration/artwork style instead of a diagram,
  this skill can't generate raster art — offer to write ready-to-paste prompts for an
  external image model, but recommend SVG for anything with labels or structure.
- Good companion diagrams for a single concept: a before/after pair (problem vs.
  fixed), a 2×2 matrix (classification), or a timeline (metric over phases). Offer
  these when one panel can't carry the whole idea.
