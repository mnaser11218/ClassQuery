import React, { useState } from 'react'
import H1HeaderTag from './styled-components/H1HeaderTag'
import StyledInput from './styled-components/StyledInput'
import BlueButton from './styled-components/BlueButton'
import styled from 'styled-components'

const CenterPageDiv = styled.div`
padding: 30px 28px;
`
export default function AddAssignment() {
    const [name, setName] = useState("")
    const [topic, setTopic] = useState("")
    const [courseName, setCourseName] = useState("")
    const [courseDescription, setCourseDescription] = useState("")
    const handleAddAssignment = ()=>{};
  return (
    <>
    <CenterPageDiv>
    <H1HeaderTag>Add Assignment </H1HeaderTag>
    
    {/* make this for the owner name
    <StyledInput placeholder="name" type="name" value={name}
    onChange={e=>setName(e.target.value)}
    /> */}
    <StyledInput placeholder="Assignment Name" type="topic" value={topic}
    onChange={e=>setTopic(e.target.value)}
    />
    <StyledInput placeholder="Course Name" type="courseName" value={courseName} 
 
    onChange={e=>setCourseName(e.target.value)}
    />
      <StyledInput placeholder="Assignment Description" type="courseDescription" value={courseDescription} 
    
    onChange={e=>setCourseDescription(e.target.value)}
    />
    <BlueButton onClick={handleAddAssignment}>Save Assignment</BlueButton>
    </CenterPageDiv>

    
    </>
  )
}
