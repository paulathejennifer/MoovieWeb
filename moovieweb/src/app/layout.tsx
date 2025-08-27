import './globals.css'; 

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
          <h1>Moovie Web</h1>
        </header>
        <main>{children}</main>
        <footer>

          <p>© 2025 Moovie Web</p>
        </footer>
      </body>
    </html>
  );
}
