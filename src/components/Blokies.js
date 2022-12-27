import React from "react";
import Blockies from "react-blockies";

function Blokies() {
  let rand = Math.random(Math.floor(0, 10));
  let name = `superfluid ${rand}`;
  return (
    <Blockies
      seed={name}
      size={10}
      scale={3}
      // color="#dfe"
      // bgColor=""
      // spotColor="#abc"
      className="identicon"
    />
  );
}

export default Blokies;
