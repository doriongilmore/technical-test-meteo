# Technical Test Meteo

A Node.js application for weather-related functionality. This application provides weather information through a REST API interface.

## Prerequisites

- Node.js 22.x (LTS)
- npm

## Installation

```bash
npm install
```

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and replace the placeholder values with your actual configuration:
- Replace `your_weather_api_key` with your actual Weather API key

## Available Scripts

- `npm run start`: Run the production build
- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build the TypeScript project
- `npm run test`: Run all tests
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report
- `npm run lint`: Check code style
- `npm run lint:fix`: Fix code style issues
- `npm run format`: Format code with Prettier
- `npm run type-check`: Verify TypeScript types

## Development

```bash
npm run dev
```

The development server will start with hot-reload enabled.

## Testing

The project uses Jest for unit testing and Supertest for API testing. Run tests with:

```bash
npm test
```

## Implementation Choices

### Architecture
- TypeScript-based Node.js application
- Express.js for RESTful API implementation
- separation of concerns with controllers, services, and types separation

### Dependencies
- `express`: Web framework for Node.js
- `dotenv`: Environment variables management
- `axios`: HTTP client for API requests

### Development Tools
- `nodemon`: Development server with hot-reload
- `typescript`: Static typing and better code quality
- `jest`: Unit testing framework
- `supertest`: HTTP testing library
- `eslint` & `prettier`: Code quality and formatting
- `husky` & `lint-staged`: Git hooks for code quality

## CI/CD

The project includes GitHub Actions workflows that run on push to main and pull requests:
- Code quality checks:
  - Linting
  - Type checking
- Running tests across multiple Node.js versions (18.x, 20.x, 22.x)
- Verifying build process

Make sure to set up the `WEATHER_API_KEY` secret in your GitHub repository settings for the test suite to run properly.

## Project Structure

```
src/
  ├── controllers/    # Request handlers
  ├── services/      # Business logic
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  └── index.ts       # Application entry point
```

### Possible Improvements

- Input Validation: We could add Zod or io-ts for runtime validation of the weather API responses and requests.
- Caching: We could add caching to avoid making repeated API calls for the same city/coordinates within a short time window. This would improve performance and reduce API usage.
- Rate Limiting: We could add rate limiting to protect the API from abuse.
- Better Error Handling: Currently, we're not handling all possible API error cases. We could add more specific error types and handling.
- Weather Units: We could make the units ("metric") configurable through the service config.
- Language: Similarly, we could make the language ("fr") configurable.
- Logging: We could add logging to track the usage of the API and help identify issues.

