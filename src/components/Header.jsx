import { Button } from "@rewind-ui/core";
export default function Header({mail, signOut}) {
  return (
    <div className="mb-4 flex justify-between">
    <h3>Hello {mail}</h3>
    <Button color="purple"shadow="base" radius="lg" onClick={signOut}>Sing Out</Button>
  </div>
  )
}
