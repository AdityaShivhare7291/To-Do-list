import React from "react"
import SearchBar from "../components/searchbar";
import Slider from "../components/slider";
import Progress from "../components/boxes";
import WorkProgress from '../components/progress'

function DashBoard() {
    return <div style={{ padding: "10px" }}>
        <SearchBar />
        <Slider />
        <br />
        <Progress />
        <br />
        <WorkProgress />
    </div>
}

export default DashBoard;