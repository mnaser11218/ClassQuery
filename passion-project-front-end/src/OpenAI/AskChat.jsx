import React from "react";
import * as Icon from "react-icons/fi";
import Checkbox from "react-custom-checkbox";

const AskChat = ({onChecked}) => {
  return (
    <>
    <Checkbox
      style={{"padding": "7px", "margin": "25px 10px 20px 10px"}}
        checked={false}
        onChange={checked=>onChecked(checked)}
        icon={<img src={require("./chaticon.png")} style={{ width: 35 }} alt="" />}
        borderColor="#D7C629"
        borderRadius={10}
        size={15}
        label="  Would you like ChatGPT to provide the first answer?"
      />
    </>
  );
};

export default AskChat;