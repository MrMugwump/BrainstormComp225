import React from "react"
import { useState, useEffect } from 'react';
import "./settingsStyle.css"

const SettingsMenu = ({difficultySetting}:any) => (
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
                    Difficulty is {difficultySetting}. <br/>
                </td>
                </tr>
            </tbody>
        </table>
    </html>
)

export default function SettingsModule({isActive, difficultySetting}:any) {
    if(isActive) {
        return SettingsMenu({difficultySetting});
    } else {
        return (<></>);
    }
}