import { useRoutes } from "react-router-dom";
import "./App.css";
import router from "./features/core/presentation/router";

function App() {
  const content = useRoutes(router);

  return <div>{content}</div>;
}

export default App;
