// src/app/layout.tsx
import './globals.css'; // if you want global styles

export const metadata = {
  title: 'Moovie Web',
  description: 'Simple movie web app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          {/* You can add a nav bar or logo here */}
          <h1>Moovie Web</h1>
        </header>
        <main>{children}</main>
        <footer>
          {/* Optional footer */}
          <p>© 2025 Moovie Web</p>
        </footer>
      </body>
    </html>
  );
}
