# [QuizPlatform](https://quizplatformz.netlify.app/)

QuizPlatform is an interactive web application built with Next.js that allows users to participate in quizzes, evaluate results, and explore learning in a dynamic way.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ankitrpathak/QuizPlatform.git
   cd QuizPlatform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 📝 Design Decisions & Next.js Features

### 1. **Static Site Generation (SSG)**
   - Used `getStaticProps` and `getStaticPaths` to pre-render quiz pages for performance and SEO.
   - Example: The quiz list and individual quiz detail pages are statically generated at build time.

### 2. **Server-Side Rendering (SSR)**
   - Employed `getServerSideProps` for user-specific data, such as personalized dashboard and result pages.
   - This ensures that private, user-specific information is always up to date and secure.

### 3. **API Routes**
   - Implemented RESTful endpoints in `/pages/api/` for quiz CRUD operations and results submission.
   - APIs are used by the frontend for dynamic data interaction without exposing sensitive logic.

### 4. **next/image**
   - Leveraged the `next/image` component to optimize and serve quiz images efficiently.
   - This enhances performance through automatic resizing, lazy loading, and responsive images out-of-the-box.

---

## ⚙️ Implementation Challenges & Solutions

- **Data Fetching Complexity:**  
  Balancing SSG and SSR for different pages required careful planning. Resolved by categorizing pages based on data sensitivity and update frequency.

- **State Management:**  
  Managed quiz and user state using React Context and hooks, ensuring a seamless user experience across dynamic and static content.

- **API Integration:**  
  Ensured secure and efficient communication between frontend and backend using Next.js API routes, with robust error handling.

- **Image Optimization:**  
  Faced issues with external images. Overcame by configuring `next.config.js` to allowlist trusted image domains.

---

## 🤖 Use of AI Coding Tools

During development, AI-assisted tools like **GitHub Copilot** and **Cursor.ai** were used for:

- Accelerating boilerplate code generation.
- Autocompleting repetitive logic in API routes and page components.
- Providing code suggestions for edge cases and complex logic.
- Speeding up documentation drafting and code comments.

AI tools helped maintain productivity, reduce bugs, and improve code readability.

---

## 📄 License

This project is licensed under the MIT License.

---

Feel free to open issues or submit pull requests for improvements!
