import { site } from "@/config/site";

/**
 * Blog content model.
 *
 * Posts are authored as an ordered list of typed blocks. Keeping content
 * structured (rather than one HTML blob) lets us:
 *  - render clean, semantic HTML for SEO + accessibility,
 *  - auto-build a table of contents from `h2` blocks,
 *  - compute reading time,
 *  - extract a plain-text `articleBody` and FAQ entries for JSON-LD,
 *    which is what AI answer engines (GEO) and Google rich results read.
 *
 * Inline markup inside any `text` field supports a tiny markdown subset:
 *   **bold**  and  [label](/internal-or-https-url)
 */

export type Block =
  | { type: "lead"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; items: string[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "faq"; items: { q: string; a: string }[] }
  | { type: "cta"; text: string };

export interface Post {
  slug: string;
  title: string;
  /** Used for <title> + OG. Keep ≤ 60 chars where possible. */
  seoTitle?: string;
  /** Meta description + OG description. Keep ~150–160 chars. */
  description: string;
  /** Short card summary for the listing page. */
  excerpt: string;
  /** Primary keyword/topic this post targets. */
  keyword: string;
  tags: string[];
  /** ISO date. */
  published: string;
  updated: string;
  body: Block[];
}

/* ------------------------------------------------------------------ */
/* Posts                                                               */
/* ------------------------------------------------------------------ */

const posts: Post[] = [
  {
    slug: "what-is-a-life-calendar",
    title: "What Is a Life Calendar? The “4,000 Weeks” Idea, Explained",
    seoTitle: "What Is a Life Calendar? The 4,000 Weeks Idea",
    description:
      "A life calendar is a grid where each square is one week of your life. Here’s what it is, where the “4,000 weeks” idea comes from, and why it changes how you spend time.",
    excerpt:
      "Each square is one week of your life. We unpack the 4,000-weeks idea, the psychology behind it, and how a simple grid quietly rewires the way you treat today.",
    keyword: "life calendar",
    tags: ["Life calendar", "Memento mori", "Time"],
    published: "2026-09-28",
    updated: "2026-09-28",
    body: [
      {
        type: "lead",
        text: "A life calendar is a single grid that shows your entire life as a set of small squares or dots — one for every week you’re likely to live. It sounds almost too simple. But seeing all of your time at once does something no to-do list ever has: it makes time feel real.",
      },
      {
        type: "callout",
        title: "The short answer",
        items: [
          "A **life calendar** maps a human lifespan onto a grid where **each square equals one week** (sometimes a day or a month).",
          "A long life is roughly **4,000 weeks** — about 80 years — a number small enough to fit on one screen.",
          "The weeks you’ve already lived are filled in; the rest are blank. The point isn’t fear — it’s **attention**.",
          "People use life calendars as wall posters, spreadsheets, or a [live wallpaper like Dotly](/#idea) so the grid is always in view.",
        ],
      },
      {
        type: "h2",
        id: "where-the-idea-comes-from",
        text: "Where the “4,000 weeks” idea comes from",
      },
      {
        type: "p",
        text: "If you live to 80, you get about 4,000 weeks. The framing was popularized by Oliver Burkeman’s book **Four Thousand Weeks**, but the underlying practice is far older. For centuries, Stoic philosophers kept a reminder close — **memento mori**, Latin for “remember that you will die” — not to be grim, but to stop wasting the time they had.",
      },
      {
        type: "p",
        text: "The number lands differently than “80 years.” Years are abstract; you can’t picture 80 of them. But 4,000 of anything fits in your head. Draw it as a grid — 52 columns for the weeks in a year, 80 rows for a long life — and your whole existence sits in a rectangle smaller than a window.",
      },
      {
        type: "stats",
        items: [
          { value: "~4,000", label: "weeks in a long (80-year) life" },
          { value: "~1,560", label: "weeks already spent by age 30" },
          { value: "1", label: "week you are living right now" },
        ],
      },
      {
        type: "h2",
        id: "why-a-grid-works",
        text: "Why a grid works when a number doesn’t",
      },
      {
        type: "p",
        text: "We measure life in units too big to feel — years, decades, “someday.” So days slip past unnoticed and “later” quietly becomes “never.” A life calendar fixes the scale. Instead of an endless horizon, you see a finite, countable set of squares. The ones behind you are filled. The ones ahead are not — and there are fewer than you’d guess.",
      },
      {
        type: "p",
        text: "This is a well-known effect in behavioral science: concrete, visual representations of time prompt better long-term decisions than abstract ones. When a goal has a visible deadline you can *see*, you stop deferring it. A life calendar simply applies that to the biggest deadline there is.",
      },
      {
        type: "quote",
        text: "It’s not about anxiety. It’s about attention. When you can see the whole grid, today stops feeling infinite and starts feeling precious.",
      },
      {
        type: "h2",
        id: "ways-to-build-one",
        text: "Ways to build a life calendar",
      },
      {
        type: "p",
        text: "There’s no single correct format. Pick the one you’ll actually look at:",
      },
      {
        type: "ul",
        items: [
          "**Wall poster** — a printed grid you mark by hand each week. Tangible, but easy to forget.",
          "**Spreadsheet** — 52 columns × 80 rows, shaded as you go. Flexible, but it lives in a tab you close.",
          "**Live wallpaper** — the grid sits on your phone’s home screen and updates itself. You see it dozens of times a day without any effort. This is the approach [Dotly](/#features) takes.",
        ],
      },
      {
        type: "p",
        text: "The best life calendar is the one that stays in view. A poster in a drawer changes nothing; a grid you glance at every time you unlock your phone changes the texture of the whole day.",
      },
      {
        type: "h2",
        id: "weeks-days-or-years",
        text: "Weeks, days, or years — which unit?",
      },
      {
        type: "p",
        text: "The unit sets the mood of the calendar:",
      },
      {
        type: "ul",
        items: [
          "**Weeks** — the classic choice. ~4,000 squares: granular enough to feel real, coarse enough to see the whole life at once.",
          "**Days** — ~30,000 squares. Intense and detailed; better for a single year than a whole life.",
          "**Months or years** — gentler and more zoomed-out, good if the week grid feels overwhelming at first.",
        ],
      },
      {
        type: "p",
        text: "A good life-calendar tool lets you switch units freely, so you can zoom from “this year” down to “this week” depending on what you need to see today.",
      },
      {
        type: "h2",
        id: "is-it-depressing",
        text: "Is a life calendar depressing?",
      },
      {
        type: "p",
        text: "It can look confronting for a second — then it usually does the opposite. Most people report feeling *lighter*, not darker. Seeing the grid tends to shrink the small anxieties and sharpen the big priorities. The point of memento mori was never despair; it was to make ordinary days matter. We go deeper on this in [Memento Mori Isn’t Morbid](/blog/memento-mori-not-morbid).",
      },
      {
        type: "faq",
        items: [
          {
            q: "What is a life calendar?",
            a: "A life calendar is a grid that represents an entire human lifespan, where each square or dot stands for one unit of time — usually a week. The weeks you’ve lived are filled in and the rest are blank, so you can see your whole life at a glance.",
          },
          {
            q: "How many weeks are in a life?",
            a: "A long life of about 80 years is roughly 4,000 weeks. By age 30 you’ve already spent around 1,560 of them. The exact number varies by person, but the grid is meant as a perspective tool, not a precise prediction.",
          },
          {
            q: "What is the 4,000 weeks concept?",
            a: "“Four thousand weeks” is a way of expressing a human lifespan in a number small enough to picture. It was popularized by Oliver Burkeman’s book of the same name and draws on the ancient idea of memento mori — remembering life is finite so you spend it well.",
          },
          {
            q: "How do I make a life calendar on my phone?",
            a: "The easiest way is a live-wallpaper app that renders the grid on your home screen and fills it in automatically from your birth date. Dotly does this on Android, with a dot grid, countdown widgets, and adjustable units.",
          },
        ],
      },
      {
        type: "cta",
        text: "Dotly puts a living version of this grid on your home screen — each dot a week, the current one glowing. See your time, and spend it on what matters.",
      },
    ],
  },

  {
    slug: "life-in-weeks-wallpaper-android",
    title: "How to Turn Your Phone Into a Life Calendar (Android, 2026)",
    seoTitle: "Life Calendar Wallpaper for Android: Setup Guide",
    description:
      "A step-by-step guide to setting up a “life in weeks” wallpaper and countdown widgets on Android — so your home screen quietly shows how you’re spending your time.",
    excerpt:
      "A practical, step-by-step guide to putting a life-in-weeks grid and countdown widgets on your Android home screen — plus how to choose the right unit, theme, and widget.",
    keyword: "life in weeks wallpaper android",
    tags: ["How-to", "Android", "Wallpaper", "Widgets"],
    published: "2026-10-01",
    updated: "2026-10-01",
    body: [
      {
        type: "lead",
        text: "A life calendar only works if you actually see it. The most reliable place to put one is the screen you already check dozens of times a day: your phone. Here’s how to turn an Android home screen into a living life-in-weeks calendar in a few minutes.",
      },
      {
        type: "callout",
        title: "Quick steps",
        items: [
          "Install a life-calendar app — this guide uses **[Dotly](/#download)** on Android.",
          "Enter your **birth date** so the grid can fill in the weeks you’ve lived.",
          "Set the **live wallpaper** and pick a grid unit (weeks, days, or months).",
          "Add a **widget** — a progress ring, day counter, or event countdown — to the home screen.",
          "Choose a **theme** that stays readable behind your app icons.",
        ],
      },
      {
        type: "h2",
        id: "what-you-need",
        text: "What you’ll need",
      },
      {
        type: "ul",
        items: [
          "An **Android phone** (Android 8.0 or newer works well).",
          "Your **birth date** — this is the only input the grid needs.",
          "About **five minutes**. No account, no sign-in.",
        ],
      },
      {
        type: "p",
        text: "Everything below is stored on your device. A good life-calendar app needs no login and works fully offline — your birthday and events never have to leave your phone.",
      },
      {
        type: "h2",
        id: "step-by-step",
        text: "Step by step: the life-in-weeks wallpaper",
      },
      {
        type: "steps",
        items: [
          {
            title: "Install the app",
            text: "Download [Dotly from Google Play](https://play.google.com/store/apps/details?id=com.dotly.app). It’s free, and the core wallpaper and widgets don’t cost anything.",
          },
          {
            title: "Enter your birth date",
            text: "This is what lets the grid show how many weeks you’ve lived. It stays on your device — there’s no account and nothing is uploaded.",
          },
          {
            title: "Choose your unit",
            text: "Pick weeks for the classic ~4,000-dot life grid, days for a detailed single year, or months for a gentler zoomed-out view. You can switch anytime.",
          },
          {
            title: "Set the live wallpaper",
            text: "Apply the grid as your wallpaper. The dots you’ve lived are filled; the current week glows; the rest wait ahead of you.",
          },
          {
            title: "Add a widget",
            text: "Long-press the home screen, choose Widgets, and drop in a progress ring or countdown. Resize it to taste.",
          },
          {
            title: "Pick a theme",
            text: "Match it to your home screen and make sure the dots stay readable behind your icons. Done — your time is now always in view.",
          },
        ],
      },
      {
        type: "h2",
        id: "choosing-a-widget",
        text: "Choosing the right widget",
      },
      {
        type: "p",
        text: "Wallpaper gives you the big picture; widgets answer specific questions at a glance. Dotly includes six styles:",
      },
      {
        type: "ul",
        items: [
          "**Progress ring** — your year or life as a filling circle.",
          "**Big-number day counter** — the single number that matters today.",
          "**Wide progress bar** — a slim bar for the current year.",
          "**Dot grid** — the life calendar in miniature.",
          "**Event countdown** — days until a birthday, trip, or deadline.",
          "**Relationship tracker** — days since a date that matters.",
        ],
      },
      {
        type: "p",
        text: "If you’re not sure, start with the progress ring for the year and one event countdown. New to the whole concept? Read [What Is a Life Calendar?](/blog/what-is-a-life-calendar) first — it explains why the grid is worth looking at.",
      },
      {
        type: "h2",
        id: "tips",
        text: "Tips for a wallpaper you’ll actually keep",
      },
      {
        type: "ul",
        items: [
          "**Keep contrast high.** Pick a theme where the ‘lived’ and ‘ahead’ dots clearly differ, so the grid reads instantly behind your icons.",
          "**Don’t over-crowd the home screen.** A clear grid with one widget beats a wall of counters.",
          "**Match the unit to your intent.** Weeks for perspective, days for urgency on a single goal.",
          "**Set one meaningful countdown.** A real date — a trip, a deadline — makes the widget earn its place.",
        ],
      },
      {
        type: "h2",
        id: "battery-and-privacy",
        text: "Does a live wallpaper hurt battery or privacy?",
      },
      {
        type: "p",
        text: "A well-built life wallpaper shouldn’t. Dotly’s wallpaper and widgets are deliberately lightweight and refresh infrequently — everything is drawn locally, with no constant background work or network activity. And because there’s no account and nothing syncs, your birth date and events stay on your device. We cover this in the [FAQ](/#faq).",
      },
      {
        type: "faq",
        items: [
          {
            q: "How do I set a life calendar wallpaper on Android?",
            a: "Install a life-calendar app such as Dotly, enter your birth date, choose a unit (weeks, days, or months), then apply it as your live wallpaper. Optionally add a progress or countdown widget to the home screen. It takes about five minutes and needs no account.",
          },
          {
            q: "Is a life-in-weeks wallpaper free?",
            a: "Dotly is free to download, and the core wallpaper and widgets are free to use. A one-time or subscription Pro upgrade removes ads and unlocks premium themes, custom grid styles, and unlimited events.",
          },
          {
            q: "Will a live wallpaper drain my battery?",
            a: "Not noticeably if it’s built well. Dotly’s wallpaper and widgets refresh infrequently and render locally, so there’s no constant background work or network activity.",
          },
          {
            q: "Is there an iOS version?",
            a: "Dotly is on Android today. An iOS version is planned, and the design is built to feel at home on both platforms.",
          },
        ],
      },
      {
        type: "cta",
        text: "Ready to see your time? Install Dotly, enter your birth date, and your home screen becomes a living life calendar in about five minutes.",
      },
    ],
  },

  {
    slug: "memento-mori-not-morbid",
    title: "Memento Mori Isn’t Morbid: How Seeing Time Helps You Live Better",
    seoTitle: "Memento Mori Meaning: Why It Helps You Live Better",
    description:
      "Memento mori means “remember you will die.” Far from morbid, it’s one of the oldest tools for living with intention. Here’s what it means and how to practice it today.",
    excerpt:
      "“Remember you will die” sounds grim — but for the Stoics it was a tool for living fully. Here’s the real meaning of memento mori and how to practice it without the doom.",
    keyword: "memento mori meaning",
    tags: ["Memento mori", "Stoicism", "Intentional living"],
    published: "2026-10-04",
    updated: "2026-10-04",
    body: [
      {
        type: "lead",
        text: "Memento mori is Latin for “remember that you will die.” It sounds like something carved on a tombstone. But for the people who coined it, it wasn’t about death at all — it was about life, and spending it on purpose while you still can.",
      },
      {
        type: "callout",
        title: "In one minute",
        items: [
          "**Memento mori** = “remember you will die.” It’s a reminder of life’s finiteness, not a celebration of death.",
          "The **Stoics** used it to cut through trivial worries and focus on what they could control today.",
          "Modern research agrees: seeing time as **finite and concrete** improves long-term choices and gratitude.",
          "You can practice it gently — a journal, a morning question, or a [life-calendar wallpaper](/blog/what-is-a-life-calendar) that keeps your weeks in view.",
        ],
      },
      {
        type: "h2",
        id: "what-it-means",
        text: "What memento mori actually means",
      },
      {
        type: "p",
        text: "The phrase comes from ancient Rome. One popular story holds that victorious generals, parading through the city, had a servant whisper a reminder that glory is temporary and they, too, were mortal. The Stoic philosophers — Seneca, Epictetus, Marcus Aurelius — turned the idea into a daily practice.",
      },
      {
        type: "quote",
        text: "You could leave life right now. Let that determine what you do and say and think.",
        cite: "Marcus Aurelius, Meditations",
      },
      {
        type: "p",
        text: "Read coldly, that’s bleak. Read as intended, it’s liberating. If this could be the last conversation, you’re kinder in it. If today is not guaranteed, the project you keep deferring suddenly deserves an hour. Memento mori is a lens that makes the important things look important again.",
      },
      {
        type: "h2",
        id: "why-it-works",
        text: "Why remembering mortality makes you happier, not sadder",
      },
      {
        type: "p",
        text: "This is the part that surprises people. Confronting finiteness tends to *increase* well-being, not decrease it. A few reasons researchers and philosophers point to:",
      },
      {
        type: "ul",
        items: [
          "**It shrinks trivial worries.** Against the backdrop of a whole life, a lot of daily stress loses its grip.",
          "**It fuels gratitude.** Scarcity makes things precious. A finite number of mornings makes an ordinary one feel like a gift.",
          "**It drives action.** Vague deadlines get ignored; visible ones get met. Mortality is the ultimate visible deadline.",
          "**It clarifies priorities.** “Would this matter if my time were limited?” is a fast, honest filter — and your time *is* limited.",
        ],
      },
      {
        type: "p",
        text: "There’s a behavioral-science throughline here: humans discount the future heavily and treat time as abstract. Anything that makes time **concrete and visible** — a countdown, a grid, a filling bar — helps us act in our own long-term interest. That’s exactly what a life calendar does.",
      },
      {
        type: "h2",
        id: "how-to-practice",
        text: "How to practice memento mori (without the doom)",
      },
      {
        type: "p",
        text: "You don’t need robes or a skull on your desk. Pick one small, repeatable practice:",
      },
      {
        type: "steps",
        items: [
          {
            title: "Ask one morning question",
            text: "“If my time were limited — and it is — what’s the one thing today that would matter?” Then do that first.",
          },
          {
            title: "Keep a short evening note",
            text: "One line on how you spent the day. Over weeks, the pattern tells you where your time actually goes.",
          },
          {
            title: "Make time visible",
            text: "Put a life calendar or countdown somewhere you can’t avoid it — ideally your phone, which you already check all day.",
          },
          {
            title: "Set a real countdown",
            text: "Pick a date that matters and watch it approach. Urgency, used gently, is a gift.",
          },
        ],
      },
      {
        type: "p",
        text: "If you want the “make time visible” step to be effortless, that’s precisely what Dotly is for — and if you’re new to the idea of a weekly grid, start with [What Is a Life Calendar?](/blog/what-is-a-life-calendar), then see [how to set it up on Android](/blog/life-in-weeks-wallpaper-android).",
      },
      {
        type: "h2",
        id: "the-point",
        text: "The point: less counting down, more living up",
      },
      {
        type: "p",
        text: "Memento mori isn’t a countdown to dread. It’s a reminder to stop sleepwalking through days that won’t come back. Seen clearly, your time isn’t frightening — it’s valuable, which is a very different feeling. The grid doesn’t ask you to fear the blank squares. It asks you to notice the one you’re living in.",
      },
      {
        type: "faq",
        items: [
          {
            q: "What does memento mori mean?",
            a: "Memento mori is Latin for “remember that you will die.” It’s a reflective reminder that life is finite, used throughout history — especially by the Stoics — to encourage living with intention and gratitude rather than to dwell on death.",
          },
          {
            q: "Is memento mori depressing or negative?",
            a: "Most people find it does the opposite. Remembering that time is finite tends to reduce trivial worries, increase gratitude, and sharpen priorities. The goal is a fuller life now, not fear of the end.",
          },
          {
            q: "How do you practice memento mori today?",
            a: "Choose one small habit: a morning question about what truly matters today, a one-line evening reflection, a real countdown to a meaningful date, or a life-calendar wallpaper that keeps your weeks in view so time stays concrete.",
          },
          {
            q: "What’s the connection between memento mori and a life calendar?",
            a: "A life calendar is a modern, visual form of memento mori. Instead of an abstract reminder, it shows your lifespan as a grid of weeks — making the Stoic idea concrete and easy to glance at every day.",
          },
        ],
      },
      {
        type: "cta",
        text: "Dotly is memento mori made quiet and useful: a grid of weeks on your home screen, the current one glowing. Less counting down. More living up.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => +new Date(b.published) - +new Date(a.published)
  );
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}

/** Strip inline markdown (**bold**, [label](href)) to plain text. */
export function stripInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

/** All plain-text content of a post, for reading time + JSON-LD articleBody. */
export function postPlainText(post: Post): string {
  const parts: string[] = [post.title, post.description];
  for (const b of post.body) {
    switch (b.type) {
      case "lead":
      case "h2":
      case "h3":
      case "p":
      case "cta":
        parts.push(stripInline(b.text));
        break;
      case "quote":
        parts.push(stripInline(b.text));
        break;
      case "ul":
      case "ol":
        parts.push(b.items.map(stripInline).join(" "));
        break;
      case "callout":
        parts.push(b.title, b.items.map(stripInline).join(" "));
        break;
      case "stats":
        parts.push(b.items.map((i) => `${i.value} ${i.label}`).join(" "));
        break;
      case "steps":
        parts.push(
          b.items.map((i) => `${i.title} ${stripInline(i.text)}`).join(" ")
        );
        break;
      case "faq":
        parts.push(
          b.items.map((i) => `${i.q} ${stripInline(i.a)}`).join(" ")
        );
        break;
    }
  }
  return parts.join(" ");
}

export function readingTimeMinutes(post: Post): number {
  const words = postPlainText(post).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Table-of-contents entries built from h2 blocks. */
export function getToc(post: Post): { id: string; text: string }[] {
  return post.body
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id, text: stripInline(b.text) }));
}

/** FAQ entries across the post, for FAQPage JSON-LD. */
export function getFaqs(post: Post): { q: string; a: string }[] {
  const out: { q: string; a: string }[] = [];
  for (const b of post.body) {
    if (b.type === "faq") out.push(...b.items.map((i) => ({ q: i.q, a: stripInline(i.a) })));
  }
  return out;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const blogMeta = {
  title: "The Dotly Journal",
  description:
    "Essays on time, attention, and intentional living from the team behind Dotly — the life-calendar wallpaper by " +
    site.parent +
    ".",
  path: "/blog",
} as const;
