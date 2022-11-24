import React, { useState, useRef, useEffect } from "react";
import GameButtons from "../GameButtons/GameButtons";
import "./SimonGame.scss"

const colors = ["green", "red", "yellow", "blue"];

function SimonGame() {

    const [gameSequence, setGameSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [playingIndex, setPlayingIndex] = useState(0);

    const greenRef = useRef(null);
    const redRef = useRef(null);
    const yellowRef = useRef(null);
    const blueRef = useRef(null);

    const addNewColor = () => {
        const color = colors[Math.floor(Math.random()*4)];
        const newSequence = [...gameSequence, color];
        setGameSequence(newSequence);
    }

    const handleNextLevel = () => {
        if (!playing) {
            setPlaying(true);
            addNewColor();
        }
    }

    const resetGame = () => {
        setGameSequence([]);
        setPlaying(false);
        setPlayingIndex(0);
    }

    const handleColorClick = (e) => {
        if(playing) {
            e.target.classList.add("btn-click");
            setTimeout(() => {
                e.target.classList.remove("btn-click");
            
                const clickColor = e.target.getAttribute("color");

                if (gameSequence[playingIndex] === clickColor) {
                    if(playingIndex === gameSequence.length -1) {
                        setTimeout(() => {
                            setPlayingIndex(0);
                            addNewColor();
                        }, 250)
                    } else {
                        setPlayingIndex(playingIndex + 1)
                    }
                } else {
                    resetGame();
                }
            }, 250);
        }
    }

    useEffect(() => {
        if(gameSequence.length > 0){
            const showSequence = (index = 0) => {
                let ref = null;

                if(gameSequence[index] === "green") ref = greenRef;
                if(gameSequence[index] === "red") ref = redRef;
                if(gameSequence[index] === "yellow") ref = yellowRef;
                if(gameSequence[index] === "blue") ref = blueRef;

                setTimeout(() => {
                    ref.current.classList.add("btn-hightlight")
                    setTimeout(() => {
                        ref.current.classList.remove("btn-hightlight");
                        if (index < gameSequence.length - 1) {
                            showSequence(index + 1);
                        }
                    }, 250);
                }, 250);
            }
        
            showSequence();
        }
    }, [gameSequence])

    return (
        <div className="main-ctn">
            <div className="buttons-ctn">
                <div>
                    <GameButtons color="green" btnStyle="green-button" ref={greenRef} onClick={handleColorClick}/>
                    <GameButtons color="red" btnStyle="red-button" ref={redRef} onClick={handleColorClick}/>
                </div>
                <div>
                    <GameButtons color="yellow" btnStyle="yellow-button" ref={yellowRef} onClick={handleColorClick}/>
                    <GameButtons color="blue" btnStyle="blue-button" ref={blueRef} onClick={handleColorClick}/>
                </div>
                <button className="play-btn" onClick={handleNextLevel}>
                    {gameSequence.length === 0? "PLAY" : gameSequence.length}
                </button>
            </div>
        </div>
    )
}

export default SimonGame;