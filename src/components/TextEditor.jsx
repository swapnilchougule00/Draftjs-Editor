import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";
import Header from "./Header";
import SaveButton from "./SaveButton";

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  HEADING_ONE: {
    fontSize: "30px",
    fontWeight: "700",
  },
  RED: {
    color: "rgb(255, 0, 0)",
  },
};



const  getModifiedText = (newState, offset = 1)=> {
  const currentContent = newState.getCurrentContent();
  const currentSelection = newState.getSelection();
  const endOffset = currentSelection.getEndOffset();

  const newContent = Modifier.replaceText(
    currentContent,
    currentSelection.merge({
      anchorOffset: endOffset - offset,
      focusOffset: endOffset,
    }),
    ""
  );

  return EditorState.push(newState, newContent, "remove-range");
}

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

 

  function handleEditorChange(newEditorState) {
    setEditorState(newEditorState);
  }

  useEffect(() => {
    const savedData = localStorage.getItem("editorContent");
    const state = savedData
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedData)))
      : EditorState.createEmpty();

    setEditorState(state);
  }, []);

  const handleSave = (e) => {
    const contentState = editorState.getCurrentContent();
    console.log(editorState);
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
    console.log(rawContent);
  };

  const  handleKeyCommand = (command, newEditorState)=> {
    let newState = RichUtils.handleKeyCommand(newEditorState, command);

    if (command === "h1") {
      newState = getModifiedText(newEditorState);
      newState = RichUtils.toggleInlineStyle(newState, "HEADING_ONE");
    }

    if (command === "boldText") {
      newState = getModifiedText(newEditorState);
      newState = RichUtils.toggleInlineStyle(newState, "BOLD");
    }

    if (command === "redText") {
      newState = getModifiedText(newEditorState, 2);
      newState = RichUtils.toggleInlineStyle(newState, "RED");
    }

    if (command === "underline") {
      newState = getModifiedText(newEditorState, 3);
      newState = RichUtils.toggleInlineStyle(newState, "UNDERLINE");
    }

    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }

  const  keyBindingFunction = (e)  =>{
    if (
      e.keyCode === 32 &&
      editorState.getCurrentContent().getPlainText().endsWith("#") &&
      editorState.getSelection().getStartOffset() === 1
    ) {
      return "h1";
    }

    if (
      e.keyCode === 32 &&
      editorState.getCurrentContent().getPlainText().endsWith("*") &&
      editorState.getSelection().getStartOffset() === 1
    ) {
      return "boldText";
    }

    if (
      e.keyCode === 32 &&
      editorState.getCurrentContent().getPlainText().endsWith("**") &&
      editorState.getSelection().getStartOffset() === 2
    ) {
      return "redText";
    }

    if (
      e.keyCode === 32 &&
      editorState.getCurrentContent().getPlainText().endsWith("***") &&
      editorState.getSelection().getStartOffset() === 3
    ) {
      return "underline";
    }

    return getDefaultKeyBinding(e);
  }


  return (
    <div className="w-full h-screen p-6 space-y-2">
      <div className="flex w-full h-[8%] justify-center">
        <Header />
        <SaveButton handleSave={handleSave} />
      </div>

      <div className="w-[80%] h-[90%] font-sans m-auto border-2 rounded-md border-black  p-2">
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
          onChange={handleEditorChange}
          placeholder="type text here..."
          spellCheck={true}
        />
      </div>
    </div>
  );
};
export default TextEditor;
