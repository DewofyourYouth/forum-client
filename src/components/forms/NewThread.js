import { useStore } from "../../store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getThreads } from "../../App";

const postNewThread = async (token, title, content) => {
  return await fetch("http://localhost:8000/threads/new-thread", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${token.token}`,
    },
    method: "POST",
    body: JSON.stringify({ title, content }),
  });
};

export default function NewThread() {
  const { token, setThreadsStore } = useStore((state) => state);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const submitNewThread = async () => {
    const post = await postNewThread(token, title, content);
    if (post.status === 200) {
      const newThreads = await getThreads();
      setThreadsStore(newThreads);
      setTitle("");
      setContent("");
    }
  };
  if (!token)
    return (
      <div>
        Must be signed in to add a thread <Link to="/login">Login</Link>
      </div>
    );

  return (
    <div>
      <h3>New Thread Form</h3>

      <input
        id="title"
        value={title}
        placeholder={"Title Here."}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br />
      <textarea
        id="content"
        placeholder="Type the body here."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        cols="30"
      />
      <br />
      <button onClick={submitNewThread}>Submit</button>
    </div>
  );
}
