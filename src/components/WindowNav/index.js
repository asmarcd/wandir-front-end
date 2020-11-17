import React from 'react'
import { Link } from "react-router-dom"
import "./style.css"

export default function WindowNav(props) {
    return (
        <div>
            <div class="columns is-mobile" id="windowNav">
                <a class="column nav-link" id="journalBtn" onClick={e=>props.handleViewSwitch(e)}>Journal</a>
                <a class="column nav-link" id="photoBtn" onClick={e=>props.handleViewSwitch(e)}>Photos</a>
            </div>
        </div>
    )
}


