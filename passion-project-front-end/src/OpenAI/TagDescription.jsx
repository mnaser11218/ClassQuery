import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

 const Button = styled.button`
color: #F8F7E5;
background-color: transparent;
border: solid 1px #F8F7E5;
border-radius: 5px;
margin: 20px;
padding: 7px 20px 10px 20px;
 cursor: pointer;
    font-size: 0.9rem;
    &:hover{
    color: #FF9900;
    //color: #748D92;
    border: none;
    }

 `

const TagDescription = ({ apiKey, onUpdateInputValue, tagName }) => {

  const pencilIcon = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="15" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16" >
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>

  const generateText = () => {
    // const mainInputElement = document.getElementById('main-input-element');
    // const inputText = mainInputElement ? mainInputElement.value : '';
  

    axios.post('https://api.openai.com/v1/chat/completions',
        {
            "model": "gpt-3.5-turbo",
           
           "messages": [
              {
                "role": "user",
                
                "content": `Give me a description for this tag. Keep it concise and short: ${tagName}`
              }
            ],
              "max_tokens": 1000
          }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        console.log(response.data.choices[0].message.content)
      const gptResponse = response.data.choices[0].message.content
    //   .replaceAll("\"", "").trim();
    //   console.log("gpt response: " + gptResponse); //this logs it to console completed
      onUpdateInputValue(gptResponse); //update input value in timeline AKa corrects tweet typed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
        <span id="globe-icon-ai" >
              <img src={require("./chaticon.png")} style={{ width: 50, height: 50,    position: "relative", 
      top: "20px" }} alt="" /> </span>
        <Button onClick={generateText}> Generate Tag Description with AI
        
        </Button>
      
      {/* <button onClick={generateText}>Generate GPT Response</button> */}
    </div>
  );
};

export default TagDescription;