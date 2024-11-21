import { ReactTags } from 'react-tag-autocomplete';
import React, { useCallback, useState, useEffect, useRef} from 'react'


function Tags(){
    // const [selected, setSelected] = useState([])
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState([])
    const reactTags = useRef(null);


    
    // tags methods
//     const suggestions = [
//     { value: 3, label: 'Bananas' },
//     { value: 4, label: 'Mangos' },
//     { value: 5, label: 'Lemons' },
//     { value: 6, label: 'Apricots', disabled: true },
//   ]
    const onAdd = useCallback(
      (newTag) => {
        console.log("on add method: "  + newTag.label)
        setTags([...tags, newTag])
        console.log(tags)
      },
      [tags]
    )

    const onDelete = useCallback(
      (tagIndex) => {
        setTags(tags.filter((_, i) => i !== tagIndex))
      },
      [tags]
    )
   const fetchTags = ()=> {
        fetch('http://localhost:8080/api/tags')
        .then(res=>res.json())
        .then(data=> {
            setSuggestions(data.map(tag => ({ value: tag.id, label: tag.tagName })));
        })
    }

    useEffect(()=>{
       fetchTags()
    }, [])
    return (
        <>

<ReactTags

ref={reactTags}
        tags={tags}
         allowNew={true}  
    //   labelText="Select Tags"
      onAdd={onAdd}
      onDelete={onDelete}
       suggestions={suggestions}
      />
      Your tags: 
      {tags.map(t=> <div key={t.id}>{t.label}</div>)}
        </>
    )
}

export default Tags;