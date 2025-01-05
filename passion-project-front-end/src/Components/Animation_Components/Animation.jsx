import Lottie from 'lottie-react'
import animationData from '../../assets/booksanimated.json'
import ai from '../../assets/ai.json'
import React from 'react'

function Animation() {
  return (
    <div>Animation 

        <div style={{"width": "40%", height: "40%"}}>
            <Lottie animationData={animationData}/>
            <Lottie animationData={ai} /> 
        </div>
    </div>
  )
}

export default Animation