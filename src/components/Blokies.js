import React from "react";
import Blockies from "react-blockies";

function Blokies() {
  return (
    <Blockies
      seed="Jeremy"
      size={10}
      scale={3}
      color="#dfe"
      bgColor="#ffe"
      spotColor="#abc"
      className="identicon"
    />
  );
}

export default Blokies;
