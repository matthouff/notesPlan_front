import DefaultBox from "../../components/DefaultBox";
import GroupeNotes from "./components";
import { useState } from "react";
import RepertoireList from "../../components/RepertoireList";

function Notes() {
  const [repertoireSelected, setRepertoireSelected] = useState()

  return (
    <DefaultBox persoStyle={{ pt: 20, display: "flex", flexDirection: "row", gap: 5 }} dark>
      <RepertoireList actualRepertoire={repertoireSelected} setRepertoireSelected={setRepertoireSelected} />
      {repertoireSelected &&
        <GroupeNotes repertoireSelected={repertoireSelected} />
      }
    </DefaultBox>
  )
}

export default Notes;