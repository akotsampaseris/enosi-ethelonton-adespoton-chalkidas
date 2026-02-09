# Animal Rights Volunteer Group Website

A beautiful, warm, and mission-driven website for an animal rescue organization built with Next.js 16, Sanity CMS, Tailwind CSS, and Framer Motion.

## Design Philosophy

**Warm & Inviting**: Uses soft gradients, rounded corners, and the brand's pink color to create an emotional, welcoming feel that encourages adoption and support.

**Action-Oriented**: Every section has clear CTAs driving visitors toward adoption, donation, volunteering, or sharing.

**Story-Driven**: Focuses on impact stats, success stories, and the individual animals to create emotional connection.

## Key Features

### Homepage Sections

1. **Hero Section**
    - Emotional headline with brand messaging
    - Dual CTAs (Adopt / Donate)
    - Quick stats showing impact
    - Space for hero image/video

2. **Featured Animals**
    - Grid of available animals for adoption
    - Quick animal info (species, age, gender)
    - "Favorite" functionality
    - Links to individual animal pages

3. **Impact Stats**
    - Visual counter section showing rescues, adoptions, medical care
    - Gradient background with brand colors
    - Builds credibility and trust

4. **How You Can Help**
    - Four ways to support: Adopt, Donate, Volunteer, Share
    - Distinct visual treatment for each
    - Emergency hotline banner

5. **Success Stories**
    - Testimonials from adopters
    - Photos of happy animals in their new homes
    - Builds emotional appeal

6. **Newsletter Signup**
    - Weekly updates and stories
    - Social proof (subscriber count)
    - Form validation

7. **Footer**
    - Full navigation
    - Contact information
    - Social media links

## Installation

```bash
# Install dependencies
pnpm add framer-motion lucide-react next-sanity @sanity/image-url

# Run development server
pnpm dev
```

## Sanity CMS Setup

### Required Schemas

Create these content types in your Sanity Studio:

#### 1. Animal Schema (`animal.ts`)

```typescript
import { defineType } from "sanity";

export default defineType({
    name: "animal",
    title: "Animal",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name" },
        },
        {
            name: "species",
            title: "Species",
            type: "string",
            options: {
                list: ["Dog", "Cat", "Other"],
            },
        },
        {
            name: "age",
            title: "Age",
            type: "string",
        },
        {
            name: "gender",
            title: "Gender",
            type: "string",
            options: {
                list: ["Male", "Female"],
            },
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
        {
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: ["available", "adopted", "pending"],
            },
            initialValue: "available",
        },
    ],
});
```

#### 2. Success Story Schema (`successStory.ts`)

```typescript
import { defineType } from "sanity";

export default defineType({
    name: "successStory",
    title: "Success Story",
    type: "document",
    fields: [
        {
            name: "animalName",
            title: "Animal Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "adopterName",
            title: "Adopter Name",
            type: "string",
        },
        {
            name: "adoptionDate",
            title: "Adoption Date",
            type: "date",
        },
        {
            name: "story",
            title: "Story",
            type: "text",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            fields: [{ name: "alt", type: "string", title: "Alt text" }],
        },
    ],
});
```

## Customization

### Brand Colors

The design uses your pink logo color. To adjust:

In `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    // Adjust these shades based on your exact brand color
    500: '#ec4899', // Main pink
    600: '#db2777', // Darker pink
  }
}
```

Then use throughout components with `bg-pink-600`, `text-pink-600`, etc.

### Content Updates

**Logo**: Replace `/public/logo.png` with your actual logo

**Hero Image**: Replace placeholder in `Hero.tsx` with actual photo

**Contact Info**: Update in `Footer.tsx`:

- Phone number
- Email address
- Physical address

**Social Media**: Update links in `Footer.tsx`

**Stats**: Update numbers in `Hero.tsx` and `ImpactStats.tsx` based on your actual data

**Emergency Hotline**: Update phone number in `HowToHelp.tsx`

### Greek Language Support

To add Greek translations:

1. Install `next-intl` or `react-i18next`
2. Create translation files for Greek and English
3. Wrap text content in translation functions
4. Add language switcher in navigation

Example structure:

```
/locales
  /el (Greek)
    common.json
  /en (English)
    common.json
```

## Image Guidelines

### Recommended Images

- **Hero Image**: Happy dog/cat being cuddled (4:3 ratio, min 1200px wide)
- **Animal Photos**: Square format (1:1 ratio, min 800px)
- **Success Stories**: Animals in their new homes (square, min 600px)

### Photo Tips

- Natural lighting, outdoor when possible
- Eye-level shots showing personality
- Clean backgrounds
- Show animals looking happy/playful
- Include variety (puppies, kittens, older animals)

## Newsletter Integration

The newsletter component has a placeholder API call. Connect it to your email provider:

**Options**:

- Resend (free tier: 3,000 emails/month)
- Brevo (free tier: 300 emails/day)
- Mailchimp
- ConvertKit

Update `Newsletter.tsx` handleSubmit function with your API endpoint.

## Performance Optimization

- Images are optimized via Next.js Image component
- Static generation for animal listings (ISR recommended)
- Animations only on interactive elements
- Lazy loading for images below fold

## Deployment

**Vercel** (Recommended - free tier):

```bash
vercel deploy
```

**Netlify**:

```bash
netlify deploy
```

## SEO Optimization

The site includes:

- Semantic HTML
- Proper heading hierarchy
- Alt text on images
- Meta descriptions
- Open Graph tags (add in layout.tsx)

Add:

- Sitemap.xml
- Robots.txt
- Schema.org markup for organization
- Google Analytics / Plausible

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Focus states on interactive elements
- Color contrast meets WCAG AA standards
- Screen reader friendly

## Next Steps

1. **Add individual animal pages** (`/animals/[slug]`)
2. **Create donation page** with payment integration
3. **Build volunteer application form**
4. **Add blog** for updates and stories
5. **Implement search/filter** for animals
6. **Add admin dashboard** for volunteers to manage content
7. **Create Greek language version**

## Support

For questions about customization or Sanity setup, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

MIT - Free to use and modify for your animal rescue organization.

---

**Built with ❤️ for animals in need**
