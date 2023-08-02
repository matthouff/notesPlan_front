import { IconButton, Paper, Stack, Typography } from "@mui/material";
import Tache from "./tache";
import PropTypes from "prop-types";
import useEntityCrud from "../../../hooks/useEntityCrud";
import { Plus } from "lucide-react";

Groupe.propTypes = {
  repertoireSelected: PropTypes.string,
};

function Groupe({ repertoireSelected }) {

  const { data } = useEntityCrud({
    entity: "groupes",
    complement: "repertoire_groupe",
    id: repertoireSelected,
    enabled: !!repertoireSelected
  });

  console.log(data);

  return (
    <Stack flexDirection="row" gap={3} sx={{ overflowX: "scroll", boxSizing: "border-box", width: "100%", paddingBottom: 3 }}>
      {data && data?.map(groupe => {
        return (
          <Stack
            key={groupe.id}
            height="100%"
            sx={{ minWidth: "300px" }}
          >
            <Typography color="primary" fontWeight="bold">{groupe.libelle}</Typography>
            <Paper
              elevation={3}
              style={{ padding: 15, maxWidth: "300px", height: "100%", backgroundColor: "#fff4", display: "flex", flexDirection: "column" }}
            >
              <Stack sx={{ overflowY: "auto", borderBottom: "1px solid #fff", pb: 1 }} gap={2}>
                {
                  groupe.taches.map(tache => {
                    console.log(tache);
                    return (
                      <Tache key={tache.id} tache={tache} />
                    )
                  })
                }
              </Stack>
              <IconButton
                color="primary"
                sx={{ borderRadius: 1, boxShadow: `0px -10px 20px -13px rgba(0, 0, 0, 1)` }}
              >
                <Plus />
              </IconButton>
            </Paper>
          </Stack >
        )
      })

      }
    </Stack >
  );
}

export default Groupe;