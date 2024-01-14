import { useRoutes } from "react-router-dom";
import "./App.css";
import router from "./features/core/presentation/router";
import "./../src/assets/css/tailwind.css";
import "./../src/assets/css/icons.css";

function App() {
  const content = useRoutes(router);

  return <div>{content}</div>;
}

export default App;
