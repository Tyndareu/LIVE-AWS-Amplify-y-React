
import { Button } from "@aws-amplify/ui-react";
export default function Header({mail, signOut}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
    <h3>Hello {mail}</h3>
    <Button onClick={signOut}>Sing Out</Button>
  </div>
  )
}
