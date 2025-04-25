# AI-Interview-Mocker

AI-Interview-Mocker is a cutting-edge platform designed to help users prepare for job interviews by simulating real-life interview scenarios. Integrated with advanced AI, this platform provides a personalized and interactive mock interview experience. Whether you're a fresher or an experienced professional, AI-Interview-Mocker can assist in honing your interview skills and boosting your confidence.

---

## Key Features

### 1. Personalized Mock Interviews
Authenticated users can create customized interview sessions by specifying:
- Job position
- Relevant technical stack
- Experience level required for the role

This ensures the interview questions are tailored to the user’s specific needs.

### 2. Real-Time Interaction
- **Voice Assistance**: Get questions and feedback via voice prompts for a more engaging experience.
- **Webcam Integration**: Simulates an in-person interview environment by incorporating webcam usage.

### 3. Feedback and Ratings
- Instant feedback on your answers with detailed analysis.
- Ratings to help you understand your performance.
- Correct answers are provided to help you learn and improve.

### 4. Review Your Progress
- View a history of your previously taken interviews.
- Analyze your growth and identify areas for improvement.

### 5. User-Friendly Interface
- The platform’s intuitive design makes it easy for users of all experience levels to navigate and use effectively.

---

## Tech Stack

AI-Interview-Mocker is built using modern and robust technologies:

### **Frontend**
- React.js
- Next.js

### **Backend**
- Next.js (API Routes)
- Gemini AI (AI-driven functionalities)

### **Authentication**
- Clerk (for secure and seamless user authentication)

### **Database**
- NeonDB (scalable and efficient database solution)
- Drizzle ORM (modern ORM for database management)

### **UI Components**
- Shadcn (for a clean and professional user interface)

---

## How to Run Locally

Follow these steps to set up the project and run it on your local machine:

### Prerequisites

Ensure the following are installed:
1. **Node.js**: Download from [Node.js Official Website](https://nodejs.org/).
2. **Package Manager**: npm (comes with Node.js) or yarn.
3. **NeonDB Account**: Set up your database and retrieve the connection string.
4. **Clerk Account**: Create an account and set up authentication.
5. **Environment Variables**: Gather API keys and configuration details for Gemini AI, Clerk, and NeonDB.

### Steps

#### 1. Clone the Repository
   ```bash
   git clone https://github.com/Sadaf2005/AI-Interview-Mocker.git
   cd AI-Interview-Mocker
   ```

#### 2. Install Dependencies
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

#### 3. Configure Environment Variables
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
   CLERK_API_KEY=your-clerk-api-key
   NEONDB_URL=your-neondb-url
   GEMINI_AI_API_KEY=your-gemini-ai-api-key
   ```

#### 4. Start the Development Server
   Run the following command to start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

#### 5. Access the Application
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Contribution Guidelines

We welcome contributions to make AI-Interview-Mocker even better! Follow these steps to contribute:

1. **Fork the Repository**: Click the "Fork" button on GitHub.
2. **Clone Your Fork**: Clone the repository to your local machine.
   ```bash
   git clone https://github.com/Sadaf2005/AI-Interview-Mocker.git
   ```
3. **Create a New Branch**: Work on a new feature or bug fix.
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Commit Your Changes**: Make and commit your changes.
   ```bash
   git add .
   git commit -m "Add a brief description of your changes"
   ```
5. **Push to Your Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Submit a Pull Request**: Open a pull request on GitHub and describe your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgments

Special thanks to the following technologies and services for making this project possible:

- **Gemini AI**: For advanced AI-driven interview functionalities.
- **Clerk**: For seamless user authentication.
- **NeonDB**: For reliable and scalable database solutions.
- **Drizzle ORM**: For simplifying database interactions.
- **Shadcn**: For the clean and user-friendly UI components.

---

Feel free to reach out if you have any questions, suggestions, or feedback!

