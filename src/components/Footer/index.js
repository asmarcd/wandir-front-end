import React from "react";
import './style.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>WANDiR</strong> by{" "}
          <a href="https://github.com/clubkemp">Johnny Kemp</a>, <a href="https://github.com/hilaryvalenciawalsh">Hilary Valencia-Walsh</a>, <a href="https://github.com/asmarcd">Chris Asmar</a>, <a href="https://github.com/insideseanshead">Sean Morgan</a>
          . The source code is
          licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
         
          
        </p>
      </div>
    </footer>
  );
}
