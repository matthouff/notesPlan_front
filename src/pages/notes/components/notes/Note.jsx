import { Box, Divider, styled, TextField } from "@mui/material";
import { useState } from "react";
import '../../style.css'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { useEffect } from "react";

const PersoTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& input': {
      fontSize: 30,
      padding: "10px 15px",
      color: "#fff"
    },
    '& fieldset': {
      borderColor: '#fffc',
      border: "none",
      borderBottom: "1px solid #fff8",
      borderRadius: 0,
    },
    '&:hover fieldset': {
      borderColor: '#fff8',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff8',
    },
  },
});

const toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'color': [] }, { 'background': [] }],
  ['link', 'image', 'video'],
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'align': [] }],
  ['clean']
];

const editorStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px',
  color: '#fff',
};

const toolbarStyle = {
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #ddd',
};

Note.propTypes = {
  note: PropTypes.object,
  newTitle: PropTypes.func,
}

function Note({ note, newTitle }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");


  const handleEditorChange = (value) => {
    setContent(value);
  };
  const handleTitleChange = (event, value) => {
    if (note) {
      setTitle(value);
      newTitle(value);
    }
  };

  useEffect(() => {
    setContent(note?.no_message)
    setTitle(note?.no_libelle)
  }, [note])

  console.log(title);

  return (
    <Box position="relative" paddingTop={5}>
      <PersoTextField
        fullWidth
        name="no_message"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
      />
      <Box>
        <Divider />
        <ReactQuill
          value={content}
          onChange={handleEditorChange}
          style={editorStyle}
          toolbarStyle={toolbarStyle}
          placeholder="Entrez votre note ici..."
          modules={{
            toolbar: toolbarOptions
          }}
        />
      </Box>
    </Box>
  )
}

export default Note;