# Live Lens 🎥

![Live Lens Logo](https://raw.githubusercontent.com/unhiredcoder/livelens/master/public/images/logo.png?token=GHSAT0AAAAAACVWKOE6YLD6XIRYKYIKLOQOZXGYJMQ)

**Live Lens** is a modern social media web application that allows users to post, like, comment, and share content in real-time. With user authentication, theme customization, and an engaging UI, it offers a seamless experience for users to interact with multimedia posts.

🔗 **Live Demo**: [Live Lens](https://livelens.onrender.com)

---

## 🚀 Features

- 📝 **Post Creation**: Users can create and share posts with text and media.
- 👍 **Like & Comment**: Engage with content by liking and commenting on posts.
- 🔄 **Share**: Easily share posts across the platform.
- 🔐 **User Authentication**: Secure login and signup system with hashed passwords.
- 🎨 **Theme Customization**: Users can switch between light and dark modes for a personalized experience.
- 💬 **Real-time Updates**: Posts, likes, and comments update dynamically without refreshing the page.
- 🔍 **Responsive Design**: Fully responsive, optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

Live Lens is built using modern technologies that ensure a smooth and efficient user experience.

| Technology      | Description                                     |
|-----------------|-------------------------------------------------|
| **React**       | Front-end framework for building user interfaces |
| **Next.js**     | React framework for server-side rendering (SSR)  |
| **Tailwind CSS**| Utility-first CSS framework for styling          |
| **Prisma**      | ORM for database interaction                    |
| **Shadcn UI**   | Pre-built component library for React            |
| **Axios**       | HTTP client for API requests                     |
| **BcryptJS**    | Password hashing for secure authentication       |
| **Moment.js**   | Date/time formatting library                    |
| **Zod**         | Validation library for type-safe schemas         |

---

## 📂 Project Structure

```
├── public
│   └── images
│       └── logo.png
├── src
│   ├── components
│   ├── pages
│   ├── styles
│   ├── utils
│   └── services
├── prisma
│   └── schema.prisma
└── README.md
```
## ⚙️ Installation and Setup

Follow these steps to get a local copy of Live Lens up and running.

1. **Clone the repository:**

    ```
    git clone https://github.com/unhiredcoder/livelens.git
    cd livelens
    ```

2. **Install dependencies:**

    ```
    npm install
    ```

3. **Set up the environment variables:**

    Create a `.env` file in the root directory and add the following

```
NEXT_PUBLIC_APP_URL=http://your-app-url
NEXTAUTH_URL=http://your-auth-url
NEXTAUTH_SECRET=YOUR_NEXTAUTH_SECRET
DATABASE_URL=postgresql://your-db-username:your-db-password@your-db-host:5432/your-db-name
EDGE_STORE_ACCESS_KEY=YOUR_EDGE_STORE_ACCESS_KEY
EDGE_STORE_SECRET_KEY=YOUR_EDGE_STORE_SECRET_KEY
NEXT_PUBLIC_EDGE_STORE_URL=http://your-edge-store-url
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

4. **Run the app locally:**

    ```
    npm run dev
    ```

 The app will be running on `http://localhost:3000`.
