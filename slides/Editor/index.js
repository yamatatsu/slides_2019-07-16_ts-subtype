import React, { useState, useRef, useEffect } from 'react'

let MonacoEditor

export default function Editor({ code, language = 'typescript' }) {
  if (process.env.SSR) return false

  if (!MonacoEditor) {
    MonacoEditor = require('react-monaco-editor').default
  }

  const [ref, rerenderKey] = useRenderKey()

  return (
    <MonacoEditor
      ref={ref}
      key={rerenderKey}
      width="90vw"
      height="90vh"
      language={language}
      theme="vs-dark"
      value={code}
      options={{
        selectOnLineNumbers: true,
      }}
      editorDidMount={handleDidMount}
    />
  )
}

// monacoが謎の点で表示されてしまう時がある(初期表示など)ので、そうなったらrenderKeyを更新する
function useRenderKey() {
  const ref = useRef(null)
  const [rerenderKey, rerender] = useState(0)

  useEffect(() => {
    const handler = event => {
      if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return
      const offsetHeight =
        ref.current.containerElement.childNodes[0].offsetHeight
      // monacoが謎の点で表示されてしまうとき
      if (0 < offsetHeight && offsetHeight <= 10) {
        rerender(Date.now())
      }
    }
    document.addEventListener('keydown', handler, false)
    return () => {
      document.removeEventListener('keydown', handler, false)
    }
  }, [rerenderKey])

  return [ref, rerenderKey]
}

function handleDidMount(_editor, _monaco) {
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
}
