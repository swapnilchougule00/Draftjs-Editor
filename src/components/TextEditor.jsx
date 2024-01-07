import React, {  useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import Header from "./Header";

const TextEditor = () => {

  const savedData = localStorage.getItem("editorContent");
  const state =  EditorState.createWithContent(
    convertFromRaw(JSON.parse(savedData))
  );
  const [editorState, setEditorState] = useState(state);


  const handleSave = (e) => {
    const contentState = editorState.getCurrentContent();
    console.log(editorState);
    const rawContent = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
    console.log(rawContent);
  };

  return (
    <div className="w-full h-screen p-6 space-y-2">
      <Header handleSave={handleSave} />

      <div className="w-[80%] h-[90%] m-auto border-2 rounded-md border-black  p-2">
        <Editor
          placeholder="type text here..."
          onChange={setEditorState}
          editorState={editorState}
        />
      </div>
    </div>
  );
};
export default TextEditor;
