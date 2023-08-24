import DefaultBox from "../../components/DefaultBox";
import GroupeNotes from "./components";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import SnackBarPerso from "../../components/SnackbarPerso";

function Notes() {
  const [repertoireSelected, setRepertoireSelected] = useState(null);

  const { data, createdData, deletedData, editData, error } = useEntityCrud({
    entity: "repertoires_notes",
  });

  return (
    <DefaultBox
      persoStyle={{ display: "flex", flexDirection: "row", gap: 5 }}
      dark
    >
      <RepertoireList
        title={"Notes"}
        repertoires={data}
        actualRepertoire={repertoireSelected}
        setRepertoireSelected={setRepertoireSelected}
        createdData={createdData}
        deletedData={deletedData}
        editData={editData}
      />
      {data && <GroupeNotes repertoireSelected={repertoireSelected} />}

      {!!error &&
        <SnackBarPerso error={error} />
      }
    </DefaultBox>
  );
}

export default Notes;
