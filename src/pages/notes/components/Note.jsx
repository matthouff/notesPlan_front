import { Box, Divider, styled, TextField } from "@mui/material";
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
  ["link", "image", "video"],
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
  newTitle: PropTypes.func,
};

function Note({ note, titleRef }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  // const { mutate } = useMutation(createdData, {
  //   onSuccess: () => {
  //     // Mettre à jour la liste des répertoires après la création d'un nouvel élément
  //     noteSelected();
  //     queryClient.invalidateQueries("notes");
  //   },
  // });

  // const handleTitleChange = (value) => {
  //   setTitle(value.target.value);
  //   newTitle({ itemValue: value.target.value, newNote: editOpen });
  // };

  useEffect(() => {
    setContent(note ? note?.message : "");
    setTitle(note ? note?.libelle : "");
    setIsInitializing(false); // Définir isInitializing sur false une fois que le composant est monté
  }, [note]);

  const handleChange = (x) => {

    if (!isInitializing) {
      if (x.libelle) {
        setTitle(x.libelle)
      }
      console.log("coucou");

      setTimeout(() => {
        console.log("coucou");
      }, 3000)
    }


    // mutate({ repertoireId: repertoireSelected, libelle: libelle });
    // newNote(false);
    // setLibelle(null);
    // noteSelected(data[data.length - 1])
  };

  return (
    <Box position="relative" paddingTop={5} height="100%">
      <PersoTextField
        inputRef={titleRef}
        fullWidth
        name="message"
        value={title}
        onChange={(x) => handleChange({ libelle: x.target.value })}
        placeholder="Title"
      />
      <Box>
        <Divider />
        <ReactQuill
          value={content}
          onChange={(x) => handleChange({ message: x })}
          style={editorStyle}
          toolbarStyle={toolbarStyle}
          placeholder="Entrez votre note ici..."
          modules={{
            toolbar: toolbarOptions,
          }}
        />
      </Box>
    </Box>
  );
}

export default Note;
