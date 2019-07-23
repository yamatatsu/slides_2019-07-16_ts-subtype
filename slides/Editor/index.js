import React, { useState } from 'react'

let MonacoEditor

const INITIAL_CODE = `\
{ // file
  // 以下の型を定義します
  type A = { a: number }
  type B = { b: string }
  type AB = A & B

  type FnA = (args: A) => void
  type FnAB = (args: AB) => void

  const a: A = { a: 1 }
  const ab: AB = { a: 1, b: 'hoge' }

  const fnA: FnA = ({ a }) => {}
  const fnAB: FnAB = ({ a, b }) => {}

  // このとき、AとAB、どちらがどちらのsubtype？

  const check: AB = a
  const checkF: FnA = fnAB
}
`
export default function Editor({ code, language = 'typescript' }) {
  if (process.env.SSR) return false

  if (!MonacoEditor) {
    MonacoEditor = require('react-monaco-editor').default
  }

  const [_code] = useState(code || INITIAL_CODE)

  const handleDidMount = (_editor, _monaco) => {
    const { typescriptDefaults } = _monaco.languages.typescript
    const base = typescriptDefaults._compilerOptions
    typescriptDefaults.setCompilerOptions({
      ...base,
      strict: true,
      esModuleInterop: true,
    })
    _editor.getModel().updateOptions({
      tabSize: 2,
    })

    _editor.focus()
  }

  const handleChange = (newValue, e) => {
    console.log('onChange', newValue, e)
  }

  return (
    <MonacoEditor
      width="90vw"
      height="90vh"
      language={language}
      theme="vs-dark"
      value={_code}
      options={{
        selectOnLineNumbers: true,
      }}
      onChange={handleChange}
      editorDidMount={handleDidMount}
    />
  )
}
