import React, { useState } from 'react';
import axios from 'axios';

const GPT3Component = ({ apiKey, onUpdateInputValue, question }) => {

  const pencilIcon = <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
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
                
                "content": `Make this grammatically correct: ${question}`
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
      <span id="pencil-icon-ai" onClick={generateText}>{pencilIcon}</span>
      {/* <button onClick={generateText}>Generate GPT Response</button> */}
    </div>
  );
};

export default GPT3Component;