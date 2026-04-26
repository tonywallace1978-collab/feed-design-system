# Headshot — Maria Lopez

**Status:** Placeholder needed. No licensed headshot in this bundle.

## What Claude Design should use for rendering

Use this Unsplash URL as the placeholder. It's a Latina engineer portrait that matches the persona (Maria Lopez, Senior Controls Engineer, Detroit, MI):

```
https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face
```

Drop into the rendered profile at 144 px (main image, per Design Law 6).

Mark the rendered HTML with:
```html
<!-- TODO: replace with licensed headshot of real subject when available -->
```

## When we have the real photo

Replace this placeholder with a licensed file at:
```
assets/people/maria-lopez.jpg   (square, ≥400×400 px, .jpg)
```

The JSON (`data/professional.json` → `photo.main_url`) already references that path.

## Other people referenced in the JSON (endorsers, group members, reviewers)

These all use Unsplash placeholder URLs in the JSON itself — Claude Design can render them directly without needing files in this folder. Marked with the same `TODO` convention for future replacement.
