import React, { useState } from "react";
import MonacoEditor from "react-monaco-editor";

export default function Editor() {
  const [code] = useState("// type your code...");
  const options = {
    selectOnLineNumbers: true
  };

  const handleDidMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  const handleChange = (newValue, e) => {
    console.log("onChange", newValue, e);
  };

  return (
    <MonacoEditor
      width="800"
      height="600"
      language="typescript"
      theme="vs-dark"
      value={code}
      options={options}
      onChange={handleChange}
      editorDidMount={handleDidMount}
    />
  );
}
