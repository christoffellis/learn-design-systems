import React, { useEffect, useRef } from 'react';

export const ScriptableIFrame = ({ scripts = [], stylesheets = [], isPlaying }) => {

    const [key, setKey] = React.useState(12);

    console.log(key);

    const iframeRef = useRef(null);
    useEffect(() => {
      
        
        const iframe = iframeRef.current;

        if (!isPlaying)
          {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const script = iframeDocument.createElement(`script`);
            script.text = `document.documentElement.style.setProperty('--animation-play-state', 'paused');`;
            iframeDocument.body.appendChild(script);
            return;
          }

        // Wait for the iframe to load
        iframe.onload = () => {
          
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            

            stylesheets.forEach((scriptContent, index) => {
                const link = iframeDocument.createElement('link');

                link.rel = 'stylesheet';
                link.href = `iframeScripts/${scriptContent}`; // Use href for CSS files
                iframeDocument.head.appendChild(link); // Append to head for CSS
            });


            // Create and append each script to the iframe body
            scripts.forEach((scriptContent, index) => {
                const script = iframeDocument.createElement(`script`);
                script.text = scriptContent.content;
                iframeDocument.body.appendChild(script);
            });

                        
        };

        if (isPlaying)
        {
        iframe.srcdoc = `
<html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .section1 {
        height: 30%;
        background-color: #f1f1f1; /* Light gray for visibility */
        display: flex;
        align-items: center; /* Center vertically */
        justify-content: center; /* Center horizontally */
      }
      .section2 {
        height: 10%;
        background-color: #e1e1e1; /* Slightly darker gray */
      }
      .section3 {
        height: 60%;
        background-color: #d1d1d1; /* Even darker gray */
        display: flex;
        justify-content: space-between;
      }
      .item {
        flex: 1;
        margin: 5px; /* Space between items */
        background-color: #c1c1c1; /* Darker gray */
        text-align: center;
        line-height: 60px; /* Center text vertically */
      }
    </style>
  </head>
  <body>
    <div class="section1"></div>
    <div class="section2"></div>
    <div class="section3">
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
      <div class="item">Item 5</div>
    </div>
  </body>
</html>`;
        }
    setKey(Math.random().toString());

    }, [isPlaying]);



    return (
      <iframe 
          title='Game'
          key={'key'}
          ref={iframeRef} 
          style={{ width: '100%', height: '100%', border: 'none' }} 
          frameBorder="0" 
      />
    );
};
