import React, { useState } from 'react';

function SimpleTags() {
  const [tags, setTags] = useState([]); // State to hold the tags

  const handleAddTag = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      // Add tag if Enter key is pressed
      setTags([...tags, event.target.value]);
      event.target.value = ''; // Clear the input field
    }
  };

  const handleDeleteTag = (index) => {
    // Delete a tag by index
    setTags(tags.filter((tag, i) => i !== index));
  };

  return (
    <div>


      {/* Input field to add tags */}
      <input
        type="text"
        onKeyDown={handleAddTag}
        placeholder="Press Enter to add a tag"
      />

      {/* Display tags */}
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
              &times; {/* × symbol for delete */}
            </button>
          </span>
        ))}
      </div>
  
    </div>
  );
};

export default SimpleTags;