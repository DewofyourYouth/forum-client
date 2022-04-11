import { useStore } from "../../store";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const postNewThread = async (token, title, content) => {
  const call = await fetch("http://localhost:8000/threads/new-thread", {
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
  const { token } = useStore((state) => state);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  console.log(token);
  const submitNewThread = async (e) => {
    e.preventDefault();
    const myThreadPost = await postNewThread(token, title, content);
    const result = await myThreadPost.json();
    console.log(result);
  };
  if (!token)
    return (
      <div>
        Must be signed in to add a thread <Link to="/login">Login</Link>
      </div>
    );

  return (
    <div>
      <form>
        <h3>New Thread Form</h3>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="title">Title</label>
              </td>
              <td>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="content">Content</label>
              </td>
              <td>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="10"
                  cols="30"
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button onClick={(e) => submitNewThread(e)}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
