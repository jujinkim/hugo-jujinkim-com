# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development
```bash
# Start development server with live reload
hugo server -D

# Start development server (without drafts)
hugo server

# Start development server with specific base URL
hugo server --baseURL=http://localhost:1313
```

### Building
```bash
# Build the site
hugo

# Build with drafts included
hugo -D

# Build with verbose output
hugo -v
```

### PostCSS Setup
This project uses PostCSS for CSS processing. Before running Hugo, install dependencies:
```bash
npm install
```

## Project Architecture

This is a Hugo static site using the **TeXify3** theme with customizations.

### Key Directories
- `content/` - Markdown content files (posts, pages)
  - `posts/` - Blog posts organized by year
  - `about.md` - About page
  - `archives.*.md` - Archive pages (multilingual)
- `config/_default/` - Main Hugo configuration files
  - `config.toml` - Core Hugo settings
  - `languages.en.toml` - English language config
  - `params.toml` - Site parameters
  - `menus.en.toml` - Navigation menu configuration
- `static/` - Static assets served directly
  - `css/` - Custom CSS files (fontawesome.css, readability.css, header-spacing.css, dark-theme-colors.css)
  - `me/` - Legacy personal page with custom HTML/CSS/JS
- `assets/` - Files processed by Hugo pipes
- `layouts/` - Custom layout overrides
- `themes/hugo-texify3/` - Base theme (do not modify directly)

### Multilingual Support
The site supports multiple languages (English and Korean). Content files use language suffixes:
- `.en.md` for English
- `.ko.md` for Korean

### Styling
The site uses:
- TeXify3 theme as base (LaTeX-inspired design with Gruvbox color scheme)
- Custom CSS overrides in `static/css/`
- Font Awesome for icons
- PostCSS for CSS processing

### Comments
Comments are powered by Giscus (GitHub Discussions) - configured in config.toml

### Key Configuration
- Base URL: `https://jujinkim.com`
- Theme: `hugo-texify3`
- CJK language support enabled
- Git info enabled for last modified dates
- Math rendering enabled (KaTeX)
- DuckDuckGo search box enabled