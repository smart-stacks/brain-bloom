
# BrainBloom App

A modern web application built with React, TypeScript, and Vite.

## Project Structure

```
brainbloom/
├── public/           # Static assets
│   ├── src/
│   │   ├── assets/      # Project-specific assets (images, fonts, etc.)
│   │   ├── components/  # React components
│   │   ├── types/       # TypeScript type definitions
│   │   ├── utils/       # Utility functions
│   │   └── ...
│   ├── .env.example     # Example environment variables
│   ├── package.json     # Project dependencies
│   └── ...
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd brainbloom
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your actual configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=false
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
VITE_SOCKET_URL=ws://localhost:3000
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Socket.IO Client
- React Map GL
- Date-fns

## Development

This project uses:
- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast development and building

## License

[Your License Here] 

# brain-bloom

