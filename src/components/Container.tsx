import Head from "next/head";

interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>cat-todo</title>
        <meta
          name="description"
          content="everyone makes a todolist these days"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-white p-4 text-black">
        {children}
      </main>
    </>
  );
};

export default Container;
