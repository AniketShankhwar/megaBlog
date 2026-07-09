# 📝 MegaBlog

A full-featured blogging platform built with **React 19** and powered by **Appwrite** as the backend-as-a-service (BaaS). It supports user authentication, creating/editing/deleting posts, a rich-text editor, featured image uploads, and protected routes all wrapped in a clean Tailwind CSS UI.

---

## ✨ Features

- 🔐 **Authentication** : Email/password signup, login & logout powered by Appwrite Auth.
- 🛡️ **Protected Routes** : Route-level access control via a reusable `AuthLayout` guard.
- 📝 **Rich Text Editor** : Create posts with formatting using TinyMCE.
- 🖼️ **Featured Image Uploads** : Upload, preview, and manage post images via Appwrite Storage.
- 📚 **Post Management** : Create, read, update, and delete blog posts with draft (`active`/`inactive`) status support.
- ⚡ **State Management** : Redux Toolkit with async thunks for fetching posts (global + per-user).
- 🎨 **Responsive UI** : Styled with Tailwind CSS v4, fully responsive across devices.
- 🧭 **Client-side Routing** : React Router v7 with dynamic slug-based post pages.

---

## 🧱 Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Frontend         | React 19, Vite                              |
| Styling          | Tailwind CSS v4                             |
| State Management | Redux Toolkit, React-Redux                  |
| Backend / BaaS   | Appwrite (Auth, Databases, Storage)         |
| Routing          | React Router DOM v7                         |
| Forms            | React Hook Form                             |
| Editor           | @tinymce/tinymce-react                      |
| HTML parsing     | html-react-parser                           |
| Linting          | ESLint                                      |

---

## 📁 Project Structure

```
MegaBlogAppwrite/
├── public/
├── src/
│   ├── appwrite/           # Appwrite service classes (auth + database/storage)
│   │   ├── auth.js
│   │   └── configuration.js
│   ├── components/         # Reusable UI components
│   │   ├── Header/         # Header + LogoutBtn
│   │   ├── Footer/
│   │   ├── container/
│   │   ├── post-form/      # Shared create/edit post form
│   │   ├── AuthLayout.jsx  # Route guard for protected pages
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── RTE.jsx         # TinyMCE rich text editor
│   │   ├── PostCard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Logo.jsx
│   ├── pages/              # Route-level page components
│   │   ├── Home.jsx
│   │   ├── AllPosts.jsx
│   │   ├── AddPost.jsx
│   │   ├── EditPost.jsx
│   │   ├── Post.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── store/              # Redux Toolkit store + slices
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   └── postsSlice.js
│   ├── config/             # Env-based Appwrite configuration
│   │   └── config.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.sample
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An [Appwrite](https://appwrite.io/) project (self-hosted or Appwrite Cloud)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/MegaBlogAppwrite.git
cd MegaBlogAppwrite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root based on `.env.sample`:

```env
VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_TABLE_ID=""
VITE_APPWRITE_BUCKET_ID=""
```

> ⚠️ **Never commit your `.env` file.** It is already ignored by `.gitignore`.

### 4. Set up Appwrite backend

In your Appwrite project, create:

1. **A Database** — note its Database ID.
2. **A Collection (table)** for blog posts with the following attributes:

   | Attribute      | Type    | Notes                          |
   | -------------- | ------- | ------------------------------ |
   | `title`        | String  | Required                       |
   | `content`      | String  | Rich text (HTML)               |
   | `featuredImage`| String  | File ID from Storage           |
   | `status`       | String  | `active` or `inactive`         |
   | `userId`       | String  | ID of the author               |

   > Set appropriate read/write permissions so authenticated users can manage their posts.

3. **A Storage Bucket** — for storing featured images. Note its Bucket ID.

Fill in all the corresponding IDs in your `.env` file.

### 5. Run the development server

```bash
npm run dev
```

Open the URL shown in your terminal (default: `http://localhost:5173`).

---

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR       |
| `npm run build`   | Build the app for production             |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint over the codebase             |

---

## 🔑 Environment Variables

| Variable                    | Description                                  |
| --------------------------- | -------------------------------------------- |
| `VITE_APPWRITE_URL`         | Appwrite endpoint (e.g. `https://cloud.appwrite.io/v1`) |
| `VITE_APPWRITE_PROJECT_ID`  | Your Appwrite project ID                     |
| `VITE_APPWRITE_DATABASE_ID` | ID of the database holding blog posts        |
| `VITE_APPWRITE_TABLE_ID`    | ID of the posts collection/table             |
| `VITE_APPWRITE_BUCKET_ID`   | ID of the storage bucket for images          |

---

## 🗺️ Routes

| Path              | Page         | Protected |
| ----------------- | ------------ | --------- |
| `/`               | Home         | ❌         |
| `/login`          | Login        | ❌         |
| `/signup`         | Signup       | ❌         |
| `/all-posts`      | All Posts    | ✅         |
| `/add-post`       | Add Post     | ✅         |
| `/edit-post/:slug`| Edit Post    | ✅         |
| `/post/:slug`     | View Post    | ❌         |

---

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome. Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using React, Tailwind CSS, and Appwrite</p>
