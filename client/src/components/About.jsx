import React from "react";
import tlDrIcon from "../../public/icon.png"; // Replace with the correct path to your icon image

function About() {
  const tlDrStyle = {
    fontFamily: 'Anton',
    fontSize: '3.5rem',
    paddingRight: 3,
  };

  const aboutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center', 
    textAlign: 'center',
  };

  return (
    <div className="about" style={aboutStyle}>
      <img src={tlDrIcon} alt="TL;DR Icon" width="100" height="100" />
      <p>
        <span style={tlDrStyle}>TL ; DR  </span>
        <br/>No more endless scrolling. <br/> Get to the heart of every post.
      </p>
    </div>
  );
}

export default About;
