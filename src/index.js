import React from 'react';
import { render } from "react-dom";
import { Editor } from "./lib";

const App = () => {
  return (
    <div style={{ width: 640, margin: "15px auto" }}>
       <div>
        <Editor
           value={[{start:18, end:28, tag:'PERSON'}]}
           tag="PERSON"
         />
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));
