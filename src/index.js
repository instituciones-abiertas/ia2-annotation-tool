import React, {useState} from 'react';
import { render } from "react-dom";
import { TextInput, TextAnnotator } from "./lib";

const App = () => {
  const TEXT = "On Monday night , Mr. Fallon will have a co-host for the first time : The rapper Cardi B , who just released her first album,  Invasion of Privacy"
  const TAG_COLORS = {
    ORG: '#00ffa2',
    PERSON: '#84d2ff',
  }
  const [state, setState] = useState({ value: [{ start: 18, end: 28, tag: 'PERSON' }], tag: 'PERSON' })

  return (
    <div style={{ width: 640, margin: "15px auto" }}>
      <h1>Hello React</h1>
      <TextInput label="Email Address" placeholder="name@example.com" />
          <div>
            <select
              onChange={e => setState(prevState => ({...prevState, tag: e.target.value }))}
              value={state.tag}
            >
              <option value="ORG">ORG</option>
              <option value="PERSON">PERSON</option>
            </select>

            <TextAnnotator
                style={{
                  maxWidth: 500,
                  lineHeight: 1.5,
                }}
                content={TEXT}
                value={state.value}
                onChange={value => setState({ value })}
                getSpan={span => ({
                  ...span,
                  tag: state.tag,
                  color: TAG_COLORS[state.tag],
                })}
            />


            <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>
    </div>
  );
}


render(<App />, document.getElementById("root"));
