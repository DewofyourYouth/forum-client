import "./App.css";
import { useEffect } from "react";
import { useStore } from "./store";
import ThreadListItem from "./components/ThreadListItem";
import NewThread from "./components/forms/NewThread";

export const getThreads = async () => {
  const call = await fetch("http://localhost:8000/threads/threads/");
  return await call.json();
};

function App() {
  const { threads, setThreadsStore } = useStore((state) => state);
  useEffect(() => {
    getThreads().then((res) => {
      if (res === threads) return;
      setThreadsStore(res);
    });
  }, []);

  return (
    <div className="main-container">
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
      <hr />
      <NewThread />
    </div>
  );
}

export default App;
