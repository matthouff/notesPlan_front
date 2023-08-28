import { Box, Divider, IconButton, Stack, styled, TextField } from "@mui/material";
import { useState } from "react";
import "../style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import useResponsive from "../../../hooks/useResponsive";
import { Trash } from "lucide-react";

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
  // Styles spécifiques pour les écrans de largeur inférieure à 768px
  "@media (max-width: 1024px)": {
    "& .MuiOutlinedInput-root": {
      "& input": {
        fontSize: 20, // Réduisez la taille de la police pour les écrans plus petits
      },
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
  reactQuillRef: PropTypes.object,
  newNote: PropTypes.func,
  deleted: PropTypes.func,
};

function Note({ note, titleRef, reactQuillRef, newNote, editOpen, deleted }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);  // enregistre l'id du précédent setTimeOut poru l'annuler
  const isTablet = useResponsive("down", "lg");

  useEffect(() => {
    setContent(note?.message ?? null);
    setTitle(note ? note?.libelle : "");
    setIsInitializing(false); // Définir isInitializing sur false une fois que le composant est monté
  }, [note, note?.message,]);

  const titleHandleChange = (e) => {
    e.preventDefault();
    handleChange({ libelle: e.target.value })
  }

  const handleChange = (newValue) => {
    // Permet de transformer le html en text pour vérifier si c'est une valeur vide ou non
    const verifContent = new DOMParser().parseFromString(newValue.message, "text/html").documentElement.textContent

    if (!isInitializing) {
      clearTimeout(timeoutId);

      if (newValue.libelle) {
        setTitle(newValue.libelle)
      } else {
        setContent(newValue.message)
      }
      const newTimeoutId = verifContent && setTimeout(() => {
        newNote({ ...newValue, id: note?.id }, editOpen);
      }, 1500);

      setTimeoutId(newTimeoutId);
    }

  };

  return (
    <Stack position="relative" height="100%">
      <Box display="flex">
        <PersoTextField
          fullWidth
          inputRef={titleRef}
          name="message"
          value={title}
          onInput={titleHandleChange}
          placeholder="Title"
        />
        {isTablet &&
          <IconButton onClick={deleted} color="error">
            <Trash />
          </IconButton>
        }
      </Box>
      <Box height="100%" overflow="scroll">
        <Divider />
        <ReactQuill
          ref={reactQuillRef}
          value={content}
          onChange={(newMessage) => handleChange({ message: newMessage })}
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
