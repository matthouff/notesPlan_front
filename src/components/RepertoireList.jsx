import {
  Box,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Plus, Check, MoreVertical } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import "../components/style.css";
import PersonnalPopover from "./PersonnalPopover";
import SnackBarPerso from "./SnackbarPerso";

RepertoireList.propTypes = {
  title: PropTypes.string,
  repertoires: PropTypes.array,
  setRepertoireSelected: PropTypes.func,
  actualRepertoire: PropTypes.string,
  createdData: PropTypes.func,
  deletedData: PropTypes.func,
  editData: PropTypes.func,
};

function RepertoireList({
  setRepertoireSelected,
  actualRepertoire,
  repertoires,
  deletedData,
  editData,
  createdData,
  title,
}) {
  const textFieldRef = useRef(null);
  const textFieldEditRef = useRef(null);
  const buttonRef = useRef(null);
  const sendButtonRef = useRef(null);
  const editRef = useRef(null);
  const [responseInfo, setResponse] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [libelle, setLibelle] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(editOpen ? editData : createdData, {
    onSuccess: (error) => {
      setResponse({ ...error.data, key: new Date().getTime(), open: true });
      // Mettre à jour la liste des répertoires après la création d'un nouvel élément
      !editOpen && setRepertoireSelected(null);
      queryClient.invalidateQueries("repertoires_notes");
    },
  });

  const handleClickOutside = (event) => {
    if (
      textFieldRef.current &&
      !textFieldRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      sendButtonRef.current &&
      !sendButtonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  const handleClickOutsideEdit = (event) => {
    if (
      textFieldEditRef?.current &&
      !textFieldEditRef?.current?.contains(event.target) &&
      sendButtonRef.current &&
      !sendButtonRef.current.contains(event.target) &&
      !editRef?.current?.contains(event.target)
    ) {
      setOpenOption(false);
      setEditOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      textFieldRef.current.focus();
    }
    if (editOpen) {
      textFieldEditRef.current.focus();
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleClickOutsideEdit);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleClickOutsideEdit);
    };
  }, [setRepertoireSelected, open, editOpen, actualRepertoire]);

  const selectedRepertoire = (repertoireId) => {
    if (repertoireId) {
      setRepertoireSelected(repertoireId);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    mutate({ id: openOption?.selected?.id, libelle: libelle });
    setEditOpen(false);
    setLibelle(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ libelle: libelle });
    setOpen(false);
    setLibelle(null);
  };

  return (
    <Stack gap={10}>
      <Typography variant="h1" fontWeight="bold" color="primary" fontSize={60}>
        {title}
      </Typography>
      <Stack gap={1}>
        <Typography variant="h6" color="primary">
          Repertoires
        </Typography>
        <Box border="1px solid #fffb" height="100%">
          <List sx={{ p: 0 }}>
            {repertoires &&
              repertoires.map((repertoire, index) => {
                return editOpen &&
                  repertoire?.id === openOption?.selected?.id ? (
                  <Stack
                    key={repertoire.id}
                    flexDirection="row"
                    position="relative"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <form
                      style={{ display: "flex", alignItems: "center" }}
                      onSubmit={handleEditSubmit}
                    >
                      <FormControl fullWidth>
                        <TextField
                          inputRef={textFieldEditRef}
                          name="libelle"
                          value={libelle ?? openOption?.selected?.libelle}
                          onInput={(e) => setLibelle(e.target.value)}
                          InputProps={{
                            style: {
                              width: "100%",
                              color: "#fff",
                              paddingRight: 40,
                            },
                          }}
                          color="secondary"
                        />
                      </FormControl>
                      <IconButton
                        color="primary"
                        ref={sendButtonRef}
                        type="submit"
                        sx={{ position: "absolute", minWidth: 4, right: 10 }}
                      >
                        <Check />
                      </IconButton>
                    </form>
                  </Stack>
                ) : (
                  <ListItem
                    key={repertoire?.id}
                    sx={{ p: 0 }}
                    secondaryAction={
                      <IconButton
                        onClick={(e) =>
                          setOpenOption({
                            open: true,
                            anchor: e.currentTarget,
                            selected: repertoire,
                          })
                        }
                      >
                        <MoreVertical style={{ stroke: "#fff" }} />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      sx={{
                        ...(index < repertoires.length - 1 && {
                          borderBottom: "1px solid #fffb",
                        }),
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1.5,
                      }}
                      selected={
                        repertoire?.id === actualRepertoire ??
                        repertoires[0]?.id
                      }
                      key={repertoire?.id}
                      onClick={() => selectedRepertoire(repertoire?.id)}
                    >
                      <Typography
                        variant="body2"
                        color="primary"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          textTransform: "initial",
                          fontWeight: "bold",
                        }}
                      >
                        {repertoire.libelle}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
          {open && (
            <Stack
              flexDirection="row"
              position="relative"
              alignItems="center"
              justifyContent="center"
            >
              <form
                style={{ display: "flex", alignItems: "center" }}
                onSubmit={handleSubmit}
              >
                <FormControl fullWidth>
                  <TextField
                    inputRef={textFieldRef}
                    name="libelle"
                    onChange={(e) => setLibelle(e.target.value)}
                    InputProps={{
                      style: { color: "#fff", paddingRight: 40 },
                    }}
                    color="secondary"
                  />
                </FormControl>
                <IconButton
                  ref={sendButtonRef}
                  color="primary"
                  type="submit"
                  sx={{ position: "absolute", minWidth: 4, right: 10 }}
                >
                  <Check />
                </IconButton>
              </form>
            </Stack>
          )}
        </Box>

        <IconButton
          ref={buttonRef}
          onClick={() => setOpen(true)}
          color="primary"
          sx={{ borderRadius: 1 }}
        >
          <Plus />
        </IconButton>
      </Stack>
      {openOption && (
        <PersonnalPopover
          open={openOption.open}
          anchorEl={openOption.anchor}
          setOpenOption={setOpenOption}
          selected={openOption.selected}
          deletedData={deletedData}
          editOpen={setEditOpen}
          editRef={editRef}
        />
      )}
      {responseInfo?.open && <SnackBarPerso response={responseInfo} />}
    </Stack>
  );
}

export default RepertoireList;
