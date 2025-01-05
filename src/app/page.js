"use client"
import { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function Home() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const inlineStyleMap = {
    RED_TEXT: {
      color: 'red',
    },
  };

  const onEditorChange = (state) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  // Custom behavior on space key press
  // const handleBeforeInput = (chars, editorState) => {
  //   if (chars === " ") {
  //     const currentContent = editorState.getCurrentContent();
  //     const selection = editorState.getSelection();
  //     const blockKey = selection.getStartKey();
  //     const block = currentContent.getBlockForKey(blockKey);
  //     const blockText = block.getText();

  //     // Check if block starts with '#'
  //     if (blockText.startsWith("#")) {
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(1).trim(), // Remove the '#' symbol
  //       );

  //       const newState = EditorState.push(editorState, contentState, "change-block-type");
  //       const updatedState = RichUtils.toggleBlockType(newState, "header-one"); // Set block to heading
  //       setEditorState(updatedState);
  //       return "handled";
  //     } 
  //     else if (blockText.startsWith("***")) {
  //       // Apply underline style
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(3).trim()
  //       );
  //       const newState = EditorState.push(editorState, contentState, "change-inline-style");
  //       const updatedState = RichUtils.toggleInlineStyle(newState, "UNDERLINE");
  //       setEditorState(updatedState);
  //       return "handled";
  //     } 
  //     else if (blockText.startsWith("**")) {
  //       // Apply red color style
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(2).trim()
  //       );
  //       const newState = EditorState.push(editorState, contentState, "change-inline-style");
  //       const updatedState = RichUtils.toggleInlineStyle(newState, "RED_TEXT");
  //       setEditorState(updatedState);
  //       return "handled";
  //     } 
  //     else if (blockText.startsWith("*")) {
  //       // Apply bold style
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(1).trim()
  //       );
  //       const newState = EditorState.push(editorState, contentState, "change-inline-style");
  //       const updatedState = RichUtils.toggleInlineStyle(newState, "BOLD");
  //       setEditorState(updatedState);
  //       return "handled";
  //     }
  //   }
  //   return "not-handled";
  // };

  // const handleBeforeInput = (chars, editorState) => {
  //   if (chars === " ") {
  //     const currentContent = editorState.getCurrentContent();
  //     const selection = editorState.getSelection();
  //     const blockKey = selection.getStartKey();
  //     const block = currentContent.getBlockForKey(blockKey);
  //     const blockText = block.getText();
  
  //     // Remove conflicting inline styles
  //     const clearInlineStyles = (state, stylesToRemove) => {
  //       let newState = state;
  //       stylesToRemove.forEach((style) => {
  //         newState = RichUtils.toggleInlineStyle(newState, style);
  //       });
  //       return newState;
  //     };
  
  //     // Handle block-level heading
  //     if (blockText.startsWith("#")) {
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(1).trim() // Remove the '#' symbol
  //       );
  
  //       const newState = EditorState.push(editorState, contentState, "change-block-type");
  //       const updatedState = RichUtils.toggleBlockType(newState, "header-one");
  //       setEditorState(updatedState);
  //       return "handled";
  //     }
  
  //     // Handle underline style (***)
  //     else if (blockText.startsWith("***")) {
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(3).trim() // Remove the '***' symbol
  //       );
  
  //       // Clear conflicting styles and apply underline
  //       const clearedState = clearInlineStyles(editorState, ["BOLD", "RED_TEXT"]);
  //       const newState = EditorState.push(clearedState, contentState, "change-inline-style");
  //       const updatedState = RichUtils.toggleInlineStyle(newState, "UNDERLINE");
  //       setEditorState(updatedState);
  //       return "handled";
  //     }
  
  //     // Handle red color style (**)
  //     else if (blockText.startsWith("**")) {
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(2).trim() // Remove the '**' symbol
  //       );
  
  //       // Clear conflicting styles and apply red text
  //       const clearedState = clearInlineStyles(editorState, ["BOLD", "UNDERLINE"]);
  //       const newState = EditorState.push(clearedState, contentState, "change-inline-style");
  //       const updatedState = RichUtils.toggleInlineStyle(newState, "RED_TEXT");
  //       setEditorState(updatedState);
  //       return "handled";
  //     }
  
  //     // Handle bold style (*)
  //     else if (blockText.startsWith("*")) {
  //       const contentState = Modifier.replaceText(
  //         currentContent,
  //         selection.merge({
  //           anchorOffset: 0,
  //           focusOffset: blockText.length,
  //         }),
  //         blockText.slice(1).trim() // Remove the '*' symbol
  //       );
  
  //       // Clear conflicting styles and apply bold
  //       const clearedState = clearInlineStyles(editorState, ["RED_TEXT", "UNDERLINE"]);
  //       const newState = EditorState.push(clearedState, contentState, "change-inline-style");
  //       const updatedState = RichUtils.toggleInlineStyle(newState, "BOLD");
  //       setEditorState(updatedState);
  //       return "handled";
  //     }
  //   }
  
  //   return "not-handled";
  // };
  
  const handleBeforeInput = (chars, editorState) => {
    if (chars === " ") {
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const blockKey = selection.getStartKey();
      const block = currentContent.getBlockForKey(blockKey);
      const blockText = block.getText();
  
      // Utility to remove all inline styles
      const clearAllInlineStyles = (state) => {
        const styles = ["BOLD", "RED_TEXT", "UNDERLINE"];
        let contentState = state.getCurrentContent();
        const selection = state.getSelection();
  
        // Remove each style
        styles.forEach((style) => {
          contentState = Modifier.removeInlineStyle(contentState, selection, style);
        });
  
        return EditorState.push(state, contentState, "change-inline-style");
      };
  
      // Handle block-level heading
      if (blockText.startsWith("#")) {
        const contentState = Modifier.replaceText(
          currentContent,
          selection.merge({
            anchorOffset: 0,
            focusOffset: blockText.length,
          }),
          blockText.slice(1).trim() // Remove the '#' symbol
        );
  
        const newState = EditorState.push(editorState, contentState, "change-block-type");
        const updatedState = RichUtils.toggleBlockType(newState, "header-one");
        setEditorState(updatedState);
        return "handled";
      }
  
      // Handle underline style (***)
      else if (blockText.startsWith("***")) {
        const contentState = Modifier.replaceText(
          currentContent,
          selection.merge({
            anchorOffset: 0,
            focusOffset: blockText.length,
          }),
          blockText.slice(3).trim() // Remove the '***' symbol
        );
  
        // Clear all styles and apply underline
        const clearedState = clearAllInlineStyles(editorState);
        const newState = EditorState.push(clearedState, contentState, "change-inline-style");
        const updatedState = RichUtils.toggleInlineStyle(newState, "UNDERLINE");
        setEditorState(updatedState);
        return "handled";
      }
  
      // Handle red color style (**)
      else if (blockText.startsWith("**")) {
        const contentState = Modifier.replaceText(
          currentContent,
          selection.merge({
            anchorOffset: 0,
            focusOffset: blockText.length,
          }),
          blockText.slice(2).trim() // Remove the '**' symbol
        );
  
        // Clear all styles and apply red text
        const clearedState = clearAllInlineStyles(editorState);
        const newState = EditorState.push(clearedState, contentState, "change-inline-style");
        const updatedState = RichUtils.toggleInlineStyle(newState, "RED_TEXT");
        setEditorState(updatedState);
        return "handled";
      }
  
      // Handle bold style (*)
      else if (blockText.startsWith("*")) {
        const contentState = Modifier.replaceText(
          currentContent,
          selection.merge({
            anchorOffset: 0,
            focusOffset: blockText.length,
          }),
          blockText.slice(1).trim() // Remove the '*' symbol
        );
  
        // Clear all styles and apply bold
        const clearedState = clearAllInlineStyles(editorState);
        const newState = EditorState.push(clearedState, contentState, "change-inline-style");
        const updatedState = RichUtils.toggleInlineStyle(newState, "BOLD");
        setEditorState(updatedState);
        return "handled";
      }
    }
  
    return "not-handled";
  };
  

  // Logs editor content to the console in raw format
  const handleButtonClick = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    localStorage.setItem('editorContent', JSON.stringify(rawContent));
    alert('Saved to Local Storage !');
  };

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Draft.js Editor</h1>
        <button style={styles.button} onClick={handleButtonClick}>
          Save
        </button>
        <div style={styles.editorContainer}>
          {isClient && (
            <Editor
              editorState={editorState}
              onChange={onEditorChange}
              handleKeyCommand={handleKeyCommand}
              handleBeforeInput={(chars) => handleBeforeInput(chars, editorState)}
              placeholder="Start typing here..."
              customStyleMap={inlineStyleMap}
            />
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    width: '60%',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  button: {
    marginBottom: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  editorContainer: {
    border: '1px solid #ddd',
    minHeight: '200px',
    padding: '10px',
    textAlign: 'left',
    cursor: 'text',
    borderRadius: '4px',
  },
};
