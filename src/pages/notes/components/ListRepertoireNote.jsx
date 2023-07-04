import { Button, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import RepertoireList from "../../../components/RepertoireList";

ListRepertoireNote.propTypes = {
  data: PropTypes.array,
  actualRepertoire: PropTypes.string,
  setRepertoireSelected: PropTypes.func,
};

function ListRepertoireNote({ data, actualRepertoire, setRepertoireSelected }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (data) {
      setRepertoireSelected(data[0]?.id)
    }
  }, [data, setRepertoireSelected])

  const selectedRepertoire = (x) => {
    if (x !== null) {
      setRepertoireSelected(x);
    }
  }
  return (
    <Stack gap={10} width={data ? "20%" : "100%"}>
      <Typography variant="h1" fontWeight="bold" color="primary" fontSize={70}>Notes</Typography>
      <Stack sx={!data && { width: "20%", textAlign: "center", marginX: "auto" }} gap={1}>
        <Typography variant="h6" color="primary">Repertoires</Typography>
        <RepertoireList repertoireSelected={(e, x) => selectedRepertoire(x)} actualRepertoire={actualRepertoire} data={data} open={open} />
        <Button onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </Stack>
    </Stack>
  )
}

export default ListRepertoireNote;