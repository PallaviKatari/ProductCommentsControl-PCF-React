
import * as React from "react";

export interface RichTextEditorProps {
  value: string;
  disabled: boolean;
  onChange: (html: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  disabled,
  onChange,
}) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const editor = editorRef.current;

    if (editor && editor.innerHTML !== (value || "")) {
      editor.innerHTML = value || "";
    }
  }, [value]);

  const format = (command: string, argument?: string) => {
    if (disabled || !editorRef.current) return;

    editorRef.current.focus();
    document.execCommand(command, false, argument);

    onChange(editorRef.current.innerHTML);
  };

  const toolbarButton = (
    label: string,
    command: string,
    title: string,
    argument?: string,
  ) => (
    <button
      key={command + label}
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => format(command, argument)}
      style={{
        padding: "6px 9px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#fff",
        cursor: disabled ? "default" : "pointer",
        fontWeight: command === "bold" ? "bold" : "normal",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ border: "1px solid #aaa", borderRadius: "5px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5px",
          padding: "8px",
          borderBottom: "1px solid #ddd",
          background: "#f7f7f7",
        }}
      >
        {toolbarButton("B", "bold", "Bold")}
        {toolbarButton("I", "italic", "Italic")}
        {toolbarButton("U", "underline", "Underline")}
        {toolbarButton("H1", "formatBlock", "Heading 1", "h1")}
        {toolbarButton("H2", "formatBlock", "Heading 2", "h2")}
        {toolbarButton("• List", "insertUnorderedList", "Bulleted list")}
        {toolbarButton("1. List", "insertOrderedList", "Numbered list")}
        {toolbarButton("←", "justifyLeft", "Align left")}
        {toolbarButton("↔", "justifyCenter", "Center")}
        {toolbarButton("→", "justifyRight", "Align right")}
        {toolbarButton("Undo", "undo", "Undo")}
        {toolbarButton("Redo", "redo", "Redo")}
      </div>

      <div
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        role="textbox"
        aria-label="Formatted comments"
        aria-multiline="true"
        onInput={(event) => {
          onChange(event.currentTarget.innerHTML);
        }}
        style={{
          minHeight: "180px",
          maxHeight: "400px",
          overflowY: "auto",
          padding: "12px",
          outline: "none",
          background: disabled ? "#f5f5f5" : "#fff",
          cursor: disabled ? "default" : "text",
        }}
      />
    </div>
  );
};
