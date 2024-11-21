import "./globals.css";

export const metadata = {
  title: "Altimetrik Career Path",
  description: "AI-Driven Career Path Navigator for Software Engineers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}