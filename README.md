# React + Vite

## Local app setup

1. Set `MONGO_URI` and a strong `JWT_SECRET` in `backend/.env`.
2. Start the API from `backend` with `npm install` (first time only), then `npm start`. It listens on port `5000` by default.
3. Start the website from the project root with `npm run dev`. The development server proxies `/api` requests to `http://localhost:5000`.
4. Register an account through the website. Public registration always creates a student account. To grant admin access, promote the intended account directly in the configured MongoDB database:

   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

   Sign in again after changing the role so the new admin role is included in the session token.

Admins can create classes in **Admin → Classes** and view each class's enrollment count and roster there. Students can join available classes from their dashboard; registrations and class enrollments are saved in MongoDB.

## Vercel deployment

The Vercel deployment serves the API from the same website domain at `/api`. In the Vercel project's **Settings → Environment Variables**, set `MONGO_URI` to the MongoDB connection string and `JWT_SECRET` to a long, random secret. Add both to the Production environment, then redeploy. These values belong only in Vercel's server-side environment settings (never in a `VITE_` variable). A healthy deployment can be checked by opening `https://your-site.vercel.app/api/auth/me`; it should return an authorization response, not the website HTML.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
