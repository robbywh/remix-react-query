import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";
import {QueryClient, QueryClientProvider} from 'react-query';
import styles from "./tailwind.css";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="bg-gray-300">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
          <ReactQueryDevtools initialIsOpen={false} />
        </body>
      </html>
    </QueryClientProvider>
  );
}
