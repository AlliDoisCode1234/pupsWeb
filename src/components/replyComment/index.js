import React from "react";

export default function replyComment({ username, replyCaption }) {
  return (
    <div className="replyComment">
      <p>
        <span style={{ fontWeight: "500", marginRight: "4px" }}>
          {username}
        </span>
        {replyCaption}
      </p>
    </div>
  );
}
