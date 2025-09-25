# VibeChat: Real-time Mood-driven Chat Room

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/TheekshanaCN/Vibe-Chat)

VibeChat is an anonymous, real-time chat application with a unique 'Retro' aesthetic, evoking 90s internet culture. Users join a chat room by simply choosing a nickname. The core feature is the ability to tag every message with a 'mood' emoji (e.g., 😎, 🔥, 😂). This mood dictates the visual style of the chat bubble, applying specific colors and neon glow effects. The collective mood of the room is visualized in real-time through a 'Vibe Meter'—a component resembling a retro audio equalizer—which dynamically displays the current distribution of moods. The entire UI is designed to be immersive, with pixelated fonts, grainy textures, CRT scanline overlays, and glitchy animations, creating a nostalgic and visually engaging social experience.

## ✨ Key Features

-   **Anonymous Chat**: Join the conversation instantly by just picking a nickname. No login required.
-   **Mood Selector**: Tag every message with a mood emoji (e.g., 😎, 🔥, 😂, 🤯, 😢) to express yourself.
-   **Live Vibe Meter**: A retro audio equalizer-style chart that visualizes the current distribution of moods in the room, updating in real-time.
-   **Dynamic Message Bubbles**: Chat bubbles change their color and neon glow based on the selected mood.
-   **Retro UI/UX**: A nostalgic 90s-inspired interface with pixelated fonts, CRT scanlines, and glitch effects.
-   **Real-time Experience**: Uses a polling mechanism to fetch new messages and vibe updates, creating a near real-time chat environment.

## 🛠️ Technology Stack

-   **Frontend**:
    -   [React](https://reactjs.org/)
    -   [Vite](https://vitejs.dev/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Zustand](https://zustand-demo.pmnd.rs/) for state management
    -   [Tailwind CSS](https://tailwindcss.com/) for styling
    -   [shadcn/ui](https://ui.shadcn.com/) for UI components
    -   [Framer Motion](https://www.framer.com/motion/) for animations
    -   [Recharts](https://recharts.org/) for the Vibe Meter chart
-   **Backend**:
    -   [Cloudflare Workers](https://workers.cloudflare.com/)
    -   [Hono](https://hono.dev/) web framework
    -   [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/) for state persistence
-   **Tooling**:
    -   [Bun](https://bun.sh/) as the runtime and package manager
    -   [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for Cloudflare development and deployment

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/docs/installation) installed on your machine.
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated: `bunx wrangler login`.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/vibechat.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd vibechat
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

### Running Locally

To start the development server for both the frontend and the local Worker, run:

```sh
bun dev
```

This will start the Vite development server for the React app and a local `workerd` instance for the backend. The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

The project is organized into three main directories:

-   `src/`: Contains the frontend React application, including pages, components, state management (Zustand), and styles.
-   `worker/`: Contains the backend Cloudflare Worker code, including the Hono API routes (`userRoutes.ts`) and the Durable Object implementation (`durableObject.ts`).
-   `shared/`: Contains TypeScript types and interfaces that are shared between the frontend and backend to ensure type safety.

## 🚀 Deployment

This project is designed to be deployed to Cloudflare's global network.

1.  **Build the project:**
    Before deploying, ensure you build the frontend assets. The deployment script handles this automatically.

2.  **Deploy to Cloudflare:**
    Run the following command to deploy your application using Wrangler:
    ```sh
    bun deploy
    ```
    This command will build the Vite application and deploy the `worker` to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/TheekshanaCN/Vibe-Chat)

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving VibeChat, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.