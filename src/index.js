import React from 'react';
import { render } from "react-dom";
import { Editor } from "./lib";

const App = () => {
  const style = {
     lineHeight: 2,
     fontSize: 'large',
     whiteSpace: 'pre-line',
     overflowX: 'hidden',
     overflowY: 'scroll',
     backgroundColor: 'var(--contrast-color)',
     color: 'var(--secondary-color)',
     borderColor: 'var(--secondary-color)',
     borderWidth: '0.1em',
     padding: '3em',
     fontFamily: 'Saira-Regular',
     zoom: 1,
  }

  const docId = 345;

  const tags = [
    { id: 1, name: "PERSON", description: "Persona", should_anonimyzation: true, enable_multiple_selection: false },
    { id: 2, name: "LOC", description: "Persona", should_anonimyzation: false, enable_multiple_selection: false }
  ];
  const annotations = [
    { id:1, start:18, end:28, tag:'PERSON', should_anonymized: true, human_marked_ocurrency: false }
  ];
  const text = "On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album,  Invasion of Privacy";

  const onAnnotationsChange = (deleteAnnotations, newAnnotations) => console.log(deleteAnnotations, newAnnotations)

  return (
      <Editor
        docId={docId}
        style={style}
        annotations={annotations}
        tags={tags}
        text={text}
        onAnnotationsChange={onAnnotationsChange}
        multipleSelectionEnable={false}
      />
  );
}

render(<App />, document.getElementById("root"));
