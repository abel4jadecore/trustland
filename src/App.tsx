import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import router from "./features/core/presentation/router";
import "./App.css";
import "@/assets/css/tailwind.css";
import "@/assets/css/icons.css";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    document.documentElement.classList.add("light");
  }, []);

  const content = useRoutes(router);

  return <div>{content}</div>;
}

export default App;
