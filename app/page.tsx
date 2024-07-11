import Header from "./Components/header";
import Main from "./Components/main";
export default function Home() {
  return (
    <main className="relative">
      <div className="container mx-auto min-h-screen">
        <Header />
        <Main />
      </div>
    </main>
  );
}
