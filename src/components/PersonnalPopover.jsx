import { Box, Button, Popover } from "@mui/material";
import { Trash, Edit } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { PersoButton } from "./styledComponent/PersonnalButtonEdit";
import DeleteDialog from "./DeleteDialog";

PersonnalPopover.propTypes = {
  anchorEl: PropTypes.object,
  selected: PropTypes.object,
  open: PropTypes.bool,
  setOpenOption: PropTypes.func,
  deletedData: PropTypes.func,
  editOpen: PropTypes.func,
  editRef: PropTypes.object,
};

function PersonnalPopover({
  anchorEl,
  open,
  setOpenOption,
  selected,
  deletedData,
  editOpen,
  editRef,
}) {
  const [openModal, setOpenModal] = useState();

  const onDelete = () => {
    setOpenOption({ open: false, anchor: null });
    deletedData(selected.id);
    setOpenModal(false);
  };

  const eOpen = () => {
    setOpenOption({ open: false, anchor: null, selected: selected });
    editOpen(true);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={() => setOpenOption({ open: false, anchor: null })}
      className="custom-popover"
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <PersoButton onClick={eOpen} variant="contained" ref={editRef}>
          <Edit />
        </PersoButton>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="error"
          sx={{
            borderRadius: "100%",
            maxWidth: "35px",
            height: "35px",
            minWidth: "inherit",
            p: 1,
          }}
        >
          <Trash />
        </Button>
      </Box>
      {openModal && (
        <DeleteDialog
          open={open}
          selected={selected}
          setOpenModal={setOpenModal}
          onDelete={onDelete}
          title="supprimer le répertoire ?"
        />
      )}
    </Popover>
  );
}

export default PersonnalPopover;
