import { Routing } from "./Router/Routing";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Routing />
    </ThemeProvider>
  );
};

export default App;
