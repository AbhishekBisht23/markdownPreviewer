import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import "./index.css";

function App() {
  const [markdown, setMarkdown] = useState("# This is a Markdown");
  const [theme, setTheme] = useState("Light");

  const changeTheme = () => {
    setTheme(prevTheme => prevTheme === "Light" ? "Dark" : "Light");
  };

  const exportHTML = () => {
    const htmlContent = `
      <html>
        <head><title>Markdown Export</title></head>
        <body>${markdown}</body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "markdown.html";
    link.click();
  };

  return (
    <div className={`maindiv ${theme.toLowerCase()}`}>
      <div className="header">
        <button onClick={changeTheme}>Switch to {theme === "Light" ? "Dark" : "Light"}</button>
        <button onClick={exportHTML}>Export as HTML</button>
      </div>

      <div className='container'>
        <div className='leftdiv'>
          <textarea
            value={markdown}
            onChange={(e)=> setMarkdown(e.target.value)}
            placeholder="Write your markdown here"
          ></textarea>
          <button onClick={() => setMarkdown("")}>Clear</button>
        </div>

        <div className='rightdiv'>
          <div className='prose'>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
