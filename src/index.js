import React from "react";
import { render } from "react-dom";
import { Editor } from "./lib";

const App = () => {
  const style = {
    lineHeight: 2,
    fontSize: "large",
    whiteSpace: "pre-line",
    overflowX: "hidden",
    overflowY: "scroll",
    backgroundColor: "var(--contrast-color)",
    color: "var(--secondary-color)",
    borderColor: "var(--secondary-color)",
    borderWidth: "0.1em",
    padding: "3em",
    fontFamily: "Saira-Regular",
    zoom: 1,
  };

  const tags = [
    {
      id: 1,
      name: "PERSON",
      description: "Persona",
      should_anonimyzation: true,
      enable_multiple_selection: false,
    },
    {
      id: 2,
      name: "LOC",
      description: "Persona0",
      should_anonimyzation: false,
      enable_multiple_selection: false,
    },
    {
      id: 3,
      name: "LOC1",
      description: "Persona1",
      should_anonimyzation: false,
      enable_multiple_selection: false,
    },
    {
      id: 4,
      name: "LOC2",
      description: "Persona2",
      should_anonimyzation: false,
      enable_multiple_selection: false,
    },
    {
      id: 5,
      name: "LOC3",
      description: "Persona3",
      should_anonimyzation: false,
      enable_multiple_selection: false,
    },
  ];
  const annotations = [
    {
      id: 1,
      start: 18,
      end: 28,
      tag: "PERSON",
      should_anonymized: true,
      human_marked_ocurrency: false,
    },
  ];
  const text =
    "On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album,  Invasion of Privacy";

  /*
  const onAnnotationsChange = (deleteAnnotations, newAnnotations) => {
    console.log(deleteAnnotations, newAnnotations);
  };
  */

  return (
    <Editor
      style={style}
      annotations={annotations}
      tags={tags}
      text={text}
      multipleSelectionEnable={false}
    />
  );
};

render(<App />, document.getElementById("root"));
