import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2rem",
        padding: 24,
      }}
    >
      <Component {...pageProps} />
    </main>
  );
}
