/**
 * projects.js
 * All project data for the portfolio grid.
 * Add / remove / reorder entries here without touching index.html or main.js.
 */

/* ── Inline icon helpers ─────────────────────────────────────────────────── */

function imgIcon(src) {
  return `<img src="${src}" alt="">`;
}

const GAME_ICON_SVG = `
  <svg viewBox="0 0 24 24" fill="none"
       stroke="rgba(130,200,255,0.9)" stroke-width="1.5"
       stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="4"/>
    <line x1="8" y1="12" x2="12" y2="12"/>
    <line x1="10" y1="10" x2="10" y2="14"/>
    <circle cx="16" cy="11" r="1" fill="rgba(130,200,255,0.9)"/>
    <circle cx="18" cy="13" r="1" fill="rgba(130,200,255,0.9)"/>
  </svg>
`;

const CLUB_ICON = imgIcon('assets/images/bridge-club.png');

/* ── Colour map for each project group ──────────────────────────────────── */
export const GROUPS = {
  'IOM Prayer Times':      { color: '#c8a84b' },
  'Jersey Islamic Centre': { color: '#7ec9a0' },
  'Games':                 { color: '#82c8f0' },
  'Private':               { color: '#d4a5c9' },
};

/* ── Project list ────────────────────────────────────────────────────────── */
export const projects = [
  {
    group: 'IOM Prayer Times',
    title: 'Masjid Display System',
    desc:  'Real-time prayer display running inside the Isle of Man Islamic Centre — designed for clarity, reliability and beauty.',
    url:   'pttv.abdeen.uk',
    href:  'https://pttv.abdeen.uk',
    icon:  imgIcon('assets/images/iom.png'),
  },
  {
    group: 'IOM Prayer Times',
    title: 'Prayer Times Backend',
    desc:  'Server infrastructure powering all IOM prayer-time data — calculation engine, API and scheduling.',
    url:   'ptbe.abdeen.uk',
    href:  'https://ptbe.abdeen.uk',
    icon:  imgIcon('assets/images/iom.png'),
  },
  {
    group: 'IOM Prayer Times',
    title: 'Prayer Times — Android',
    desc:  'Native Android app delivering accurate daily prayer times to the Isle of Man Muslim community.',
    url:   'Google Play Store',
    href:  'https://play.google.com/store/apps/details?id=com.iomprayertimes',
    icon:  imgIcon('assets/images/iom.png'),
  },
  {
    group: 'IOM Prayer Times',
    title: 'Prayer Times — iOS',
    desc:  'Native iOS app for IOM prayer times, crafted for iPhone and iPad with an accessible, elegant interface.',
    url:   'App Store',
    href:  'https://apps.apple.com/gb/app/iom-prayer-times/id6758450458',
    icon:  imgIcon('assets/images/iom.png'),
  },
  {
    group: 'IOM Prayer Times',
    title: 'Islamic School Portal',
    desc:  "Digital platform supporting the IOM Masjid's Islamic school — students, schedules and resources in one place.",
    url:   'student.abdeen.uk',
    href:  'https://student.abdeen.uk',
    icon:  imgIcon('assets/images/iom.png'),
  },
  {
    group: 'Jersey Islamic Centre',
    title: 'JIC Prayer Times Backend',
    desc:  'Dedicated prayer-time infrastructure for Jersey Islamic Centre — robust, tested and serving the Jersey community.',
    url:   'jic-prayer-times.web.app',
    href:  'https://jic-prayer-times.web.app/',
    icon:  imgIcon('assets/images/jersey.png'),
  },
  {
    group: 'Jersey Islamic Centre',
    title: 'JIC Prayer Times — iOS',
    desc:  'Polished iOS app delivering Jersey Islamic Centre prayer times to the local Muslim community on iPhone.',
    url:   'App Store',
    href:  'https://apps.apple.com/ae/app/jic-prayer-times/id6760294481',
    icon:  imgIcon('assets/images/jersey.png'),
  },
  {
    group: 'Games',
    title: 'Criminal Investigator Game',
    desc:  'A web investigation game where strategy meets intelligence — players work through layered clues to crack the case.',
    url:   'cigame.abdeen.uk',
    href:  'https://cigame.abdeen.uk',
    icon:  imgIcon('assets/images/cigame.png'),
  },
  {
    group: 'Games',
    title: 'Bridge — Precision Club',
    desc:  'Interactive reference and training tool for the Precision Club bridge bidding system.',
    url:   'bridge.abdeen.uk',
    href:  'https://bridge.abdeen.uk',
    icon:  CLUB_ICON,
  },
  {
    group: 'Private',
    title: 'Abdeen Family',
    desc:  'A private, secure digital space built exclusively for the Abdeen family — news, memories and coordination.',
    url:   'family.abdeen.uk',
    href:  'https://family.abdeen.uk',
    icon:  imgIcon('assets/images/family.png'),
  },
];
