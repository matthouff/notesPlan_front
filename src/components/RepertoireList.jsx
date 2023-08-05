import {
  Box,
  FormControl,
  IconButton,
  Stack,
  TextField,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PersonnalToggle from "./PersoToggle";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Plus, Check, MoreVertical } from "lucide-react";
import useUser from "../hooks/useUser";
import { useMutation, useQueryClient } from "react-query";
import "../components/style.css";
import PersonnalPopover from "./PersonnalPopover";

RepertoireList.propTypes = {
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
}) {
  const textFieldRef = useRef(null);
  const textFieldEditRef = useRef(null);
  const buttonRef = useRef(null);
  const sendButtonRef = useRef(null);
  const editRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [libelle, setLibelle] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const { userId } = useUser();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(editOpen ? editData : createdData, {
    onSuccess: () => {
      // Mettre à jour la liste des répertoires après la création d'un nouvel élément
      setRepertoireSelected();
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
    if (repertoires) {
      setRepertoireSelected(repertoires[0]?.id);
    }
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
  }, [repertoires, setRepertoireSelected, open, editOpen]);

  const selectedRepertoire = (x) => {
    if (x !== null) {
      setRepertoireSelected(x);
    }
  };

  const handleChange = (event) => {
    setLibelle(event.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    mutate({ id: openOption?.selected?.id, libelle: libelle });
    setEditOpen(false);
    setLibelle(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ userId: userId, libelle: libelle });
    setOpen(false);
    setLibelle(null);
  };

  return (
    <Stack gap={10} width={repertoires ? "20%" : "100%"}>
      <Typography variant="h1" fontWeight="bold" color="primary" fontSize={70}>
        Notes
      </Typography>
      <Stack
        sx={
          !repertoires && { width: "20%", textAlign: "center", marginX: "auto" }
        }
        gap={1}
      >
        <Typography variant="h6" color="primary">
          Repertoires
        </Typography>
        <Box border="1px solid #fffb" borderLeft="none" height="100%">
          <ToggleButtonGroup
            color="secondary"
            value={actualRepertoire}
            exclusive
            onChange={(e, x) => selectedRepertoire(x)}
            aria-label="text Repertoire"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {repertoires &&
              repertoires
                ?.sort(
                  (a, b) =>
                    new Date(a.createdat).getTime() -
                    new Date(b.createdat).getTime()
                )
                .map((repertoire, index) => {
                  return editOpen &&
                    repertoire?.id === openOption?.selected?.id ? (
                    <Stack
                      key={repertoire.id}
                      Stack
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
                            onChange={handleChange}
                            InputProps={{
                              style: { color: "#fff", paddingRight: 40 },
                            }}
                            fullWidth
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
                    <PersonnalToggle
                      sx={{
                        ...index < repertoires.length - 1 && {
                          borderBottom: "1px solid #fffb",
                        },
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                      key={repertoire?.id}
                      value={repertoire?.id}
                      aria-label="left aligned"
                    >
                      <Typography variant="body2" sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}>
                        {repertoire.libelle}
                      </Typography>
                      <MoreVertical onClick={(e) =>
                        setOpenOption({
                          open: true,
                          anchor: e.currentTarget,
                          selected: repertoire,
                        })}
                        style={{ stroke: "#fff" }}
                        height={17}
                        width={17}
                      />
                    </PersonnalToggle>
                  );
                })}
          </ToggleButtonGroup>
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
                    onChange={handleChange}
                    InputProps={{
                      style: { color: "#fff", paddingRight: 40 },
                    }}
                    fullWidth
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
    </Stack>
  );
}

export default RepertoireList;
