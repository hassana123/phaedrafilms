

# Phaedra Films — Professional Portfolio Website

## Brand Identity
- **Colors**: Black (#000000), White (#FFFFFF), Soft Pink (#FFACB7)
- **Fonts**: Quincy (headings), Helvetica Now (body) — will use Google Font alternatives (Playfair Display + Inter)
- **Tagline**: "Where creative vision meets impactful storytelling to elevate every message."
- **Logo**: Provided PNG (white on transparent — will work on dark backgrounds)

## Pages & Structure

### 1. Home Page
- **Hero Section**: Full-width dark background with the camera photo (blobby shape, right side on desktop). Left side: Name, tagline, and "Book a Session" CTA button in soft pink. Smooth entrance animations.
- **Brief intro** strip with headshot in blob shape
- **Services overview** — 3 cards (Event Coverage, Short-Form Video, Documentary & Impact Storytelling)
- **Featured work** preview (pulls from portfolio)
- **Testimonials section** (placeholder ready for admin-managed content)
- **CTA banner** — "Let's tell your story" with contact button

### 2. About Page
- Fatimah's full bio with headshot (blob format)
- Her story/journey section with elegant typography
- Skills & approach section

### 3. Services Page
- 3 detailed service sections with descriptions from the document
- Each service with its own visual section and CTA

### 4. Portfolio Page
- Filterable tabs: Short Form Videos, Event Highlights, Brand Videos
- Grid/masonry layout for video thumbnails and images
- Click to view details (modal or detail page)
- All content manageable from admin

### 5. Gallery Page
- Photo grid with lightbox viewer
- Images uploaded and managed via admin panel
- Blob-styled feature images, smooth hover animations

### 6. Testimonials Page
- Client quotes in elegant card layout
- Managed via admin panel

### 7. Contact Page
- Contact form (sends to phaedrafilmsproductions@gmail.com)
- WhatsApp link (09067538985)
- Instagram link (@phaedrafilms)
- Location display
- Embedded map optional

## Admin Panel (Supabase-powered)
Fatimah can manage her entire site without code:
- **Portfolio Manager** — Add/edit/remove portfolio items (title, description, category, video embed URL, thumbnail)
- **Gallery Manager** — Upload, reorder, delete photos (Supabase Storage)
- **Testimonials Manager** — Add/edit/remove client testimonials
- **Services Editor** — Update service titles, descriptions
- **Hero/About Content Editor** — Update bio, tagline, and section text
- **Contact Info Editor** — Update email, phone, social links
- Simple login with Supabase Auth (email/password)

## Database Tables (Supabase)
- `portfolio_items` — id, title, description, category, video_url, thumbnail_url, order, created_at
- `gallery_images` — id, image_url, caption, order, created_at
- `testimonials` — id, client_name, quote, role, created_at
- `services` — id, title, description, icon, order
- `site_content` — id, section_key, content (JSON), updated_at
- `contact_info` — id, email, phone, instagram, whatsapp, location

## Design Details
- **Mobile-first** responsive design throughout
- **Framer Motion** animations: fade-ins, slide-ups, staggered reveals, blob morphing
- **Lucide React** icons throughout
- **No placeholder/lorem ipsum** — all real copy from the provided document
- Blob-shaped image masks for headshot and hero camera photo
- Clean professional typography with generous whitespace
- Soft pink accent on black/white palette for CTAs, highlights, and hover states
- Professional sticky header with logo + hamburger menu on mobile
- Footer with social links, contact info, and copyright

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Supabase for auth, database, and file storage
- Lucide React for icons

