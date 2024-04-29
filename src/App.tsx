import { NextUIProvider } from "@nextui-org/react";
import Home from "@/views/Home";

function App() {
  return (
    <NextUIProvider className="h-full">
      <main className="dark text-foreground bg-background h-full">
        <Home />
      </main>
    </NextUIProvider>
  );
}

export default App;
