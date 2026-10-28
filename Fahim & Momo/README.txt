NIMON — RECEPTION INVITATION (STARTER)
====================================
No React, Node, npm or server required. It's just HTML + CSS + JavaScript.

HOW TO OPEN
1. Unzip the project.
2. Open index.html in Chrome, Edge, Safari, or Firefox.
3. Tap the center focus frame to open the invitation.
4. Scroll the page. Try music, the image gallery, countdown, and Directions.

TO CUSTOMIZE
1. Couple names, event copy, date/time, reception venue and map link:
   Open index.html in any text editor and replace the DEMO details.
2. Countdown: update data-event-date in the reception section in index.html.
   Example: 2026-12-18T19:00:00+06:00 (Bangladesh time).
3. Main couple photograph: open style.css, find --couple-photo and set a
   URL for your picture, e.g. url('assets/our-couple.jpg').
   Put our-couple.jpg in the assets folder. JavaScript reads the photo
   path automatically from --couple-photo; no script edit is needed.
4. Gallery: replace the four photo URLs in index.html with your images,
   e.g. src='assets/memory-1.jpg'.
5. Background tune: replace assets/nimon-soft-tune.mp3 with your own
   licensed MP3 using the same file name (or change audio src in HTML).
6. Google Maps: change the Directions href to a URL for the REAL venue.
   The included link intentionally points to Dhaka as a DEMO.
7. For colors/typography/layout edit style.css.

WHAT WORKS
- Blurred intro & focus-frame reveal (skip available)
- Wedding-style hero and invitation message
- Four-image gallery with full-screen lightbox and arrow navigation
- Live countdown to event date with timezone offset
- Background music (locally provided original synthesized demo)
- Smooth scroll-based section reveals
- Google Maps external direction link
- Responsive mobile / tablet / desktop styles
- Reduced-motion and keyboard-accessible interactions

NOTES
- Demo names 'Ariana & Rayan', date 18 December 2026 and venue are
  illustrative placeholders, not real event information.
- The sample online images are used for preview only. Replace them with
  photos you own or are licensed to use before publishing.
- The included original MP3 tune is a simple placeholder for custom music.
- If the online demo photos don't load, local SVG placeholders display.
- This website does NOT include an RSVP/reservation form.
- The opening design and interactions are a working first version;
  personalize them using the actual couple photography in the next step.
