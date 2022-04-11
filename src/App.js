import "./App.css";
import { useState, useEffect } from "react";
import ThreadListItem from "./components/ThreadListItem";
import NewThread from "./components/forms/NewThread";

const getThreads = async () => {
  const call = await fetch("http://localhost:8000/threads/threads/");
  return await call.json();
};

function App() {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const threads = getThreads().then((res) => {
      setThreads(res);
    });
  }, []);

  if (threads.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
      <hr />
      <NewThread />
    </div>
  );
}

export default App;
