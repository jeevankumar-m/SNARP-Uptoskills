// ponytail: sample content for the UI-only pages; replace each list with an API call when its backend lands

export const COMMUNITIES = [
  { id: 'marketing', name: 'Marketing', members: 32, color: 'orange', tagline: 'Growth marketing, brand positioning, and consumer analytics research.' },
  { id: 'uiux', name: 'UI/UX', members: 25, color: 'teal', tagline: 'Design systems, human-computer interaction, and usability testing.' },
  { id: 'creative', name: 'Creative', members: 12, color: 'blue', tagline: 'Visual arts, multimedia storytelling, and generative design research.' },
  { id: 'success', name: 'Success Story', members: 35, color: 'yellow', tagline: 'Student founder journeys, published papers, and career milestones.' },
  { id: 'social', name: 'Social Network', members: 120, color: 'teal', tagline: 'Network science, social computing, and collaborative online learning.' },
  { id: 'tech', name: 'Technical Expert', members: 42, color: 'orange', tagline: 'AI algorithms, distributed systems, and open-source scientific code.' },
]

export const ARTICLES = [
  {
    id: 1,
    title: 'Peer Feedback Loops in Remote Internship Programs',
    authors: ['Sharma, A.', 'Verma, K.'],
    year: 2026,
    journal: 'Journal of Applied Learning',
    volume: '14',
    issue: '3',
    pages: '211-229',
    doi: '10.4821/jal.2026.0143',
    domain: 'Education',
    tags: ['internships', 'feedback', 'remote work'],
    abstract: 'A mixed-methods study of 318 interns showing that weekly structured peer review shortened time to first independent contribution.',
  },
  {
    id: 2,
    title: 'Lightweight Transformers for Low-Resource Indian Languages',
    authors: ['Iyer, R.', 'Nair, S.', 'Gupta, P.'],
    year: 2025,
    journal: 'Computational Linguistics Letters',
    volume: '9',
    issue: '1',
    pages: '45-61',
    doi: '10.3390/cll.2025.0091',
    domain: 'AI',
    tags: ['nlp', 'transformers', 'indic languages'],
    abstract: 'We distil a multilingual model to a quarter of its size while retaining most of its accuracy on Hindi, Tamil and Marathi benchmarks.',
  },
  {
    id: 3,
    title: 'Measuring Accessibility Debt in Student Web Projects',
    authors: ['Banerjee, T.'],
    year: 2026,
    journal: 'Proceedings of the Web Inclusion Workshop',
    pages: '12-19',
    domain: 'UI/UX',
    tags: ['accessibility', 'wcag', 'education'],
    abstract: 'An audit of 140 capstone projects that categorises recurring WCAG failures and proposes a checklist for course reviewers.',
  },
  {
    id: 4,
    title: 'Community Size and Answer Quality on Academic Q&A Forums',
    authors: ['Khan, M.', 'Reddy, L.'],
    year: 2024,
    journal: 'Social Computing Review',
    volume: '22',
    issue: '4',
    pages: '388-402',
    doi: '10.1145/scr.2024.2204',
    domain: 'Social Network',
    tags: ['online communities', 'q&a', 'network science'],
    abstract: 'Answer quality rises with community size up to a point, then plateaus as moderation load outpaces volunteer reviewers.',
  },
]

export const EVENTS = [
  { id: 1, day: '24', month: 'Oct', title: 'Writing Your First Research Paper', kind: 'Webinar', time: '5:00 PM IST', place: 'Online', going: 86 },
  { id: 2, day: '02', month: 'Nov', title: 'UptoSkills Hack Week: Build for Education', kind: 'Hackathon', time: '10:00 AM IST', place: 'Palam, New Delhi', going: 140 },
  { id: 3, day: '09', month: 'Nov', title: 'Peer Review Clinic for Authors', kind: 'Workshop', time: '4:00 PM IST', place: 'Online', going: 38 },
  { id: 4, day: '21', month: 'Nov', title: 'Design Systems in Practice', kind: 'Talk', time: '6:30 PM IST', place: 'Online', going: 57 },
]

export const CONVERSATIONS = [
  {
    id: 1,
    name: 'Dr. Asha Sen',
    unread: 1,
    messages: [
      { mine: false, text: 'Hi! I read your draft on peer feedback loops.', time: '10:02 AM' },
      { mine: true, text: 'Thank you for taking a look. Any major concerns?', time: '10:05 AM' },
      { mine: false, text: 'Your peer review notes are ready. The methods section needs a clearer sampling description.', time: '10:11 AM' },
    ],
  },
  {
    id: 2,
    name: 'Vikram Rao',
    unread: 1,
    messages: [{ mine: false, text: 'Welcome to the UI/UX community discussion board!', time: 'Yesterday' }],
  },
  {
    id: 3,
    name: 'Priya Menon',
    unread: 0,
    messages: [
      { mine: true, text: 'Are you joining the hack week?', time: 'Mon' },
      { mine: false, text: 'Yes, already registered. Want to team up?', time: 'Mon' },
    ],
  },
]

export const NOTIFICATIONS = [
  { id: 1, kind: 'review', text: 'Your paper "Peer Feedback Loops" was accepted for review.', time: '25m ago', unread: true },
  { id: 2, kind: 'like', text: 'Darlene Robertson liked your post.', time: '2h ago', unread: true },
  { id: 3, kind: 'community', text: '12 new researchers joined the Creative community.', time: '5h ago', unread: true },
  { id: 4, kind: 'event', text: 'Reminder: "Writing Your First Research Paper" starts in 2 days.', time: '1d ago', unread: false },
  { id: 5, kind: 'comment', text: 'Rahul Das commented on your post.', time: '2d ago', unread: false },
]

export const MOD_QUEUE = [
  { id: 101, title: 'Edge Caching Strategies for Campus Networks', author: 'Ananya Joshi', domain: 'Systems', submitted: 'Oct 16, 2026', pages: 14 },
  { id: 102, title: 'Gamified Quizzes and Retention in Online Courses', author: 'Rohit Malhotra', domain: 'Education', submitted: 'Oct 15, 2026', pages: 9 },
  { id: 103, title: 'A Survey of Bias Audits for Hiring Algorithms', author: 'Sneha Kulkarni', domain: 'AI', submitted: 'Oct 14, 2026', pages: 22 },
]

export const FAQ = [
  { q: 'Who can submit a research paper?', a: 'Accounts with the Author role. Choose "Publish research" when you sign up, or ask an admin to change your role.' },
  { q: 'How does peer review work?', a: 'Moderators review each submission. Only approved papers appear in the feed and in search results.' },
  { q: 'What file formats are accepted?', a: 'Papers must be PDF. Post images can be JPEG, PNG, GIF or WebP up to 5 MB.' },
  { q: 'How do I cite a paper?', a: 'Open Research papers and press Cite, or use Citation tools to build an APA or BibTeX citation by hand.' },
  { q: 'Who do I contact for help?', a: 'Email info@uptoskills.com or call +91 93197 72294.' },
]
