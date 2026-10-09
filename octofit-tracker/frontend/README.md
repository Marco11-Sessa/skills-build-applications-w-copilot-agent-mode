# OctoFit Tracker Frontend

The React presentation tier reads API configuration from Vite environment variables.

Define `VITE_CODESPACE_NAME` in `.env.local` when running in Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the API base URL is `https://$VITE_CODESPACE_NAME-8000.app.github.dev`.
When it is unset, the app safely falls back to `http://localhost:8000`.

The app requests these backend resources:

- `/api/activities/`
- `/api/leaderboard/`
- `/api/teams/`
- `/api/users/`
- `/api/workouts/`

Responses may be plain arrays or paginated objects with arrays under `results`, `items`, `docs`, `data`, or the resource key.
