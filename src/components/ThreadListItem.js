import { Link } from "react-router-dom";
import { DeleteThread } from "./DeleteButtons";

export default function ThreadListItem({ thread }) {
  return (
    <div>
      <h3>
        <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
      </h3>
      <small>{new Date(thread.created_at).toUTCString()}</small>
      <p>{thread.content}</p>
      <DeleteThread threadId={thread.id} />
    </div>
  );
}
