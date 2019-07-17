import React, { useState } from "react";

let MonacoEditor;

export default function Editor() {
  if (process.env.SSR) return false;

  if (!MonacoEditor) {
    MonacoEditor = require("react-monaco-editor").default;
  }

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
