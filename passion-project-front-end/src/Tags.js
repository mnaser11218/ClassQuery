import { ReactTags } from 'react-tag-autocomplete';
import React, { useCallback, useState, useEffect, useRef} from 'react'


function Tags({setTags, tags}){
    // const [selected, setSelected] = useState([])
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

    // const onDelete = useCallback(
    //   (tagIndex) => {
    //     setTags(tags.filter((_, i) => i !== tagIndex))
    //   },
    //   [tags]
    // )
    const onDelete = (value)=>{
        setTags(tags.filter((tag) => tag.value !== value))
    }
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
    onAdd={onAdd}
    onDelete={onDelete}
    suggestions={suggestions}
    collapseOnSelect={true}
      />
          <div>
        {tags.map((tag, index) => (
          <span
            key={index}
            className='tag'
            // style={{
            // //   display: 'inline-block',
            // //   backgroundColor: '#007bff',
            // //   color: 'white',
            // //   padding: '5px 10px',
            // //   borderRadius: '15px',
            // //   margin: '5px',
            // }}
          >
            {tag.label}
            <button
              onClick={()=>onDelete(tag.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                marginLeft: '5px',
                cursor: 'pointer',
              }}
            >
              &times; 
            </button>
          </span>
        ))}
      </div>

        </>
    )
}

export default Tags;