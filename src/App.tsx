import { useRoutes } from "react-router-dom";
import router from "./features/core/presentation/router";
import "./App.css";

function App() {
  const content = useRoutes(router);

  return <div>{content}</div>;
}

export default App;
