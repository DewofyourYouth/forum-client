import { Link } from "react-router-dom";

export default function ThreadListItem({ thread }) {
  return (
    <div>
      <h3>
        <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
      </h3>
      <small>{new Date(thread.created_at).toUTCString()}</small>
      <p>{thread.content}</p>
    </div>
  );
}
