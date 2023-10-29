import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const delay = 3000;
    const timer = setTimeout(() => {
      navigate('/home'); 
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [history]);

  return (
    <div >
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,400;1,400;1,1000&family=Paytone+One&family=Poppins:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>
        {`
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Paytone One', sans-serif, 'Calibri';
            background-color: #dbbb2c;
            color: white;
          }

          @keyframes stretchAndSqueeze {
            0% {
              letter-spacing: 5px;
            }
            25% {
              letter-spacing: 10px;
            }
            65% {
              letter-spacing: -8px;
            }
            100% {
              letter-spacing: 0px;
            }
          }

          .animated-text {
            animation: stretchAndSqueeze 2.5s;
            font-size: 100px;
          }
        `}
      </style>
      <div className="animated-text">summed up</div>
    </div>
  );
};

export default LandingPage;
