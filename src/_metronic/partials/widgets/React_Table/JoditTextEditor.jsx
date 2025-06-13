import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const JoditTextEditor = ({ initialValue, onChange, height = 300 }) => {
  const editorRef = useRef(null);
  const contentRef = useRef(initialValue); // Store content without causing re-renders

  return (
    <JoditEditor
      ref={editorRef}
      value={contentRef.current} // Use ref value (prevents re-renders)
      config={{ height }} // Set height
      onChange={(newContent) => {
        contentRef.current = newContent; // Update content without triggering re-renders
        onChange(newContent); // Pass to parent when needed
      }}
    />
  );
};

export default JoditTextEditor;
