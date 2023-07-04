import useEntityCrud from "../../hooks/useEntityCrud";
import DefaultBox from "../../components/DefaultBox";
import GroupeNotes from "./components/notes";
import ListRepertoireNote from "./components/ListRepertoireNote";
import { useState } from "react";

function Notes() {
  const [repertoireSelected, setRepertoireSelected] = useState()

  const { data: repertoires } = useEntityCrud({
    entity: "repertoires_notes",
    createdData: ""
  })

  console.log(repertoireSelected);

  return (
    <DefaultBox persoStyle={{ pt: 20, display: "flex", flexDirection: "row", gap: 5 }} dark>
      <ListRepertoireNote data={repertoires} actualRepertoire={repertoireSelected} setRepertoireSelected={setRepertoireSelected} />
      {repertoires &&
        <GroupeNotes repertoireSelected={repertoireSelected} />
      }
    </DefaultBox>
  )
}

export default Notes;