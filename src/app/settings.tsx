import React from "react"
import { useState, useEffect } from 'react';
import "./settingsStyle.css"

const SettingsMenu = ({difficulty}:any) => (
    <html>
        <div className="settingsMenuBackground"/>
        <table className="settingsMenu">
            <tbody>
                <tr>
                <td className="settingsMenuBox">
                    <h3>Settings</h3>
                    <br/>
                    Settings will go here.
                    <br/>
                    Difficulty is {difficulty}. <br/>
                </td>
                </tr>
            </tbody>
        </table>
    </html>
)

export default function SettingsModule({isActive, difficulty}:any) {
    if(isActive) {
        return SettingsMenu({difficulty});
    } else {
        return (<></>);
    }
}