import { Activity } from "react";

import FloatingActionButton from "./component/FloatingActionButton";
import TaskPopup from "./component/TaskPopup";
import InboxPopup from "./component/InboxPopup";

import "./App.css";

import { useFabStore } from "./store/useFabStore";
function App() {
  const active = useFabStore((state) => state.active);

  return (
    <>
      <Activity mode={active == "task" ? "visible" : "hidden"}>
        <TaskPopup />
      </Activity>
      <Activity mode={active == "inbox" ? "visible" : "hidden"}>
        <InboxPopup />
      </Activity>
      <FloatingActionButton />
    </>
  );
}

export default App;
