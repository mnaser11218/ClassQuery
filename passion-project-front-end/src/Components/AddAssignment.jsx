import React, { useState } from 'react'
import H1HeaderTag from '../styled-components/H1HeaderTag'
import StyledInput from '../styled-components/StyledInput'
import BlueButton from '../styled-components/BlueButton'
import styled from 'styled-components'
import { useUser } from '../CurrentUser'
import { useNavigate } from 'react-router-dom'

const CenterPageDiv = styled.div`
padding: 30px 28px;
`
export default function AddAssignment() {
    const [name, setName] = useState("")
    const [topic, setTopic] = useState("")
    const [courseName, setCourseName] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const {currentLoggedInUser} = useUser();
    const navigate = useNavigate()
    const routeChange = ()=>{
        let path = `/`
        navigate(path)
    }
    

    const handleAddAssignment = ()=>{

        fetch("http://localhost:8080/api/assignments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "name": name,
                "topic": topic,
                "courseName": courseName,
                "description": currentLoggedInUser?.name ?currentLoggedInUser?.name : "Anonymous User" ,
                "created": new Date(),
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
    <H1HeaderTag>Add Assignment </H1HeaderTag>
    
    <StyledInput placeholder="Assignment name" type="name" value={name}
    onChange={e=>setName(e.target.value)}
    />
    <StyledInput placeholder="Topic" type="topic" value={topic}
    onChange={e=>setTopic(e.target.value)}
    />
    <StyledInput placeholder="Course Name" type="courseName" value={courseName} 
 
    onChange={e=>setCourseName(e.target.value)}
    />
      {/* <StyledInput placeholder="Assignment Description" type="courseDescription" value={courseDescription} 
    
    onChange={e=>setCourseDescription(e.target.value)}
    /> */}
    <BlueButton onClick={handleAddAssignment}>Save Assignment</BlueButton>
    </CenterPageDiv>

    
    </>
  )
}
