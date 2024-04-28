import { NextUIProvider, Button } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <Button>Monitor</Button>
      </main>
    </NextUIProvider>
  );
}

export default App;
