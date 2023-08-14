import { Box, Divider, Stack, styled, TextField } from "@mui/material";
import { useState } from "react";
import "../style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import { useEffect } from "react";

const PersoTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& input": {
      fontSize: 30,
      padding: "10px 15px",
      color: "#fff",
    },
    "& fieldset": {
      borderColor: "#fffc",
      border: "none",
      borderBottom: "1px solid #fff8",
      borderRadius: 0,
    },
    "&:hover fieldset": {
      borderColor: "#fff8",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  ["link"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["clean"],
];

const editorStyle = {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  color: "#fff",
};

const toolbarStyle = {
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
};

Note.propTypes = {
  note: PropTypes.object,
  editOpen: PropTypes.bool,
  titleRef: PropTypes.object,
  newNote: PropTypes.func,
};

function Note({ note, titleRef, newNote, editOpen }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);  // enregistre l'id du précédent setTimeOut poru l'annuler

  useEffect(() => {
    setContent(note ? note?.message : "");
    setTitle(note ? note?.libelle : "");
    setIsInitializing(false); // Définir isInitializing sur false une fois que le composant est monté
  }, [note, note?.message,]);

  const titleHandleChange = (e) => {
    e.preventDefault();
    handleChange({ libelle: e.target.value })
  }

  const handleChange = (x) => {
    if (!isInitializing) {
      clearTimeout(timeoutId);

      if (x.libelle) {
        setTitle(x.libelle)
      } else {
        setContent(x.message)
      }

      const newTimeoutId = setTimeout(() => {
        newNote({ ...x, id: note?.id }, editOpen);
      }, 1500);

      setTimeoutId(newTimeoutId);
    }

  };

  return (
    <Stack position="relative" paddingTop={5} height="100%">
      <PersoTextField
        fullWidth
        inputRef={titleRef}
        name="message"
        value={title}
        onInput={titleHandleChange}
        placeholder="Title"
      />
      <Box height="100%" overflow="scroll">
        <Divider />
        <ReactQuill
          value={content}
          onChange={(x) => handleChange({ message: x })}
          style={{ editorStyle }}
          toolbarStyle={toolbarStyle}
          placeholder="Entrez votre note ici..."
          modules={{
            toolbar: toolbarOptions,
          }}
        />
      </Box>
    </Stack>
  );
}

export default Note;
