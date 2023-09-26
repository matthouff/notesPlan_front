import {
  Box,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
} from "@mui/material";
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
  const [content, setContent] = useState({ libelle: "", message: "" });
  const [isInitializing, setIsInitializing] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null); // enregistre l'id du précédent setTimeOut poru l'annuler
  const isTablet = useResponsive("down", "lg");

  useEffect(() => {
    setContent({ libelle: note?.libelle ?? "", message: note?.message ?? "" });
    setIsInitializing(false); // Définir isInitializing sur false une fois que le composant est monté
  }, [note, note?.message]);

  useEffect(() => {
    if (editOpen && !content?.libelle && !content?.message) {
      setContent({ libelle: "", message: "" });
    }
  }, [editOpen, content]);

  const handleChange = (newValue) => {
    // Permet de transformer le html en text pour vérifier si c'est une valeur vide ou non
    const verifContent = new DOMParser().parseFromString(
      newValue?.message,
      "text/html"
    ).documentElement.textContent;

    if (
      (!isInitializing &&
        content?.libelle !== newValue?.libelle &&
        content?.libelle !== "" &&
        note?.message !== verifContent &&
        verifContent !== undefined) ||
      editOpen
    ) {
      clearTimeout(timeoutId);
      setContent({ ...content, ...newValue });

      const newTimeoutId =
        !!verifContent &&
        setTimeout(() => {
          newNote({ ...content, ...newValue, id: note?.id }, editOpen);
        }, 1000);

      setTimeoutId(newTimeoutId);
    }
  };

  return (
    <Stack position="relative" height="100%">
      <Box display="flex">
        <PersoTextField
          fullWidth
          inputRef={titleRef}
          inputProps={{ maxLength: 60 }}
          name="message"
          value={content?.libelle}
          onInput={(e) => handleChange({ libelle: e.target.value })}
          placeholder="Title"
        />
        {isTablet && (
          <IconButton onClick={deleted} color="error">
            <Trash />
          </IconButton>
        )}
      </Box>
      <Box ref={reactQuillRef} height="100%" overflow="auto">
        <Divider />
        <ReactQuill
          value={content?.message}
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
