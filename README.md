# CineVault

CineVault is a React and TypeScript movie discovery application powered by the TMDB API. It provides a cinematic home page, movie browsing, TV show browsing, search, movie details, reusable media cards, and infinite scrolling for paginated catalogues.

## Features

- Featured movie hero carousel with autoplay and manual slide controls.
- Movie browsing by Popular, Top Rated, and Upcoming categories.
- TV browsing by Popular and Top Rated categories.
- Infinite scrolling backed by TMDB pagination.
- Search for movies by title.
- Movie detail pages with related TMDB information.
- Shared movie and TV show cards, grids, loading skeletons, and feedback panels.
- Responsive layout with Tailwind CSS and a shared theme palette.
- Client-side routing with React Router.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Axios
- Lucide React
- TMDB API

## Getting Started

### Prerequisites

Install the following before starting:

- Node.js 20 or newer
- npm
- A TMDB account and API Read Access Token

### Clone and install

```bash
git clone <repository-url>
cd cinevault
npm install
```

### Configure TMDB

Create a local `.env` file in the project root. Do not commit this file or expose the token in documentation.

```env
TMDB_ACCESS_TOKEN=your_tmdb_api_read_access_token
```

The application sends this value as a Bearer token from `src/services/tmdb/client.ts`. You can create an API Read Access Token from the API section of your TMDB account settings.

### Run locally

Start the development server:

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

## Available Scripts

| Command           | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the Vite development server with HMR.           |
| `npm run build`   | Type-check the project and create a production build. |
| `npm run lint`    | Run ESLint across the project.                        |
| `npm run preview` | Serve the production build locally.                   |

Before opening a pull request or pushing changes, run:

```bash
npm run lint
npm run build
```

## Architecture

CineVault follows a feature-oriented React structure with a small service layer:

```text
UI route
  -> page component
    -> reusable component
      -> TMDB service
        -> Axios client
          -> TMDB API
```

Pages own screen-level state such as the selected category, loading status, errors, and infinite scroll pagination. Reusable components focus on rendering and receive data through typed props. API calls are kept outside UI components in `src/services/tmdb`.

### Main patterns

- **Single responsibility:** pages coordinate data and user interaction; components render reusable UI; services communicate with TMDB.
- **Typed contracts:** TMDB responses and domain models live in `src/types/tmdb.ts`.
- **Reusable media model:** `MediaCard` and `MediaGrid` accept either `Movie` or `TVShow`.
- **Compatibility wrappers:** `MovieCard` and `MovieGrid` preserve movie-specific imports while delegating to shared media components.
- **Guarded infinite scroll:** pages use `IntersectionObserver`, request refs, page limits, stale-request checks, and ID de-duplication before appending results.
- **Centralized feedback:** `FeedbackPanel` provides a consistent error and empty-state surface.
- **Theme source of truth:** values in `src/constants/theme.ts` are exposed as CSS variables by `src/main.tsx` and consumed by shared UI styles.

## Reusable UI Components

### `MediaCard`

Located at `src/components/media/MediaCard.tsx`.

Renders either a movie or TV show using the correct title, release/air date, poster, rating, and detail route. New catalogue features should use this component instead of creating separate movie and TV card markup.

### `MediaGrid`

Located at `src/components/media/MediaGrid.tsx`.

Renders a responsive poster grid for `Movie` and `TVShow` items. It also handles the initial loading skeleton state.

### `MovieCard` and `MovieGrid`

Located at `src/components/movie`.

These are movie-focused compatibility wrappers around the shared media components. They keep existing movie page APIs simple while avoiding duplicated rendering logic.

### `MediaRow`

Located at `src/components/media/MediaRow.tsx`.

Displays horizontal media collections on the home page with loading, error, empty, and overflow states.

### `LoadingSkeleton`

Located at `src/components/movie/LoadingSkeleton.tsx`.

Provides reusable grid and horizontal-row placeholders while API requests are pending.

### `FeedbackPanel`

