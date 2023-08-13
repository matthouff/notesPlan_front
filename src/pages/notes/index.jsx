import DefaultBox from "../../components/DefaultBox";
import GroupeNotes from "./components";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";
import useEntityCrud from "../../hooks/useEntityCrud";
import useUser from "../../hooks/useUser";

function Notes() {
  const [repertoireSelected, setRepertoireSelected] = useState();
  const { userId } = useUser();

  const { data, createdData, deletedData, editData } = useEntityCrud({
    entity: "repertoires_notes",
    complement: "user",
    id: userId,
    enabled: !!userId
  });

  return (
    <DefaultBox
      persoStyle={{ pt: 20, display: "flex", flexDirection: "row", gap: 5 }}
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
    </DefaultBox>
  );
}

export default Notes;
