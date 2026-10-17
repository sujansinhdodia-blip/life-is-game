// ============================================================
//  lib/config.ts
//  ✏️  ALL editable text lives here.
//  To customise: change the values in quotes, save, and refresh.
// ============================================================

export const CONFIG = {
  /** Replace with her real name */
  herName: "Gautami",

  /** Replace with your real name */
  myName: "[My Name]",

  // ── HERO TYPEWRITER LINES ──────────────────────────────────
  heroLines: [
    "I know I'm the last person you expected to hear from…",
    "and I wouldn't blame you for not wanting to read this.",
    "But I built this for you, because some things deserve to be said properly.",
    "Not to pressure you. Not to argue. Just to be honest.",
    "Will you give me a few minutes?",
  ],

  // ── STORY TIMELINE CAPTIONS ───────────────────────────────
  // Photos are loaded automatically from public/images/.
  // Captions are matched to photos in alphabetical order.
  storyMoments: [
    { caption: "The day you came into my life, everything quietly changed." },
    { caption: "You laughed, and I remember thinking: I never want to forget this sound." },
    { caption: "I had so much good in my hands, and I didn't know how to hold it gently." },
    { caption: "I hurt the person who deserved my softest side. That's on me." },
    { caption: "I miss who I was when I was with you." },
  ],

  // ── THE LETTER ────────────────────────────────────────────
  letter: `My dear Gautami,

I'm not going to start with excuses, because you've heard enough of those.

I'll start with the truth: I hurt you. My anger, my words, the way I acted when I should have listened. None of it was your fault. You never asked for too much. You only asked to be treated with kindness, and I failed at that.

I've thought about it every day since. I replay the moments I wish I could undo. I see your face, the moment your eyes stopped trusting me, and it breaks my heart that I'm the reason.

I won't tell you I've changed overnight, because you'd be right not to believe it. Trust isn't won with words. It's rebuilt with patience, with actions, and with time. But I'm working on myself, not to win you back, but because you deserved a better man, and so does everyone in my life.

You are the most beautiful thing that ever happened to me. Your smile could quiet a loud room. Your presence made ordinary days feel like something worth remembering. I love you deeply, in a way that makes me want to be better, not just say I will be.

If you never come back to me, I will understand. I'll carry my love quietly, and I'll still wish you nothing but happiness.

But if one day your heart feels even a little open, I'll be here, with gentler hands, a quieter voice, and a heart that has learned.

Whatever you choose, I just needed you to know this: you were loved, truly and deeply, and you deserved to be loved better.

Forever yours in hope,
[My Name]`,

  // ── WHY I LOVE YOU CARDS ──────────────────────────────────
  whyCards: [
    { title: "Your Smile", text: "It softens everything. It made hard days feel lighter." },
    { title: "Your Eyes", text: "They saw the best in me, even when I didn't show it." },
    { title: "Your Strength", text: "You stood up for yourself, and you were right to." },
    { title: "Your Voice", text: "Calm, warm, and the one I still hear when I'm quiet." },
    { title: "Your Heart", text: "Kind enough to give me chances I hadn't earned." },
    { title: "You, Simply", text: "Not for what you did for me, but for who you are." },
  ],

  // ── PROPOSAL SECTION ──────────────────────────────────────
  proposalLine:
    "I'm not asking you to forget the past. I'm asking if there's a chance, someday, to begin again.",

  buttonYes: "Yes, let's talk 💖",
  buttonNo: "I need more time",

  // ── OUTCOME MESSAGES ──────────────────────────────────────
  yesClosing:
    "Thank you for giving me this chance. I promise to earn it, slowly and sincerely. 🌹",
  noClosing:
    "Thank you for reading this. Whatever you decide, I respect it. Take all the time you need, and I wish you happiness always. 🤍",
} as const;

export type Config = typeof CONFIG;
