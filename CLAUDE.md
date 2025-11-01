# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js blog application with MDX support, featuring a Feature-Sliced Design architecture. The blog processes MDX files from the `contents/posts/` directory and serves them with syntax highlighting via CodeHike.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes asset copying)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run copy-assets` - Copy post assets from contents to public directory

## Architecture

### Feature-Sliced Design (FSD) Structure

The codebase follows FSD principles with these main layers:

- **`src/app/`** - Application layer (Next.js App Router configuration)

  - `layouts/` - Root layout components
  - `configs/` - MDX components configuration
  - `styles/` - Global styles

- **`src/pages/`** - Page layer (business logic for specific pages)

  - `home/` - Homepage with recent posts
  - `post-detail/` - Individual post pages
  - `post-list/` - Post listing pages

- **`src/widgets/`** - Widget layer (complex UI blocks)

  - `post-list.tsx` - Post listing component
  - `layouts/` - Navigation and layout widgets

- **`src/shared/`** - Shared layer (reusable utilities)
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions for content processing
  - `constants/` - Application constants
  - `ui/` - Basic UI components
  - `fonts/` - Font files

### Content Management

- **Content Location**: `contents/posts/` - MDX files with frontmatter
- **Asset Processing**: Build script copies assets (images, videos) from post directories to `public/assets/posts/`
- **Content Types**: Post frontmatter defined in `src/shared/types/contents/`
- **Content Utils**: `getContents()` and `getContentDetail()` functions for content retrieval

### MDX Configuration

The project uses Next.js MDX with:

- **CodeHike** for syntax highlighting (GitHub Dark theme)
- **Remark plugins**: frontmatter, GFM, TOC generation, public assets
- **Rehype plugins**: slug generation for headings
- Custom remark plugins in `scripts/` directory

### Styling

- **Tailwind CSS** with typography plugin
- **CSS Custom Properties** for theming (background/foreground colors)
- **Pretendard Variable** font family
- **Dark mode** enabled by default

### TypeScript Configuration

- Path alias `@/*` maps to `src/*`
- Excludes image files from post directories in compilation
- Target ES2017 with Next.js plugin integration

## Key Files to Understand

- `next.config.ts` - MDX and webpack configuration
- `src/shared/utils/contents/` - Content processing logic
- `src/shared/types/contents/` - Content type definitions
- `scripts/copy-assets.mjs` - Asset copying for build process
- `scripts/remark-*.mjs` - Custom MDX processing plugins

## Development Notes

- The build process automatically copies post assets via `prebuild` script
- Post directories in `contents/posts/` should contain MDX files and related assets
- ESLint configured with Next.js and Prettier rules
- Husky configured for git hooks with lint-staged
