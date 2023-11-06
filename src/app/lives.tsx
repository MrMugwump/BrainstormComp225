import React from "react"
import { useState, useEffect } from 'react';

export default function LivesDisplay({setLivesRemaining, livesRemaining}:any) {
    return (
        <p className = "LivesDisplay" id = "LivesDisplay">
            Number of lives remaining: {livesRemaining}
        </p>
    )
}