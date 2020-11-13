import React from 'react'
import "./style.css"

export default function WindowNav() {
    return (
        <div>
            <div class="columns">
              <div class="column" id="journalBtn">
                <h2>Journal</h2>
              </div>
              <div class="column" id="photoBtn">
                <h2>Photos</h2>
              </div>
            </div>
        </div>
    )
}
