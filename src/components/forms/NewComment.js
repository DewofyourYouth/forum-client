import { useStore } from "../../store";
import { useState } from "react";
import { Link } from "react-router-dom";

const postNewComment = async (token, thread_id, title, content) => {
  const call = await fetch(
    `http://localhost:8000/threads/new-comment/${thread_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token.token}`,
      },
      method: "POST",
      body: JSON.stringify({ title, content }),
    }
  );
};

export default function NewComment({ threadId }) {
  const { token } = useStore((state) => state);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const submitNewComment = async (e) => {
    e.preventDefault();
    return await postNewComment(token, threadId, title, content);
  };
  if (!token)
    return (
      <div>
        must be signed in to add a comment <Link to="/login">Login</Link>
      </div>
    );

  return (
    <div>
      <hr />
      <h4>New Comment</h4>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={(e) => submitNewComment(e)}>Submit</button>
    </div>
  );
}
