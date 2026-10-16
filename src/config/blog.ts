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
  /**
   * Primary sources cited in the post. Rendered as a visible "Sources" list
   * and emitted as `citation` in JSON-LD — a trust signal for readers,
   * Google (E-E-A-T), and AI answer engines.
   */
  sources?: { label: string; url?: string }[];
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

  /* ---------------------------------------------------------------- */

  {
    slug: "how-many-weeks-have-i-lived",
    title: "How Many Weeks Have I Lived? The Simple Formula (With Examples)",
    seoTitle: "How Many Weeks Have I Lived? Formula + Age Chart",
    description:
      "Work out exactly how many weeks you’ve lived with one simple formula. Includes a worked example, an age-by-age chart, and spreadsheet and code shortcuts.",
    excerpt:
      "One formula, a worked example, and a chart from age 18 to 60 — plus how many weeks a typical life actually holds, and what to do with the number once you have it.",
    keyword: "how many weeks have i lived",
    tags: ["Life calendar", "Calculator", "How-to"],
    published: "2026-10-17",
    updated: "2026-10-17",
    body: [
      {
        type: "lead",
        text: "To find how many weeks you’ve lived, count the days since you were born and divide by 7. That’s the whole method. The number you get — usually somewhere between 1,000 and 3,500 for most adults — is one of the most clarifying figures you’ll ever calculate.",
      },
      {
        type: "callout",
        title: "The short answer",
        items: [
          "**Weeks lived = (today’s date − your birth date, in days) ÷ 7**, rounded down.",
          "Quick estimate: **your age × 52.18**. A 30-year-old has lived about **1,565 weeks**.",
          "A life of 80 years is about **4,174 weeks**; “four thousand weeks” is roughly **76.7 years**.",
          "The current global life expectancy at birth is **73.3 years** (WHO, 2023) — about **3,825 weeks**.",
        ],
      },
      {
        type: "h2",
        id: "the-formula",
        text: "The formula for weeks lived",
      },
      {
        type: "p",
        text: "A week is always exactly 7 days, so weeks are the easiest unit to calculate precisely. Months and years are not — months range from 28 to 31 days, and leap years add a day every four years. That’s why the reliable method is to count **days first**, then convert:",
      },
      {
        type: "ol",
        items: [
          "Count the total number of days between your birth date and today (leap days included).",
          "Divide that number by 7.",
          "Round down. The whole number is the weeks you’ve **completed**; the remainder is how many days into your current week you are.",
        ],
      },
      {
        type: "p",
        text: "If you only need a fast estimate, multiply your age in years by **52.18**. That figure comes from 365.25 days (an average year, counting leap years) divided by 7. It will be within a few weeks of the exact answer.",
      },
      {
        type: "h2",
        id: "worked-example",
        text: "A worked example",
      },
      {
        type: "p",
        text: "Say you were born on **March 15, 1996**, and today is **October 17, 2026**.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Count the full years",
            text: "March 15, 1996 to March 15, 2026 is 30 years. That’s 30 × 365 = 10,950 days, plus 7 leap days (Feb 29 in 2000, 2004, 2008, 2012, 2016, 2020, and 2024) = **10,957 days**.",
          },
          {
            title: "Add the remaining days",
            text: "March 15 to October 17, 2026 is **216 days**. Total: 10,957 + 216 = **11,173 days**.",
          },
          {
            title: "Divide by 7",
            text: "11,173 ÷ 7 = 1,596.1. So this person has lived **1,596 complete weeks** and is 1 day into week 1,597.",
          },
        ],
      },
      {
        type: "p",
        text: "Check it against the shortcut: 30.59 years × 52.18 ≈ 1,596. The two methods agree.",
      },
      {
        type: "h2",
        id: "age-chart",
        text: "Weeks lived by age: a quick chart",
      },
      {
        type: "p",
        text: "Use this to sanity-check your own number. Values are rounded to the nearest week.",
      },
      {
        type: "ul",
        items: [
          "**Age 18** — about **939 weeks** lived",
          "**Age 25** — about **1,304 weeks**",
          "**Age 30** — about **1,565 weeks**",
          "**Age 40** — about **2,087 weeks**",
          "**Age 50** — about **2,609 weeks**",
          "**Age 60** — about **3,131 weeks**",
          "**Age 80** — about **4,174 weeks**",
          "**Age 90** — about **4,696 weeks**",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "52.18", label: "average weeks per year" },
          { value: "~3,825", label: "weeks in a 73.3-year life (WHO global average)" },
          { value: "~4,174", label: "weeks in an 80-year life" },
        ],
      },
      {
        type: "h2",
        id: "shortcuts",
        text: "Shortcuts: spreadsheet, phone, and code",
      },
      {
        type: "h3",
        text: "Google Sheets or Excel",
      },
      {
        type: "p",
        text: "Put your birth date in cell A1, then use **=INT((TODAY()-A1)/7)** in any other cell. Spreadsheets store dates as day counts, so subtracting two dates gives days directly. The result updates every day you open the sheet.",
      },
      {
        type: "h3",
        text: "Python",
      },
      {
        type: "p",
        text: "**(date.today() - date(1996, 3, 15)).days // 7** — after **from datetime import date**. The double slash is integer division, which rounds down to completed weeks.",
      },
      {
        type: "h3",
        text: "On your home screen",
      },
      {
        type: "p",
        text: "If you want the number without doing the math again, a life-calendar app does it for you and keeps it visible. [Dotly](/#how) fills in one dot per week you’ve lived from your birth date, so the count is always up to date on your wallpaper. Setup takes about five minutes — see the [Android setup guide](/blog/life-in-weeks-wallpaper-android).",
      },
      {
        type: "h2",
        id: "common-mistakes",
        text: "Common mistakes to avoid",
      },
      {
        type: "ul",
        items: [
          "**Multiplying by 52 instead of 52.18.** A year is 52 weeks plus 1 day (2 in a leap year). Over 40 years, using 52 undercounts by about 7 weeks.",
          "**Forgetting leap days.** Counting 365 days per year drops roughly one day every four years.",
          "**Counting months as 4 weeks.** A month averages about 4.35 weeks, so “age in months × 4” is off by more than 8%.",
          "**Mixing up completed and current weeks.** If your result is 1,596.1, you are living in week 1,597.",
        ],
      },
      {
        type: "h2",
        id: "what-to-do-with-it",
        text: "What to do with the number",
      },
      {
        type: "p",
        text: "On its own, the number is just arithmetic. Its value is in the comparison it makes possible. Put it next to the roughly 4,000 weeks of a long life and you can see the proportion: how much is behind you, how much may be ahead, and how small a single week really is. That’s the core idea behind a [life calendar](/blog/what-is-a-life-calendar), and the reason the Stoics practised [memento mori](/blog/memento-mori-not-morbid).",
      },
      {
        type: "p",
        text: "A useful habit: once a week, look at your number and ask one question — **“What would make this week worth one of my 4,000?”** It turns a statistic into a decision.",
      },
      {
        type: "faq",
        items: [
          {
            q: "How do I calculate how many weeks I have lived?",
            a: "Count the days between your birth date and today, including leap days, then divide by 7 and round down. For a quick estimate, multiply your age in years by 52.18.",
          },
          {
            q: "How many weeks has a 30-year-old lived?",
            a: "About 1,565 weeks. The exact number depends on the birth date, but 30 × 52.18 gives a result within a few weeks.",
          },
          {
            q: "How many weeks are in an average human life?",
            a: "Global life expectancy at birth was 73.3 years in 2023 according to the WHO, which is about 3,825 weeks. An 80-year life is about 4,174 weeks. These are averages, not predictions for any individual.",
          },
          {
            q: "Why use weeks instead of years or days?",
            a: "Weeks are a fixed 7 days, so they’re precise, and a whole life of about 4,000 weeks fits on one screen. Years are too coarse to feel, and days (around 27,000–30,000) are too many to see at once.",
          },
          {
            q: "Is there an app that counts the weeks I’ve lived?",
            a: "Yes. Life-calendar apps such as Dotly for Android calculate it from your birth date and show it as a grid of dots on your wallpaper, updating automatically. Dotly works offline with no account.",
          },
        ],
      },
      {
        type: "cta",
        text: "Skip the spreadsheet. Dotly turns your weeks-lived number into a living grid on your home screen — one dot per week, updated automatically.",
      },
    ],
    sources: [
      {
        label: "World Health Organization — Global Health Estimates: Life expectancy and healthy life expectancy",
        url: "https://www.who.int/data/gho/data/themes/mortality-and-global-health-estimates/ghe-life-expectancy-and-healthy-life-expectancy",
      },
      {
        label: "Oliver Burkeman, Four Thousand Weeks: Time Management for Mortals (Farrar, Straus and Giroux, 2021)",
        url: "https://us.macmillan.com/books/9780374159122/fourthousandweeks",
      },
    ],
  },

  /* ---------------------------------------------------------------- */

  {
    slug: "year-progress-percentage",
    title: "Year Progress: How Much of the Year Has Passed (and Why It Motivates You)",
    seoTitle: "Year Progress: How Much of 2026 Has Passed?",
    description:
      "How to calculate what percentage of the year has passed, a month-by-month progress chart for 2026, and the research on why watching the year fill up helps you act.",
    excerpt:
      "The year-progress formula, a month-by-month percentage chart, and two well-known studies that explain why a filling bar is more motivating than a calendar.",
    keyword: "year progress percentage",
    tags: ["Year progress", "Productivity", "Widgets"],
    published: "2026-10-17",
    updated: "2026-10-17",
    body: [
      {
        type: "lead",
        text: "Year progress is the share of the current year that has already passed, shown as a percentage. It’s calculated by dividing the day of the year by the number of days in the year. On October 17, 2026 — day 290 of 365 — the year is **79.5% complete**.",
      },
      {
        type: "callout",
        title: "The short answer",
        items: [
          "**Year progress % = (day of the year ÷ days in the year) × 100.**",
          "2026 has **365 days** (not a leap year). The next leap year is **2028**, with 366.",
          "The exact halfway point of 2026 is **noon on July 2**.",
          "Seeing progress as a filling bar taps two well-studied effects: the **fresh start effect** and the **goal-gradient effect**.",
        ],
      },
      {
        type: "h2",
        id: "how-to-calculate",
        text: "How to calculate year progress",
      },
      {
        type: "steps",
        items: [
          {
            title: "Find the day of the year",
            text: "January 1 is day 1. Add up the days in each completed month, then add today’s date. October 17, 2026 = 273 (Jan–Sep) + 17 = **day 290**.",
          },
          {
            title: "Check the year length",
            text: "A year has 366 days if it’s divisible by 4 — except century years, which must also be divisible by 400. So 2026 has **365**, 2028 has **366**, and 2100 will have 365.",
          },
          {
            title: "Divide and convert",
            text: "290 ÷ 365 = 0.795, so the year is **79.5%** done, with **75 days** left.",
          },
        ],
      },
      {
        type: "p",
        text: "In a spreadsheet, **=(TODAY()-DATE(YEAR(TODAY()),1,1)+1)/(DATE(YEAR(TODAY())+1,1,1)-DATE(YEAR(TODAY()),1,1))** gives the same result and handles leap years automatically. Format the cell as a percentage.",
      },
      {
        type: "h2",
        id: "month-by-month",
        text: "2026 year progress, month by month",
      },
      {
        type: "p",
        text: "Percentage of 2026 complete at the end of each month (365-day year):",
      },
      {
        type: "ul",
        items: [
          "**January 31** — 8.5%",
          "**February 28** — 16.2%",
          "**March 31** — 24.7% (end of Q1)",
          "**April 30** — 32.9%",
          "**May 31** — 41.4%",
          "**June 30** — 49.6% (end of Q2)",
          "**July 31** — 58.1%",
          "**August 31** — 66.6%",
          "**September 30** — 74.8% (end of Q3)",
          "**October 31** — 83.3%",
          "**November 30** — 91.5%",
          "**December 31** — 100%",
        ],
      },
      {
        type: "stats",
        items: [
          { value: "365", label: "days in 2026" },
          { value: "Jul 2", label: "halfway point (at noon)" },
          { value: "0.27%", label: "of the year passes each day" },
        ],
      },
      {
        type: "h2",
        id: "why-it-motivates",
        text: "Why watching the year fill up motivates you",
      },
      {
        type: "p",
        text: "A calendar shows dates. A progress bar shows **proportion** — and proportion is what changes behaviour. Two lines of research explain why.",
      },
      {
        type: "h3",
        text: "The fresh start effect",
      },
      {
        type: "p",
        text: "In a 2014 study in Management Science, Hengchen Dai, Katherine Milkman, and Jason Riis found that people are more likely to start pursuing goals right after **temporal landmarks** — the start of a new week, month, or year, or a birthday. Google searches for “diet”, gym visits, and goal commitments all rose after these dates. The researchers argue landmarks create a mental break from your past self and prompt a big-picture view of your life.",
      },
      {
        type: "p",
        text: "A year-progress bar makes these landmarks visible. Crossing 25%, 50%, or 75% becomes a natural moment to reset — you don’t have to wait for January.",
      },
      {
        type: "h3",
        text: "The goal-gradient effect",
      },
      {
        type: "p",
        text: "First described by psychologist Clark Hull in the 1930s, the goal-gradient effect says effort increases as a goal gets closer. A 2006 study by Ran Kivetz, Oleg Urminsky, and Yuhuang Zheng in the Journal of Marketing Research showed it in people: coffee-shop customers with a loyalty card bought coffee more often as they got closer to a free drink. Seeing how close you are to the finish line speeds you up.",
      },
      {
        type: "p",
        text: "Applied to the year, a bar at 79.5% does what “October 17” can’t: it tells you, instantly, that most of the year is gone and the rest is worth using well.",
      },
      {
        type: "quote",
        text: "A date tells you where you are. A percentage tells you how much is left.",
      },
      {
        type: "h2",
        id: "how-to-use-it",
        text: "How to use year progress without the stress",
      },
      {
        type: "ul",
        items: [
          "**Pick quarterly checkpoints.** At 25%, 50%, and 75%, review one or two goals. That’s four honest check-ins a year instead of one guilty one in December.",
          "**Pair it with one countdown.** A filling bar plus a [countdown to one real date](/blog/countdown-widget-android) turns a vague year into a concrete deadline.",
          "**Look at it, don’t stare at it.** A glance a day is enough. The point is awareness, not pressure.",
          "**Zoom out occasionally.** The year is one row in a [life calendar](/blog/what-is-a-life-calendar). Seeing both scales keeps a bad month in proportion.",
        ],
      },
      {
        type: "h2",
        id: "on-your-phone",
        text: "Year progress on your phone",
      },
      {
        type: "p",
        text: "The easiest way to see year progress daily is a home-screen widget. Dotly includes a **progress ring** and a **wide progress bar** that show the current year filling up, along with a dot-grid wallpaper of your weeks. They update on their own and work offline with no account. [Here’s how to set it up](/blog/life-in-weeks-wallpaper-android).",
      },
      {
        type: "faq",
        items: [
          {
            q: "How do you calculate how much of the year has passed?",
            a: "Divide the day of the year by the number of days in the year (365, or 366 in a leap year) and multiply by 100. For example, October 17, 2026 is day 290, so 290 ÷ 365 = 79.5% of the year has passed.",
          },
          {
            q: "When is the halfway point of 2026?",
            a: "In a 365-day year the exact midpoint is 182.5 days in, which is noon on July 2. At the end of June 30, 2026, the year is 49.6% complete.",
          },
          {
            q: "Is 2026 a leap year?",
            a: "No. 2026 has 365 days. The next leap year is 2028. A year is a leap year if it’s divisible by 4, except century years, which must also be divisible by 400.",
          },
          {
            q: "Why is a year progress bar motivating?",
            a: "It makes time proportional and visible. Research on the fresh start effect shows people start goals after temporal landmarks, and the goal-gradient effect shows effort rises as a finish line gets closer. A progress bar shows both.",
          },
          {
            q: "Is there a year progress widget for Android?",
            a: "Yes. Dotly for Android includes a progress-ring and a progress-bar widget that show the current year’s progress, plus a life-in-weeks wallpaper. The core widgets are free.",
          },
        ],
      },
      {
        type: "cta",
        text: "Put the year on your home screen. Dotly’s progress ring and bar show exactly how much of the year is left — at a glance, every day.",
      },
    ],
    sources: [
      {
        label: "Dai, H., Milkman, K. L., & Riis, J. (2014). The Fresh Start Effect: Temporal Landmarks Motivate Aspirational Behavior. Management Science, 60(10).",
        url: "https://doi.org/10.1287/mnsc.2014.1901",
      },
      {
        label: "Kivetz, R., Urminsky, O., & Zheng, Y. (2006). The Goal-Gradient Hypothesis Resurrected. Journal of Marketing Research, 43(1).",
        url: "https://doi.org/10.1509/jmkr.43.1.39",
      },
    ],
  },

  /* ---------------------------------------------------------------- */

  {
    slug: "countdown-widget-android",
    title: "How to Add a Countdown Widget on Android (Any Date, Any Phone)",
    seoTitle: "Countdown Widget for Android: How to Add One",
    description:
      "Add a countdown widget to your Android home screen in under two minutes. Covers setup, how day counts work, battery impact, and how to pick the right style.",
    excerpt:
      "A step-by-step guide to putting a days-until countdown on your Android home screen — plus how widgets update, why day counts sometimes disagree, and which events are worth counting.",
    keyword: "countdown widget android",
    tags: ["How-to", "Android", "Widgets", "Countdown"],
    published: "2026-10-17",
    updated: "2026-10-17",
    body: [
      {
        type: "lead",
        text: "To add a countdown widget on Android, install an app that includes one, then touch and hold an empty spot on your home screen, tap **Widgets**, and drag the countdown onto the screen. You then pick the date to count down to. The whole thing takes under two minutes.",
      },
      {
        type: "callout",
        title: "Quick steps",
        items: [
          "Install a countdown or life-calendar app — this guide uses **[Dotly](/#widgets)**.",
          "Create an event: give it a **name** and a **date**.",
          "On your home screen, **touch and hold** an empty space, then tap **Widgets**.",
          "Find the app, **touch and hold** the countdown widget, and drag it into place.",
          "Choose which event it shows, then **resize** it by dragging the dots on its outline.",
        ],
      },
      {
        type: "h2",
        id: "step-by-step",
        text: "Step by step: adding the widget",
      },
      {
        type: "p",
        text: "These steps follow Google’s own instructions for adding widgets on Android. Menu names can vary slightly between phone makers (Samsung, Pixel, OnePlus, Xiaomi), but the flow is the same everywhere.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Install an app with a countdown widget",
            text: "Android doesn’t include a standalone countdown widget, so you need an app that provides one. [Dotly](https://play.google.com/store/apps/details?id=com.dotly.app) is free and includes an event-countdown widget alongside its life-calendar wallpaper.",
          },
          {
            title: "Create your event",
            text: "Open the app and add the date you’re counting to — a trip, a birthday, an exam, a launch. Give it a short name so it reads well at small sizes.",
          },
          {
            title: "Open the widget picker",
            text: "Go to your home screen, touch and hold an empty space, and tap Widgets. Tip: on many phones you can also touch and hold the app icon itself and tap Widgets.",
          },
          {
            title: "Place the widget",
            text: "Scroll to the app, tap it to see its widgets, then touch and hold the countdown and drag it to where you want it. Lift your finger to drop it.",
          },
          {
            title: "Pick the event and resize",
            text: "Choose which event the widget should show. To resize, touch and hold the widget, release, then drag the dots on its outline. Tap outside to finish.",
          },
        ],
      },
      {
        type: "h2",
        id: "how-day-counts-work",
        text: "Why two countdowns sometimes show different numbers",
      },
      {
        type: "p",
        text: "If you’ve ever seen one app say “69 days” and another say “70”, neither is necessarily wrong. Countdowns make one of three choices:",
      },
      {
        type: "ul",
        items: [
          "**Calendar days remaining (exclusive)** — counts the days between today and the event, not including today. From Saturday, October 17 to Friday, December 25, 2026 is **69 days**. This is the most common convention.",
          "**Inclusive count** — includes both today and the event day, giving **70**. Some people prefer it for “days left to prepare”.",
          "**Time-based** — counts exact hours to midnight on the event date, so the number can change mid-day depending on your time zone.",
        ],
      },
      {
        type: "p",
        text: "For most events, the exclusive calendar-day count is what you want: on the day before, it reads “1 day”, and on the day itself, “Today”.",
      },
      {
        type: "h2",
        id: "battery",
        text: "Do countdown widgets drain your battery?",
      },
      {
        type: "p",
        text: "A well-built one doesn’t. Android limits how often a widget can schedule its own routine refresh: according to Android’s developer documentation, updates requested through a widget’s **updatePeriodMillis** setting are delivered no more than once every **30 minutes**. A day counter only needs to change once a day, so a good countdown widget does almost no work.",
      },
      {
        type: "p",
        text: "Dotly’s widgets are drawn locally on the device and refresh infrequently, with no network activity — so there’s nothing running in the background to drain battery or send data anywhere.",
      },
      {
        type: "h2",
        id: "choosing-a-style",
        text: "Choosing the right widget style",
      },
      {
        type: "p",
        text: "Different questions need different widgets. Dotly includes six, each resizable and themed to match:",
      },
      {
        type: "ul",
        items: [
          "**Event countdown** — “days until” a specific date. Best for trips, deadlines, and birthdays.",
          "**Big-number day counter** — one large number, readable from across the room.",
          "**Relationship tracker** — counts days **since** a date, like an anniversary or a streak.",
          "**Progress ring** — shows the [year’s progress](/blog/year-progress-percentage) as a filling circle.",
          "**Wide progress bar** — the same idea in a slim strip that fits above your dock.",
          "**Dot grid** — a miniature [life calendar](/blog/what-is-a-life-calendar).",
        ],
      },
      {
        type: "h2",
        id: "what-to-count",
        text: "What’s worth counting down to?",
      },
      {
        type: "p",
        text: "A countdown earns its place on your home screen when the date changes how you act today. Good candidates:",
      },
      {
        type: "ul",
        items: [
          "**A deadline you control** — an exam, a launch, a race. The shrinking number creates gentle urgency.",
          "**Something to look forward to** — a trip or a reunion. Anticipation is part of the pleasure.",
          "**A personal milestone** — a birthday or the end of the year. Good moments to reflect.",
        ],
      },
      {
        type: "p",
        text: "One rule of thumb: **keep one countdown on the main screen**. Several competing numbers become noise; one becomes a focus.",
      },
      {
        type: "faq",
        items: [
          {
            q: "How do I put a countdown on my Android home screen?",
            a: "Install an app that includes a countdown widget, such as Dotly, and create an event with a date. Then touch and hold an empty space on your home screen, tap Widgets, find the app, and drag the countdown widget into place.",
          },
          {
            q: "Does Android have a built-in countdown widget?",
            a: "Android doesn’t include a dedicated days-until countdown widget for events. Calendar widgets show upcoming events but not a running day count, so most people use a third-party app.",
          },
          {
            q: "Why do countdown apps show different numbers of days?",
            a: "Some count only the days between today and the event (exclusive), others include today and the event day (inclusive), and some count exact hours. The difference is usually one day.",
          },
          {
            q: "Will a countdown widget drain my battery?",
            a: "Not if it’s built well. Android delivers a widget’s scheduled updates no more than once every 30 minutes, and a day count only needs to change once a day. Dotly’s widgets render locally with no network activity.",
          },
          {
            q: "Can I count days since a date instead of until?",
            a: "Yes. Dotly’s relationship-tracker widget counts days since a date — useful for anniversaries, habits, or streaks.",
          },
        ],
      },
      {
        type: "cta",
        text: "Add a countdown that actually looks good. Dotly’s event-countdown widget is free, works offline, and matches your home-screen theme.",
      },
    ],
    sources: [
      {
        label: "Google Android Help — Add apps, shortcuts & widgets to your Home screens",
        url: "https://support.google.com/android/answer/9450271",
      },
      {
        label: "Android Developers — Create an advanced widget (update behaviour)",
        url: "https://developer.android.com/develop/ui/views/appwidgets/advanced",
      },
      {
        label: "Android Developers — AppWidgetProviderInfo reference",
        url: "https://developer.android.com/reference/android/appwidget/AppWidgetProviderInfo",
      },
    ],
  },

  /* ---------------------------------------------------------------- */

  {
    slug: "seneca-on-the-shortness-of-life",
    title: "Seneca’s On the Shortness of Life: 7 Lessons on Time That Still Hold Up",
    seoTitle: "On the Shortness of Life: Seneca’s 7 Key Lessons",
    description:
      "A clear summary of Seneca’s On the Shortness of Life: what it argues, its most famous lines, and 7 practical lessons on time you can apply this week.",
    excerpt:
      "Seneca wrote it around AD 49 to a busy Roman official. Two thousand years later, its argument — life is long enough if you stop giving it away — reads like it was written for smartphones.",
    keyword: "on the shortness of life summary",
    tags: ["Stoicism", "Seneca", "Memento mori", "Time"],
    published: "2026-10-17",
    updated: "2026-10-17",
    body: [
      {
        type: "lead",
        text: "On the Shortness of Life (De Brevitate Vitae) is a short moral essay by the Roman Stoic philosopher Seneca, written around AD 49. Its central claim is simple and uncomfortable: life isn’t short — we make it short by wasting it. Here’s what the essay says, and seven lessons from it that still work today.",
      },
      {
        type: "callout",
        title: "In one minute",
        items: [
          "**Author:** Lucius Annaeus Seneca (Seneca the Younger), Stoic philosopher and adviser to Emperor Nero.",
          "**Written:** around **AD 49**, to Paulinus — likely his father-in-law — who ran Rome’s grain supply.",
          "**Core argument:** “It is not that we have a short time to live, but that we waste a lot of it.”",
          "**The fix:** value time like property, stop postponing, and spend your days on what you’d choose deliberately.",
        ],
      },
      {
        type: "h2",
        id: "summary",
        text: "Summary: what the essay argues",
      },
      {
        type: "p",
        text: "Seneca opens by rejecting the most common complaint in the world — that life is too short. In chapter 1 he argues that life is long enough for great things **if it is well invested**. The problem is that most of it is spent on things we never chose.",
      },
      {
        type: "p",
        text: "Chapters 2 to 9 catalogue how people lose their time: chasing status, serving other people’s ambitions, drinking, worrying, and endlessly preparing to live later. Seneca calls these people **occupati** — the preoccupied. Even famous Romans like Augustus and Cicero, he notes, spent their lives wishing for a rest that never came.",
      },
      {
        type: "p",
        text: "In the later chapters he contrasts this with the life of someone who uses time deliberately — through reflection, learning, and attention to the present. He ends by urging Paulinus to step back from public duty while he still can.",
      },
      {
        type: "quote",
        text: "It is not that we have a short time to live, but that we waste a lot of it.",
        cite: "Seneca, On the Shortness of Life, ch. 1",
      },
      {
        type: "h2",
        id: "seven-lessons",
        text: "7 lessons on time from Seneca",
      },
      {
        type: "h3",
        text: "1. Life is long if you know how to use it",
      },
      {
        type: "p",
        text: "Seneca’s most famous reframe: the length of life matters less than its use. A modest life spent on purpose feels full; a long one spent drifting feels like it vanished. The practical question isn’t “how do I get more time?” but “what am I spending the time I have on?”",
      },
      {
        type: "h3",
        text: "2. Guard your time like you guard your money",
      },
      {
        type: "p",
        text: "In chapter 3, Seneca points out a strange inconsistency: people fiercely protect their property and money, yet hand over their time to anyone who asks. Time can’t be seen, so we don’t count it. His advice is to treat hours as the scarcest thing you own — because they’re the one thing you can’t earn back.",
      },
      {
        type: "h3",
        text: "3. Postponing is the biggest thief",
      },
      {
        type: "p",
        text: "Chapter 9 names the greatest obstacle to living: expectancy — hanging everything on tomorrow and losing today in the process. In his first letter to his friend Lucilius, Seneca puts it in five words that could sit on any desk:",
      },
      {
        type: "quote",
        text: "While we are postponing, life speeds by.",
        cite: "Seneca, Moral Letters to Lucilius, Letter 1 (trans. Gummere)",
      },
      {
        type: "h3",
        text: "4. Busy isn’t the same as living",
      },
      {
        type: "p",
        text: "Seneca’s occupati aren’t lazy — they’re constantly busy. That’s the problem. A full calendar can hide an empty life. The test he implies: if this week were repeated for a year, would you be glad?",
      },
      {
        type: "h3",
        text: "5. The past is the one part of time that’s safe",
      },
      {
        type: "p",
        text: "In chapter 10 Seneca divides life into three periods: the present is brief, the future is uncertain, and the past is fixed. A life spent well becomes a past you can revisit with pleasure. That’s a quiet argument for doing things worth remembering — and for reflecting on them.",
      },
      {
        type: "h3",
        text: "6. No one will give you the years back",
      },
      {
        type: "p",
        text: "Seneca reminds Paulinus that no one will restore the years once they’re gone. It’s the same idea as [memento mori](/blog/memento-mori-not-morbid): not a threat, but a reason to choose. Each week spent is permanently spent.",
      },
      {
        type: "h3",
        text: "7. Hold every hour in your grasp",
      },
      {
        type: "p",
        text: "Also from Letter 1: “hold every hour in your grasp” and “lay hold of today’s task, and you will not need to depend so much upon tomorrow’s.” The cure for a short-feeling life isn’t a grand plan. It’s attention to the next hour.",
      },
      {
        type: "h2",
        id: "applying-it-today",
        text: "How to apply Seneca’s ideas this week",
      },
      {
        type: "steps",
        items: [
          {
            title: "Audit one day",
            text: "Write down where your hours went yesterday. Seneca’s point was that we don’t notice time leaving; writing it down makes it visible.",
          },
          {
            title: "Name one thing you’re postponing",
            text: "Pick the project or conversation you keep saving for “later”. Give it 30 minutes today.",
          },
          {
            title: "Say no once",
            text: "Decline one request that takes time without giving anything back. Seneca would call it guarding your property.",
          },
          {
            title: "Make your time countable",
            text: "Seneca’s readers had no way to see their lifespan. You do. A [life calendar](/blog/what-is-a-life-calendar) shows your weeks as a grid, so the abstract becomes concrete.",
          },
        ],
      },
      {
        type: "h2",
        id: "where-to-read-it",
        text: "Where to read it",
      },
      {
        type: "p",
        text: "The essay is short — about 20 brief chapters — and readable in an afternoon. It’s widely available in public-domain translations, including John W. Basore’s Loeb Classical Library translation (1932). Penguin’s Great Ideas series publishes a pocket edition. Translations differ in wording, so the quotes here may read slightly differently in your copy.",
      },
      {
        type: "faq",
        items: [
          {
            q: "What is On the Shortness of Life about?",
            a: "It’s a moral essay by Seneca, written around AD 49, arguing that life is not short but that people make it short by wasting time on things they didn’t choose. He urges readers to value time, stop postponing, and live deliberately in the present.",
          },
          {
            q: "Who was On the Shortness of Life written to?",
            a: "It was addressed to Paulinus, probably Pompeius Paulinus, who was praefectus annonae — the official in charge of Rome’s grain supply — and likely Seneca’s father-in-law.",
          },
          {
            q: "What is the most famous quote from On the Shortness of Life?",
            a: "“It is not that we have a short time to live, but that we waste a lot of it,” from chapter 1. Another well-known line is that life is long if you know how to use it.",
          },
          {
            q: "Is On the Shortness of Life worth reading today?",
            a: "Yes. It’s short, readable in an afternoon, and its warnings about busyness, postponing, and giving away time to others apply directly to modern work and smartphone habits.",
          },
          {
            q: "How does Seneca relate to memento mori?",
            a: "Seneca was one of the Stoics who practised reflecting on mortality. His essay applies the same idea to daily time: because life is finite, each hour is worth spending deliberately.",
          },
        ],
      },
      {
        type: "cta",
        text: "Seneca’s readers couldn’t see their time. You can. Dotly puts your life in weeks on your home screen — a quiet reminder to hold every hour in your grasp.",
      },
    ],
    sources: [
      {
        label: "Seneca, De Brevitate Vitae (On the Shortness of Life) — overview, date, and addressee",
        url: "https://en.wikipedia.org/wiki/De_Brevitate_Vitae_(Seneca)",
      },
      {
        label: "Seneca, Moral Letters to Lucilius, Letter 1 (trans. Richard M. Gummere) — Wikisource",
        url: "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_1",
      },
      {
        label: "Basore, J. W. (trans.) (1932). Seneca: Moral Essays, Vol. II. Loeb Classical Library.",
      },
    ],
  },

  /* ---------------------------------------------------------------- */

  {
    slug: "why-time-speeds-up-as-you-get-older",
    title: "Why Does Time Speed Up as You Get Older? What the Research Says",
    seoTitle: "Why Does Time Go Faster as You Get Older?",
    description:
      "Why do the years feel faster with age? We explain the four leading theories — proportion, novelty, memory, and mental images — what studies found, and how to slow time down.",
    excerpt:
      "Childhood summers lasted forever; now a year disappears. Here are the four main explanations, what a 499-person study actually found, and practical ways to make time feel longer again.",
    keyword: "why does time speed up as you get older",
    tags: ["Time perception", "Psychology", "Intentional living"],
    published: "2026-10-17",
    updated: "2026-10-17",
    body: [
      {
        type: "lead",
        text: "Time seems to speed up with age mainly because adult life has less novelty, so our brains store fewer distinct memories — and when we look back, a period with few memories feels short. Each year is also a smaller fraction of a longer life. Research suggests the effect is strongest when people judge long spans, like a decade, rather than a single day.",
      },
      {
        type: "callout",
        title: "The short answer",
        items: [
          "**Proportion:** at 5, a year is 20% of your life; at 50, it’s 2%.",
          "**Novelty and memory:** routine creates fewer new memories, so the past feels compressed.",
          "**Evidence:** in a 2005 study of 499 people aged 14–94, age barely affected how fast a week or month felt — but older people felt **a decade** passed faster.",
          "**The fix:** more novelty, more attention, and making time **visible**.",
        ],
      },
      {
        type: "h2",
        id: "four-theories",
        text: "The four leading explanations",
      },
      {
        type: "h3",
        text: "1. The proportional theory",
      },
      {
        type: "p",
        text: "The oldest explanation is usually credited to the French philosopher Paul Janet in 1877: we judge a span of time against the length of life we’ve lived so far. A year is a fifth of a 5-year-old’s life but a fiftieth of a 50-year-old’s. As the denominator grows, each new year feels smaller. It’s intuitive, but it’s more a description than a mechanism — it doesn’t explain why a boring afternoon can still drag at any age.",
      },
      {
        type: "h3",
        text: "2. Novelty and the “holiday paradox”",
      },
      {
        type: "p",
        text: "Psychologist and broadcaster Claudia Hammond, in her book Time Warped, describes the **holiday paradox**: a week-long trip seems to fly by while you’re on it, yet feels long when you look back. That’s because new experiences create lots of distinct memories. Routine weeks blur together and leave little behind. Childhood is packed with firsts; adulthood, for many people, is full of repeats.",
      },
      {
        type: "h3",
        text: "3. Memory-based judgement of duration",
      },
      {
        type: "p",
        text: "Psychologists distinguish between **prospective** time (how fast time feels while it passes) and **retrospective** time (how long a period seems looking back). Retrospective estimates lean heavily on how many memories we can retrieve from a period. Fewer stored memories make a year feel shorter in hindsight — which is exactly the “where did the year go?” feeling.",
      },
      {
        type: "h3",
        text: "4. Slower “mental images” with age",
      },
      {
        type: "p",
        text: "A newer, physics-based proposal comes from Duke University engineer Adrian Bejan. In a 2019 paper in European Review, he argued that the rate at which the brain perceives changes in mental images declines with age — due to factors like saccade frequency (rapid eye movements) and the growing length and degradation of neural pathways. Fewer images per day would make the day seem to pass faster. It’s an interesting hypothesis, though it’s less established than the memory-based explanations.",
      },
      {
        type: "h2",
        id: "what-studies-found",
        text: "What the research actually found",
      },
      {
        type: "p",
        text: "The most-cited study is by Marc Wittmann and Sandra Lehnhoff of Ludwig Maximilian University of Munich, published in 2005 in Psychological Reports. They surveyed **499 people aged 14 to 94** about how fast time felt across different spans, from “very slowly” to “very fast”.",
      },
      {
        type: "ul",
        items: [
          "For **short spans** — a week, a month, even a year — age made surprisingly little difference. Most people said time felt fast.",
          "For **longer spans like a decade**, a pattern appeared: older people tended to feel the time had passed faster.",
          "Looking back over their lives, participants **over 40** said time moved slowly in childhood, then sped up steadily through their teens into early adulthood.",
        ],
      },
      {
        type: "p",
        text: "A follow-up study by William Friedman and Steve Janssen (2010) found similarly small age differences — except, again, for how fast the last 10 years felt — and concluded that the feeling of **time pressure** explained the results better than age itself.",
      },
      {
        type: "p",
        text: "In other words, “time speeds up with age” is mostly a **retrospective** effect — it’s about how life feels looking back, and it’s tied closely to how busy and routine life has become.",
      },
      {
        type: "stats",
        items: [
          { value: "499", label: "participants aged 14–94 (Wittmann & Lehnhoff, 2005)" },
          { value: "1877", label: "year Paul Janet proposed the proportional theory" },
          { value: "10 yrs", label: "span where the age effect was clearest" },
        ],
      },
      {
        type: "h2",
        id: "how-to-slow-time",
        text: "How to make time feel slower",
      },
      {
        type: "p",
        text: "You can’t change the clock, but the research points to levers you can pull:",
      },
      {
        type: "steps",
        items: [
          {
            title: "Add small firsts",
            text: "New routes, new foods, new places, new skills. Novelty creates distinct memories — the raw material of a year that feels long in hindsight.",
          },
          {
            title: "Reduce time pressure",
            text: "Feeling rushed was linked to time flying faster. Protecting even one unhurried block a week can change how the week feels.",
          },
          {
            title: "Mark your days",
            text: "A one-line journal entry turns a blurry day into a retrievable memory. Over a year, that’s 365 anchors.",
          },
          {
            title: "Make time visible",
            text: "Seeing your weeks as a [life calendar](/blog/what-is-a-life-calendar) or the year as a [progress bar](/blog/year-progress-percentage) keeps time from slipping by unnoticed — you notice weeks as they pass instead of discovering they’re gone.",
          },
        ],
      },
      {
        type: "quote",
        text: "The goal isn’t more years in your life. It’s more life you can remember in your years.",
      },
      {
        type: "p",
        text: "This is an old insight with new evidence. Two thousand years ago, Seneca argued that life feels short because we don’t pay attention to it — read our summary of [On the Shortness of Life](/blog/seneca-on-the-shortness-of-life) for how he put it.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Why does time go faster as you get older?",
            a: "Mainly because adult life has more routine and less novelty, so fewer distinct memories are formed, and periods with few memories feel short in hindsight. Each year is also a smaller proportion of the life you’ve lived. Feeling busy and rushed makes the effect stronger.",
          },
          {
            q: "Is it true that time speeds up with age?",
            a: "Partly. A 2005 study of 499 people aged 14–94 found age had little effect on how fast a week, month, or year felt, but older people did feel longer spans like a decade passed faster. It’s mainly a retrospective effect, and later research links it closely to feeling time pressure.",
          },
          {
            q: "What is the holiday paradox?",
            a: "A term used by Claudia Hammond for the way a holiday feels like it flies by while you’re on it but seems long when you look back, because new experiences create many memories.",
          },
          {
            q: "How can I make time feel slower?",
            a: "Add novelty to your weeks, reduce constant time pressure, record a short note about each day, and make time visible with a life calendar or year-progress tracker so weeks don’t pass unnoticed.",
          },
          {
            q: "What is the proportional theory of time?",
            a: "The idea, usually credited to Paul Janet in 1877, that we judge a period of time relative to how long we’ve lived. A year is 20% of a 5-year-old’s life but 2% of a 50-year-old’s, so it feels shorter as we age.",
          },
        ],
      },
      {
        type: "cta",
        text: "Notice your weeks before they’re gone. Dotly shows your life as a grid of dots on your home screen — the current week glowing — so time stays visible.",
      },
    ],
    sources: [
      {
        label: "Wittmann, M., & Lehnhoff, S. (2005). Age effects in perception of time. Psychological Reports, 97(3), 921–935.",
        url: "https://doi.org/10.2466/pr0.97.3.921-935",
      },
      {
        label: "Friedman, W. J., & Janssen, S. M. J. (2010). Aging and the speed of time. Acta Psychologica, 134(2).",
        url: "https://www.researchgate.net/publication/41465328_Aging_and_the_speed_of_time",
      },
      {
        label: "Bejan, A. (2019). Why the Days Seem Shorter as We Get Older. European Review, 27(2).",
        url: "https://doi.org/10.1017/S1062798718000741",
      },
      {
        label: "Hammond, C. (2012). Time Warped: Unlocking the Mysteries of Time Perception. Canongate.",
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
