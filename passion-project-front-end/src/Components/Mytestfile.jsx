import React from 'react'
import { useUser } from '../CurrentUser';

function Mytestfile() {
    const { currentLoggedInUser } = useUser();

  return <div style={{"color": "red"}}>my component content</div>
  
}

export default Mytestfile