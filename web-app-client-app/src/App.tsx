import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App({ children }: { children?: React.ReactNode }) {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-background-muted text-foreground font-ibm flex flex-col">
      <Navbar search={search} setSearch={setSearch} />
      <div className="flex flex-col flex-1">
        {children}
        <Outlet context={{search}}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;