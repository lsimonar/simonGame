import React, { forwardRef } from "react";
import "./GameButtons.scss"

const GameButtons = forwardRef(({color, btnStyle, onClick}, ref) => (
        <button color={color} className={`game-button ${btnStyle}`} onClick={onClick} ref={ref}/>
    )
)

export default GameButtons;