import React, { useState } from 'react';

function SimpleTags({setTags, tags}) {
  
  const handleAddTag = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      setTags([...tags, event.target.value]);
      event.target.value = ''; 
    }
  };

  const handleDeleteTag = (index) => {  
    setTags(tags.filter((tag, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        onKeyDown={handleAddTag}
        placeholder="Press Enter to add a tag"
      />

      <div>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              display: 'inline-block',
              backgroundColor: '#007bff',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '15px',
              margin: '5px',
            }}
          >
            {tag}
            <button
              onClick={() => handleDeleteTag(index)}
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
  
    </div>
  );
};

export default SimpleTags;