import { Box, Button, FormControl, Stack, TextField, ToggleButtonGroup, Typography } from "@mui/material";
import PersonnalToggle from "./PersoToggle";
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import { Plus, Check, MoreVertical } from "lucide-react";
import useUser from "../hooks/useUser";
import { useMutation, useQueryClient } from "react-query";
import "../components/style.css"
import PersonnalPopover from "./PersonnalPopover";

RepertoireList.propTypes = {
  repertoires: PropTypes.array,
  setRepertoireSelected: PropTypes.func,
  actualRepertoire: PropTypes.string,
  createdData: PropTypes.func,
  deletedData: PropTypes.func,
  editData: PropTypes.func,
}

function RepertoireList({ setRepertoireSelected, actualRepertoire, repertoires, deletedData, editData, createdData }) {
  const textFieldRef = useRef(null);
  const textFieldEditRef = useRef(null);
  const buttonRef = useRef(null);
  const sendButtonRef = useRef(null);
  const [open, setOpen] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [libelle, setLibelle] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const { userId } = useUser();




  const queryClient = useQueryClient();
  const { mutate } = useMutation(editOpen ? editData : createdData, {
    onSuccess: () => {
      // Mettre à jour la liste des répertoires après la création d'un nouvel élément
      setRepertoireSelected()
      queryClient.invalidateQueries("repertoires_notes");
    },
  });


  const handleClickOutside = (event) => {
    if (
      textFieldRef.current && !textFieldRef.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target) &&
      sendButtonRef.current && !sendButtonRef.current.contains(event.target)
    ) {
      setEditOpen(false)
      setOpen(false);
    }
  };

  useEffect(() => {
    if (repertoires) {
      setRepertoireSelected(repertoires[0]?.id)
    }
    if (open) {
      textFieldRef.current.focus();
    }
    if (editOpen) {
      textFieldEditRef.current.focus();
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [repertoires, setRepertoireSelected, open, editOpen])

  const selectedRepertoire = (x) => {
    if (x !== null) {
      setRepertoireSelected(x);
    }
  }



  const handleChange = (event) => {
    setLibelle(event.target.value);
  };



  const handleEditSubmit = (e) => {
    e.preventDefault();

    mutate({ id: openOption?.selected?.id, re_libelle: libelle });
    setEditOpen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ id_user: userId, re_libelle: libelle });
    setOpen(false)
  }

  console.log(libelle);

  return (
    <Stack gap={10} width={repertoires ? "20%" : "100%"}>
      <Typography variant="h1" fontWeight="bold" color="primary" fontSize={70}>Notes</Typography>
      <Stack sx={!repertoires && { width: "20%", textAlign: "center", marginX: "auto" }} gap={1}>
        <Typography variant="h6" color="primary">Repertoires</Typography>
        <Box border="1px solid #fffb" borderLeft="none" height="100%">
          <ToggleButtonGroup
            color="secondary"
            value={actualRepertoire}
            exclusive
            onChange={(e, x) => selectedRepertoire(x)}
            aria-label="text Repertoire"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {repertoires?.sort((a, b) => new Date(a.createdat).getTime() - new Date(b.createdat).getTime()).map((repertoire, index) => {
              return (
                editOpen && repertoire?.id === openOption?.selected?.id ?
                  <Stack Stack flexDirection="row" position="relative" alignItems="center" justifyContent="center" >
                    <form style={{ display: "flex", alignItems: "center" }} onSubmit={handleEditSubmit}>
                      <FormControl fullWidth>
                        <TextField
                          inputRef={textFieldEditRef}
                          name="re_libelle"
                          value={libelle ?? openOption?.selected?.re_libelle}
                          onChange={handleChange}
                          InputProps={{
                            style: { color: '#fff', paddingRight: 40 }
                          }}
                          fullWidth
                          color="secondary"

                        />
                      </FormControl>
                      <Button ref={sendButtonRef} type="submit" sx={{ position: "absolute", minWidth: 4, right: 10 }}>
                        <Check />
                      </Button>
                    </form>
                  </Stack>
                  :
                  <PersonnalToggle sx={index < repertoires.length - 1 && { borderBottom: "1px solid #fffb" }} key={repertoire?.id} value={repertoire?.id} aria-label="left aligned">
                    {repertoire.re_libelle}

                    <Button onClick={(e) => setOpenOption({ open: true, anchor: e.currentTarget, selected: repertoire })} sx={{ position: "absolute", right: 10, minWidth: 4 }}>
                      <MoreVertical width={20} />
                    </Button>
                  </PersonnalToggle>
              )
            })}
          </ToggleButtonGroup>
          {open &&
            <Stack flexDirection="row" position="relative" alignItems="center" justifyContent="center">
              <form style={{ display: "flex", alignItems: "center" }} onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <TextField
                    inputRef={textFieldRef}
                    name="re_libelle"
                    onChange={handleChange}
                    InputProps={{
                      style: { color: '#fff', paddingRight: 40 }
                    }}
                    fullWidth
                    color="secondary"

                  />
                </FormControl>
                <Button ref={sendButtonRef} type="submit" sx={{ position: "absolute", minWidth: 4, right: 10 }}>
                  <Check />
                </Button>
              </form>
            </Stack>
          }
        </Box >

        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </Stack >
      {
        openOption &&
        <PersonnalPopover open={openOption.open} anchorEl={openOption.anchor} setOpenOption={setOpenOption} selected={openOption.selected} deletedData={deletedData} editOpen={setEditOpen} />
      }
    </Stack >
  )
}

export default RepertoireList;

