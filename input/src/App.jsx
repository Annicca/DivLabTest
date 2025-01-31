import "./App.css";
import { CostInput } from "@/shared/ui";

function App() {
  return <CostInput placeholder={"Плейсхолдер"} min={-10} max={100000000} />;
}

export default App;
