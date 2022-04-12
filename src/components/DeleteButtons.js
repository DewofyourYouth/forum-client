import { useStore } from "../store";

const deleteThreadHTTP = async (threadId, token) => {
  const call = await fetch(
    `http://localhost:8000/threads/delete-thread/${threadId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token.token}`,
      },
      method: "DELETE",
    }
  );
  if (call.status === 200) {
    alert("Successfully deleted!");
    return true;
  } else if (call.status === 403) alert("You may not delete this thread");
  else alert("We were unable to delete that thread at the present moment");
  return false;
};
// const deleteComment = async (threadId, token) => {};

export const DeleteThread = ({ threadId }) => {
  const { token, threads, setThreadsStore } = useStore((state) => state);
  const dt = async () => {
    const response = await deleteThreadHTTP(threadId, token);
    if (response) {
      const newThreads = threads.filter((thread) => thread.id !== threadId);
      setThreadsStore(newThreads);
    }
  };
  return <button onClick={dt}>Delete Thread.</button>;
};
