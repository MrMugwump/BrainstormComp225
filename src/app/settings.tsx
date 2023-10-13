import React from "react"
import { useState, useEffect } from 'react';
import "./settingsStyle.css"

const SettingsMenu = ({difficulty}:any) => (
    <table className="settingsMenu">
        <tbody>
            <tr>
              <td className="settingsMenuBox">
                Difficulty is {difficulty}. <br/>
              </td>
            </tr>
        </tbody>
    </table>
)

export default function SettingsModule({isActive, difficulty}:any) {
    if(isActive) {
        return SettingsMenu({difficulty});
    } else {
        return (<></>);
    }
}