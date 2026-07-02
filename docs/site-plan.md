# Kiratis LLC Website Plan

## Goal

Build a clean, credible website that presents Kiratis LLC as a multi-service business with three clear offerings:

1. Consulting for biophysical modeling and metadata harmonization.
2. Junk removal services for the State College, PA area.
3. Custom computer builds, driven by CSV inventory input for updates.

The site should make the consulting work feel like the primary differentiator while still presenting the other services clearly and professionally.

## Visual Direction

The overall look should feel modern science, but artistic and beautiful rather than sterile.

- Use a refined editorial layout with strong spacing and clear hierarchy.
- Blend science-inspired visuals with softer artistic accents like gradients, layered shapes, or subtle texture.
- Keep the home hero simple, focused, and immediately understandable.
- Make the design feel premium without becoming busy or overly technical.
- Use one clear navigation path from the hero to the three service pages.

## Primary Outcomes

- Give visitors a fast overview of all services.
- Make it easy to contact the business.
- Present technical consulting in a marketable, understandable way.
- Support future updates to computer build listings from CSV data.
- Keep the junk removal service local, simple, and conversion-focused.

## Recommended Site Structure

### 1. Home

Purpose: introduce the business, establish trust, and route people into the right service.

Sections:

- Simple hero with a short positioning statement and links to the three service pages.
- Short supporting line that explains the business in plain language.
- Three service cards linking to dedicated pages.
- Brief credibility section with experience highlights.
- Secondary CTA for a quote or consultation.

### 2. Consulting

Purpose: present the highest-value service in terms a potential client can understand quickly.

Core messaging:

- Biophysical modeling.
- Protein folding simulations in coarse-grained and all-atom workflows.
- Statistical modeling.
- Encoder-decoder pipelines and tool development.
- Metadata harmonization using encoder and decoder approaches.

Content goals:

- Translate technical depth into business value.
- Show the kinds of problems solved.
- Include a compact list of deliverables or use cases.

### 3. Junk Removal

Purpose: mirror a typical independent local junk removal service for State College, PA.

Core messaging:

- Residential and small commercial junk removal.
- Single-item pickup, cleanouts, and haul-away jobs.
- Local coverage centered on State College, PA and nearby areas.
- Fast quotes and straightforward scheduling.

Content goals:

- Keep the page simple and service-oriented.
- Emphasize responsiveness, cleanup, and convenient removal.
- Add a service area section and a quote request CTA.

### 4. Custom Computer Builds

Purpose: showcase available builds and make inventory updates easy.

Core messaging:

- Custom-built systems for practical and enthusiast use.
- Clear component summaries and use-case positioning.
- Inventory updated from CSV files.

Content goals:

- Present each build with a card or table layout.
- Support filtering by category if needed later.
- Make CSV imports the source of truth for inventory updates.

## Editable Content Strategy

All updateable site content should live in a single root data folder for easy access and maintenance.

Recommended folder:

- `data/`

Suggested contents:

- `data/site.json` for shared site-wide details.
- `data/contact.json` for contact information and inquiry routing.
- `data/services.json` for service summaries and labels.
- `data/computer-builds.csv` for build inventory updates.
- `data/junk-removal.json` for local service area and junk removal copy.

Suggested behavior:

- Treat JSON files as the source of truth for editable marketing content.
- Keep the CSV file dedicated to build inventory rows.
- Load shared content from one folder so future edits stay simple.

### 5. Contact

Purpose: convert interest into leads.

Include:

- Contact form or direct email link.
- Phone number if available.
- Service-specific inquiry options.
- Optional preferred contact method.

## Content Strategy

### Positioning

The site should position Kiratis LLC as a technical, capable small business with broad operational value:

- Consulting: deep technical expertise.
- Junk removal: local practical service.
- Computer builds: tangible product-focused offering.

### Tone

- Clear.
- Confident.
- Professional without sounding corporate.
- Easy to skim.

### Copy Priorities

- Lead with what the customer gets.
- Avoid unexplained jargon on public-facing pages.
- Use short service descriptions and plain-language benefit statements.
- Make the consulting page technically credible but readable.

## Data and Content Inputs

### CSV for Computer Builds

Use a CSV file as the update source for build inventory.

Suggested columns:

- `name`
- `category`
- `price`
- `cpu`
- `gpu`
- `ram`
- `storage`
- `condition`
- `availability`
- `description`
- `image`
- `notes`

Recommended behavior:

- Parse CSV into build cards or a build table.
- Validate required fields before publishing.
- Keep the CSV format stable so updates stay simple.

## Design Direction

- Modern science aesthetic with artistic polish.
- Strong hierarchy with distinct service sections.
- Simple navigation with one main CTA.
- Professional color palette, not overly flashy.
- Responsive layout for mobile-first browsing.

## Build Phases

### Phase 1: Foundation

- Choose the site stack.
- Set up layout, navigation, and shared components.
- Create the home page and basic contact path.

### Phase 2: Service Pages

- Build the consulting page.
- Build the junk removal page.
- Build the computer builds page.

### Phase 3: Data Integration

- Add CSV import support for build inventory.
- Map CSV rows to build cards or list items.
- Add validation and fallback states for missing data.

### Phase 4: Polish and Launch

- Refine copy.
- Add SEO metadata.
- Check mobile layout and load behavior.
- Test inquiry flow and CSV-driven inventory updates.

## Open Inputs Still Needed

- Business contact details.
- Service area boundaries for junk removal.
- Preferred brand colors or logo, if any.
- Initial computer build CSV sample.
- Any testimonials, certifications, or project photos.

## Next Build Decision

Before coding, decide the stack and content source strategy:

- Static site with a simple data loader for CSV.
- CMS-driven content with CSV only for builds.
- Fully data-driven build inventory plus mostly static marketing pages.
