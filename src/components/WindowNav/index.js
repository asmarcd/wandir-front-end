import React from 'react'
import { Link } from "react-router-dom"
import "./style.css"

export default function WindowNav() {
    return (
        <div>
            <div class="columns is-mobile" id="windowNav">
            <Link to="/" class="column nav-link" id="journalBtn">
                Journal
              </Link>
              <Link to="/photos" class="column nav-link" id="photoBtn">Photos</Link>
            </div>
        </div>
    )
}
