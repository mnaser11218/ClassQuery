import React, { useState } from 'react'
import H1HeaderTag from '../styled-components/H1HeaderTag'
import StyledInput from '../styled-components/StyledInput'
import BlueButton from '../styled-components/BlueButton'
import styled from 'styled-components'
import { useUser } from '../CurrentUser'
import { useNavigate } from 'react-router-dom'
import TagDescription from '../OpenAI/TagDescription'

const CenterPageDiv = styled.div`
padding: 30px 28px;
`
export default function AddTag() {
    const [name, setName] = useState("")
    const [topic, setTopic] = useState("")
    const [tagDescription, setTagDescription] = useState("")
    const {currentLoggedInUser} = useUser();
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY
    const navigate = useNavigate()
    const routeChange = ()=>{
        let path = `/tags`
        navigate(path)
    }
    

    const handleAddTag = ()=>{

        fetch("http://localhost:8080/api/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                tagName: name,
                tagDescription: tagDescription,
                createdDate: new Date(),
                "labName": null,
                "labTopic": topic,
                "questions": null
            })
        })
    .then(response=> response.json())
    .then(data=> {
        console.log(data)
        routeChange()

    })



    };
  return (
    <>
    <CenterPageDiv>
    <H1HeaderTag>Add Tag </H1HeaderTag>
    
    <StyledInput placeholder="Tag name" type="text" value={name} maxlength="150"
    onChange={e=>setName(e.target.value)}
    />
    <StyledInput placeholder="Tag Topic" type="topic" value={topic} maxlength="150"
    onChange={e=>setTopic(e.target.value)}
    />
    <StyledInput placeholder="Tag Description" type="description" value={tagDescription} maxlength="150"
 
    onChange={e=>setTagDescription(e.target.value)}
    />
    
    {  name ?    <>  <div style={{"margin": "15px 0px 5px 0px",
"padding": "7px 0px 10px 0px"}}>  AI Features:</div><TagDescription apiKey={apiKey} onUpdateInputValue={setTagDescription} tagName={name}/>  </> : ""} 

    <BlueButton onClick={handleAddTag}>Save Tag</BlueButton>
    </CenterPageDiv>

    
    </>
  )
}