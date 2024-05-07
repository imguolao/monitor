import { useEffect, useState } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeContext } from "@/contexts/theme";
import { type ThemeExcludeAuto, getTheme } from "@/utils/theme";
import Home from "@/views/Home";

function App() {
  const [theme, setTheme] = useState<ThemeExcludeAuto>(getTheme());

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: setTheme }}>
      <NextUIProvider className="h-full">
        <Home className={`text-foreground bg-background h-full`} />
      </NextUIProvider>
    </ThemeContext.Provider>
  );
}

export default App;
