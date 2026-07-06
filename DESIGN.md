## Overview

Branch presents itself as a premium, highly-focused digital identity platform through a sophisticated **Dark SaaS Aesthetic**. The design abandons bright, distracting colors in favor of a monochromatic, high-contrast palette that feels sleek, professional, and intentional.

The homepage opens with a stark, commanding hero section against a true dark background (`#09090b`), decorated only by extremely subtle light flares (blur bubbles) and a faint gradient grid. The primary call-to-action is a solid white button (`bg-white` with `text-black`), providing the highest possible contrast without relying on neon colors.

Below the hero, the page maintains a strict section-by-section layout separated by ultra-thin, low-opacity white borders (`border-white/5`). Visual interest is created through structural layout rather than color, utilizing dark glassmorphism (translucent backgrounds with blur) for bento box statistics, and clean, abstract representations of UI elements.

**Key Characteristics:**
- **True Dark Canvas**: Dominant use of `#09090b` (zinc-950/black) for the main background.
- **Monochromatic Accents**: Reliance on white and various shades of zinc (zinc-100 to zinc-900) instead of bright brand colors.
- **High-Contrast CTAs**: Solid white buttons for primary actions, ensuring they stand out against the dark canvas.
- **Dark Glassmorphism**: Use of `bg-zinc-900/30` or similar with backdrop blur for cards and bento boxes.
- **Ultra-Thin Borders**: Extensive use of `border-white/5` or `border-white/10` to define shapes and sections without adding visual weight.
- **Sleek Geometry**: Large border radii (`rounded-2xl` and `rounded-3xl`) for cards, combined with sharp typography.

## Colors

### Surface & Background
- **Canvas Dark** (`#09090b`): The absolute baseline background for the page.
- **Surface Deep** (`bg-zinc-950`): For deep containers like the smartphone mockup.
- **Surface Mid** (`bg-zinc-900` / `bg-zinc-900/50`): For feature cards and bento boxes.
- **Surface Light** (`bg-zinc-800`): For hover states on cards or secondary elements.

### Text & Ink
- **Text Primary** (`text-white` / `text-zinc-100`): Main headlines, active button text, and critical data points.
- **Text Secondary** (`text-zinc-400`): Body paragraphs, subtitles, and less critical UI text.
- **Text Muted** (`text-zinc-500` / `text-zinc-600`): Placeholder text, footer links, and minor labels.
- **Text Inverse** (`text-black`): Used exclusively on solid white primary buttons for maximum contrast.

### Accents & Borders
- **Border Subtle** (`border-white/5`): Used for large section dividers and subtle card outlines.
- **Border Strong** (`border-white/10` / `border-white/20`): Used for inputs, interactive cards, and active states.
- **Glow/Flare**: Very subtle white/zinc radial gradients used in the background to prevent absolute flatness.

## Typography

### Font Family
**Inter** (or similar clean sans-serif) is the primary typeface, chosen for its legibility and modern geometric feel.

### Hierarchy
- **Hero Display**: 5xl to 7xl (up to 80px), font-bold, tight tracking (`tracking-tighter`), tight leading (`leading-[1.05]`).
- **Section Headlines**: 3xl to 5xl, font-bold, tight tracking.
- **Card Titles**: xl to 2xl, font-bold.
- **Body Text**: lg to xl, font-medium, relaxed leading (`leading-relaxed`), typically `text-zinc-400`.
- **UI Elements (Buttons/Inputs)**: text-sm to text-base, font-semibold or font-bold.

## Layout & Structure

### Section Rhythm
The landing page relies on distinct horizontal bands (sections) separated by a subtle bottom border (`border-b border-white/5`).

1. **Hero**: Left-aligned text + input form, right-aligned large smartphone mockup.
2. **Features (Alternating)**: Zig-zag layout. Text on one side, abstract visual/mockup on the other.
3. **Analytics (Bento)**: A prominent grid of dark glassmorphic cards displaying statistics.
4. **FAQ**: Centered title with an accordion list of questions.
5. **Pre-Footer CTA**: Centered, massive call-to-action to claim a username.
6. **Footer**: 4-column structured grid.

## Elevation & Depth

Unlike light mode designs that rely heavily on drop shadows, the Dark SaaS aesthetic creates depth through borders, subtle lighting, and opacity.

- **Level 0 (Flat)**: `bg-[#09090b]` with no border (Base Canvas).
- **Level 1 (Card)**: `bg-zinc-900/30` or `bg-zinc-900/50` + `border-white/5` + `backdrop-blur`. Used for standard bento boxes and FAQ items.
- **Level 2 (Interactive)**: Adds `hover:border-white/10` or `hover:bg-zinc-800` to indicate clickability.
- **Level 3 (Mockup/Hero)**: Complex styling with thick dark borders (e.g., `border-[6px] border-zinc-800`), deep shadows (`shadow-2xl`), and internal glow effects.

## Shapes & Radii

- **Inputs & Buttons**: `rounded-lg` or `rounded-xl`. Sleek but approachable.
- **Feature Cards**: `rounded-2xl`.
- **Large Mockups (Hero)**: `rounded-[2.5rem]` (40px) to mimic modern hardware devices.
- **Avatars/Icons**: `rounded-full` or slightly rounded squares (`rounded-xl`).

## Components

### Buttons
- **Primary Button**: `bg-white text-black font-bold rounded-xl`. The highest contrast element on the screen. Hover state is `bg-zinc-200`.
- **Secondary Button**: `bg-zinc-800 text-white font-semibold border border-white/10 rounded-lg`. Hover state is `bg-zinc-700`.

### Inputs
- **Inline Claim Form**: A composite component featuring a `bg-zinc-900/50` container, `border-white/10`, a static prefix ("branch.bio/"), and a transparent text input, paired immediately with a Primary Button.

### Cards
- **Bento Stat Card**: `bg-zinc-900/80 border border-white/5 rounded-[2rem] backdrop-blur-sm p-6 or p-8`. Features large white numbers and zinc-400 labels.
- **Abstract Feature Card**: Smaller floating cards used for visual flair in the "Share Anywhere" section (`bg-zinc-900 border-white/5 rounded-2xl`).

### Navigation
- **Top Nav**: Transparent or very subtle dark background. Minimalist links (`text-zinc-400 hover:text-white`).
- **Footer**: Highly structured 4-column layout on a solid dark background, separated from the main content by a border.

## Do's and Don'ts

### Do
- **Do** rely on contrast (white on black) for primary actions.
- **Do** use extremely subtle borders (`border-white/5`) to delineate sections.
- **Do** use dark glassmorphism (translucent zinc backgrounds with blur) for cards to create depth.
- **Do** keep typography sharp, bold, and tightly tracked for headlines.
- **Do** ensure generous padding inside and between sections to maintain a premium feel.

### Don't
- **Don't** use bright brand colors (neon green, bright purple) for backgrounds or primary elements. Keep them restricted to very specific, small accents if absolutely necessary, but prefer monochrome.
- **Don't** use thick borders or heavy drop shadows. Depth is achieved via lighting and borders.
- **Don't** use pill-shaped (`rounded-full`) buttons for primary CTAs; stick to `rounded-lg` or `rounded-xl` for a more structural, software-like feel.
