import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./global";
import { Router } from "./Router";
import { defaultTheme } from "./styles/default";
import { BrowserRouter } from "react-router-dom";
import { CycleContextProvider } from "./contexts/CyclesContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
