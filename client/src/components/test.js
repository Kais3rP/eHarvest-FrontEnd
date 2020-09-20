import React, { useState } from 'react';

let defaultProps = {
    options: {
      name: 'half-grad',
      numOfStars: 5,
      starsWidth: 30,
      color: "green",
      bgColor: "white",
      borderColor: "green",
      scoreColor: "inherit"
    },
    handleScore: (score) => { console.log(score) }
  }
  
  
  
  export default function StarRating({ options, handleScore }) {
    const [currentStar, setCurrentStar] = useState(-1);
    const [currentScore, setCurrentScore] = useState(0);
  
    let arrOfStars = [];
    let name = options.name;
    let numOfStars = options.numOfStars;
    let starsWidth = options.starsWidth;
    let color = options.color;
    let bgColor = options.bgColor;
    let borderColor = options.borderColor;
    let scoreColor = options.scoreColor;
    for (let i = 0; i < numOfStars; i++)
      arrOfStars.push(i);
  
  
      const handleMouseMove = (ev) => {

        if (
          ev.pageX <
          ev.currentTarget.getBoundingClientRect().x +
          ev.currentTarget.getBoundingClientRect().width / 2
        ){
            
          ev.currentTarget.style.fill = `url(#${name})`;
        }
        else 
        if (
          ev.pageX >=
          ev.currentTarget.getBoundingClientRect().x +
          ev.currentTarget.getBoundingClientRect().width / 2
        ) ev.currentTarget.style.fill = color;
    
        setCurrentStar(ev.currentTarget.dataset.current)
      }
  
    const handleMouseOut = (ev) => {
      setCurrentStar(-1);
    }
  
    const handleClick = (ev) => {
      if (
        ev.pageX <
        ev.currentTarget.getBoundingClientRect().x +
        ev.currentTarget.getBoundingClientRect().width / 2
      ) {
        setCurrentScore(parseInt(ev.currentTarget.dataset.current) + 0.5);
        handleScore(parseInt(ev.currentTarget.dataset.current) + 0.5);
      }
      else {
        setCurrentScore(parseInt(ev.currentTarget.dataset.current) + 1);
        handleScore(parseInt(ev.currentTarget.dataset.current) + 1);
      }
    }
  
    return (
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0" width={0} height={0}>
      <defs>
       <linearGradient id={name} x1="0" x2="100%" y1="0" y2="0">
            <stop offset="50%" stop-color={color}/>
            <stop offset="50%" stop-color={bgColor}/>
        </linearGradient>
        </defs>
        </svg>
        {arrOfStars.map((x, i) => {
          
          if (i <= currentStar)
            return <SVGStar identifier={i} color={color} bgColor={bgColor} borderColor={borderColor} starsWidth={starsWidth} handleMouseMove={handleMouseMove} handleMouseOut={handleMouseOut} handleClick={handleClick} />
          if (i > currentStar)
            return <SVGStar identifier={i} color={bgColor} bgColor={bgColor} borderColor={borderColor} starsWidth={starsWidth} handleMouseMove={handleMouseMove} handleMouseOut={handleMouseOut} handleClick={handleClick} />
        })}
        
        <div style={{ 'font-family': 'Arial', 'font-size': '15px', 'color': scoreColor }}>Rating: {currentScore}</div>
     </div>
      )
  }
  
  
  StarRating.defaultProps = defaultProps;
  
  function SVGStar ({ color, bgColor, borderColor, starsWidth,handleMouseMove, handleMouseOut, handleClick, identifier}){
      return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" width={starsWidth} style={{'fill':color, 'stroke':borderColor, 'stroke-width':20, 'cursor': 'pointer'}}
       onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} onClick={handleClick} data-current={identifier}>
     
      <polygon points="141.5 23.47 170.5 109.47 260.5 109.47 188.5 163.47 214.5 249.47 141.5 198.47 68.5 249.47 94.5 163.47 22.5 109.47 112.5 109.47 141.5 23.47" />
    </svg>
      
      )
      
    }