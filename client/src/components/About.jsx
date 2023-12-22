import React from "react";

function About() {
  const tlDrStyle = {
    fontFamily: 'Fugaz One',
    fontSize: '1.2rem', 
    paddingRight: 3
  };

  return (
    <div className="about">
      <h1>welcome 👋 </h1>
      <br />
      <br/>
      <p>
        <span style={tlDrStyle}>TL;DR</span>      isn't your average social forum - we use OpenAI magic to whip up nifty
        summaries for your awesome posts.
        <br />
        No more endless scrolling, our summaries are like speed-reading for social media.
        <br />Dive in, share your world, and let OpenAI sprinkle its summarization stardust. ✨
      </p>
    </div>
  );
}

export default About;
