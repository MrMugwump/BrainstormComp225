import React from "react"
import { useState, useEffect } from 'react';
import "./settingsStyle.css"

const SettingsMenu = ({isActive, difficulty, activeMessage}:any) => (
    <table className="settingsMenu">
        <tbody>
            <tr>
              <td className="settingsMenuBox">
                Difficulty is {difficulty}. <br/>
                Active is {activeMessage}
              </td>
            </tr>
        </tbody>
    </table>
)

export default function SettingsModule({isActive, difficulty}:any) {

    const [activeMessage, setActiveMessage] = useState("This is active!");

    useEffect(() => {
        if(isActive) {
            setActiveMessage("This is active!")
        } else {
            setActiveMessage("This is inactive :(");
        }
    },[isActive]);

    return (
        <>
            <SettingsMenu
                isActive = {isActive}
                difficulty = {difficulty}
                activeMessage = {activeMessage}
            />
        </>
    );
}