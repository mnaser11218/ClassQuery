import { ReactTags } from 'react-tag-autocomplete';
import React, { useCallback, useState, useEffect} from 'react'


function Tags(){
    const [selected, setSelected] = useState([])
    const [tags, setTags]= useState([])
    const [suggestions, setSuggestions] = useState([])
    // tags methods
//     const suggestions = [
//     { value: 3, label: 'Bananas' },
//     { value: 4, label: 'Mangos' },
//     { value: 5, label: 'Lemons' },
//     { value: 6, label: 'Apricots', disabled: true },
//   ]
    const onAdd = useCallback(
      (newTag) => {
        setSelected([...selected, newTag])
      },
      [selected]
    )
  
    const onDelete = useCallback(
      (tagIndex) => {
        setSelected(selected.filter((_, i) => i !== tagIndex))
      },
      [selected]
    )

    useEffect(()=>{
        setSuggestions([]);
        fetch('http://localhost:8080/api/tags')
        .then(res=>res.json())
        .then(data=> {
         data.forEach(tag=> setSuggestions(prevArray => [...prevArray, {value: tag.id, label: tag.tagName}]))
         console.log("length is  : " + suggestions.length)
        })
    }, [])
    return (
        <>

<ReactTags
      labelText="Select Tags"
      onAdd={onAdd}
      onDelete={onDelete}
       suggestions={suggestions}
      />
      {suggestions.forEach(ele=> console.log("tag is : " + ele.label))}
        Tags here
        </>
    )
}

export default Tags;