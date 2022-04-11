import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NewComment from "./forms/NewComment";

const fetchFullThread = async (threadId) => {
  const call = await fetch(
    `http://localhost:8000/threads/full-thread/${threadId}`
  );
  return await call.json();
};

export default function FullThread() {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  useEffect(() => {
    fetchFullThread(threadId).then((res) => {
      setThread(res);
    });
  }, [threadId]);
  if (!thread) return <div>Loading...</div>;
  return (
    <div className="main-container full-thread">
      <h2>{thread.title}</h2>
      <small>Authored by: {thread.author}</small>
      <p>{thread.content}</p>
      {thread.comments.map((comment) => (
        <div className="comment" key={comment?.id}>
          <h4>{comment?.title}</h4>
          <p>{comment?.content}</p>
          <small>{comment.user__username}</small>
        </div>
      ))}
      <NewComment threadId={thread.id} />
    </div>
  );
}
