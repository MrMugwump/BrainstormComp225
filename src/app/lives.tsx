import React from "react"
import { useState, useEffect } from 'react';

/**
 * Graphical display of the user's lives number.
 */
export default function LivesDisplay({setLivesRemaining, livesRemaining}:any) {
    return (
        <p className = "LivesDisplay" id = "LivesDisplay">
            Number of lives remaining: {livesRemaining}
        </p>
    )
}