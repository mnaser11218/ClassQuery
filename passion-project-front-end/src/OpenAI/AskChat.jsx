import React from "react";
import * as Icon from "react-icons/fi";
import Checkbox from "react-custom-checkbox";

const AskChat = () => {
  return (
    <>
      {/* <h4>Default:</h4>
      <Checkbox />
      <h4>Using Custom Icon:</h4>
      <Checkbox
        icon={<Icon.FiCheck color="#174A41" size={14} />}
        name="my-input"
        checked={true}
        onChange={(value, event) => {
          let p = {
            isTrue: value,
          };
          console.log(event);
          return alert(value);
        }}
        borderColor="#D7C629"
        style={{ cursor: "pointer" }}
        labelStyle={{ marginLeft: 5, userSelect: "none" }}
        label="Have you started using it?"
      />
      <h4>Using Image Icon:</h4> */}
      
    
        
      <Checkbox
      style={{"padding": "7px", "margin": "25px 10px 20px 10px"}}
        checked={false}
        icon={<img src={require("./chaticon.png")} style={{ width: 35 }} alt="" />}
        borderColor="#D7C629"
        borderRadius={10}
        size={15}
        label="  Would you like ChatGPT to provide the first answer?"
      />


      {/* <h4>More Styling:</h4>
      <Checkbox
        checked={true}
        icon={
          <div
            style={{
              display: "flex",
              flex: 1,
              backgroundColor: "#174A41",
              alignSelf: "stretch",
            }}
          >
            <Icon.FiCheck color="white" size={20} />
          </div>
        }
        borderColor="#174A41"
        // borderWidth={0}
        borderRadius={20}
        style={{ overflow: "hidden" }}
        size={20}
        label="Coooool right?"
      /> */}
    </>
  );
};

export default AskChat;