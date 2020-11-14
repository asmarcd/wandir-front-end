import React from "react";

export default function JournalComponent({ id, title, date, body, ...rest }) {
  return (
      <article className="media" {...rest}>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{title}</strong>
              <br />
              <small>{date}</small>
              <br />
              {body}
            </p>
          </div>
        </div>
      </article>
  );
}
