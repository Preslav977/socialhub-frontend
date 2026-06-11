# socialhub-frontend

> React SPA for a full-stack social media platform — posts, real-time messaging, and social graph built with React, React Router, and Socket.io.

[![GitHub stars](https://img.shields.io/github/stars/Preslav977/socialhub-frontend?style=social)](https://github.com/Preslav977/socialhub-frontend)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

[![Star History Chart](https://api.star-history.com/svg?repos=Preslav977/socialhub-frontend&type=Date)](https://star-history.com/#Preslav977/socialhub-frontend&Date)

[Live Site](https://socialhub-frontend-seven.vercel.app/) · [Backend Repo](https://github.com/Preslav977/social-backend)

---

## ✨ Features

| Feature              | Description                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| ✅ Live Validation   | Per-field form validation with React Hook Form — errors show and clear on input        |
| 📝 Posts             | Create posts with text and/or image, like/dislike, comment, reply, and like comments   |
| 💬 Messaging         | Create conversations and send text/image messages with real-time updates via Socket.io |
| 👥 Social Graph      | Follow/unfollow users, read following feed, latest users, and most followed users      |
| 🔍 Search            | Search for users by username                                                           |
| 💀 Loading Skeletons | Skeleton UI matched dynamically to post shape while content loads                      |
| 🔐 Auth              | GitHub OAuth + guest login                                                             |
| 🧪 Tests             | Component tests with React Testing Library and MSW for server mocking                  |

---

## 🚀 Quick Start

### Install

```bash
git clone https://github.com/Preslav977/socialhub-frontend.git
cd socialhub-frontend
npm install
```

### Configure

Create a `.env` file in the root:

```env
VITE_API_URL=
VITE_SOCKET_URL=
```

### Run

```bash
npm run dev
```

> App runs on [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Architecture

```
src/
  components/     # Reusable UI components (Post, Comment, Skeleton, Modal)
  pages/          # Route-level components (Feed, Profile, Messages, ErrorPage)
  hooks/          # Shared hooks (form handling, data fetching by URL param)
  context/        # Auth state
  router/         # React Router route definitions including ErrorPage fallback
```

React Router handles all navigation and renders an `ErrorPage` when no route matches, keeping the app a true SPA. Forms are managed with React Hook Form. Data fetching hooks accept a URL parameter to avoid duplicating `useEffect` logic per resource. MSW intercepts requests during tests so no real API calls are made.

---

## 🤝 Contributing

1. Reach out to me first
2. Fork → Branch → PR
3. Run `npm test` before submitting

---

## 📄 License

MIT © [Preslav977](https://github.com/Preslav977)
