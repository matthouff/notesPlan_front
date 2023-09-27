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
import DeleteDialog from "../../../components/DeleteDialog";

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
  deletedData: PropTypes.func,
};

function Note({
  note,
  titleRef,
  reactQuillRef,
  newNote,
  editOpen,
  deletedData,
}) {
  const [openModal, setOpenModal] = useState();
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

  const onDelete = () => {
    deletedData(note.id);
    setOpenModal(false);
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
        <IconButton
          sx={{ mx: !isTablet && 2 }}
          onClick={setOpenModal}
          color="error"
        >
          <Trash width={30} height={30} />
        </IconButton>
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
      {openModal && (
        <DeleteDialog
          open
          selected={note}
          setOpenModal={setOpenModal}
          onDelete={onDelete}
          title="supprimer la note ?"
        />
      )}
    </Stack>
  );
}

export default Note;