Located at `src/components/common/FeedbackPanel.tsx`.

Provides a consistent surface for error and empty messages.

### `Hero`

Located at `src/components/common/Hero.tsx`.

Displays featured movies from the now-playing collection with backdrop imagery, metadata, a rating, and navigation to movie details.

## Directory Guide

```text
cinevault/
├── public/                 Static files served as-is by Vite.
├── src/
│   ├── assets/             Imported application assets.
│   ├── components/         Reusable UI grouped by responsibility.
│   │   ├── common/         Shared UI such as Hero and FeedbackPanel.
│   │   ├── layout/         App shell and shared layout components.
│   │   ├── media/          Movie/TV-agnostic cards, grids, and rows.
│   │   ├── movie/          Movie compatibility components and skeletons.
│   │   └── navigation/     Navbar and navigation controls.
│   ├── constants/          Shared configuration such as theme colors.
│   ├── hooks/              Reusable React hooks.
│   ├── pages/              Route-level screens.
│   │   ├── Home/           Featured content and media rows.
│   │   ├── MovieDetail/    Movie detail screen.
│   │   ├── Movies/         Movie catalogue and infinite scrolling.
│   │   ├── Search/         Movie search screen.
│   │   └── TV/             TV catalogue and infinite scrolling.
│   ├── services/           External data access.
│   │   └── tmdb/           Axios client and movie/TV API functions.
│   ├── types/              Shared TypeScript domain and UI types.
│   ├── utils/              Image and genre formatting helpers.
│   ├── App.tsx             Router and route declarations.
│   ├── index.css           Tailwind import and global styles.
│   └── main.tsx            Application bootstrap and runtime theme setup.
├── .env                    Local environment variables; keep private.
├── eslint.config.js        ESLint configuration.
├── index.html              Vite HTML entry point.
├── package.json            Dependencies and npm scripts.
├── package-lock.json       Locked dependency versions.
├── tsconfig.json           Shared TypeScript configuration.
├── tsconfig.app.json       Application TypeScript configuration.
├── tsconfig.node.json      Tooling TypeScript configuration.
├── vite.config.ts          Vite, React, and Tailwind configuration.
└── README.md               Project documentation.
```

`node_modules/` and `dist/` are generated directories. They are not source code and should not be committed.

## Routes

| Path            | Screen                                                        |
| --------------- | ------------------------------------------------------------- |
| `/`             | Home dashboard with hero and media rows.                      |
| `/movies`       | Movie catalogue with category filters and infinite scrolling. |
| `/movies/:id`   | Movie detail screen.                                          |
| `/search`       | Movie search screen.                                          |
| `/tv-shows`     | TV catalogue with category filters and infinite scrolling.    |
| `/tv-shows/:id` | TV show route.                                                |

## Adding a New Media Feature

1. Add or update the typed model in `src/types/tmdb.ts`.
2. Add the API request in `src/services/tmdb`.
3. Keep request and pagination state in the route-level page component.
4. Render catalogue items with `MediaGrid` and `MediaCard`.
5. Reuse `LoadingSkeleton` and `FeedbackPanel` for loading and failure states.
6. Add the route in `src/App.tsx`.
7. Run `npm run lint` and `npm run build`.

Avoid duplicating movie/TV poster markup or putting Axios calls directly inside reusable presentation components.

## Troubleshooting

### The page loads but shows no content

Check that `.env` contains a valid `VITE_TMDB_ACCESS_TOKEN`, then restart the Vite server. Vite reads environment variables when the server starts.

### API requests return unauthorized

Use the TMDB API Read Access Token, not the older v3 API key. Confirm that the token has no surrounding quotes or spaces.

### Port 5173 is already in use

Vite will usually choose another available port, or you can stop the process using the existing port before running `npm run dev` again.

### Build or lint fails after a change

Run the failing command directly and fix the first reported error:

```bash
npm run lint
npm run build
```

## License

No license has been declared for this project yet.
