import { useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeContext } from "@/contexts/theme";
import { type ThemeExcludeAuto, getTheme } from "@/utils/theme";
import Home from "@/views/Home";

function App() {
  const [theme, setTheme] = useState<ThemeExcludeAuto>(getTheme());
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: setTheme }}>
      <NextUIProvider className="h-full">
        <main className={`${theme} text-foreground bg-background h-full`}>
          <Home />
        </main>
      </NextUIProvider>
    </ThemeContext.Provider>
  );
}

export default App;
