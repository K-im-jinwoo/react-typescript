import { Button } from "../../theme/daisyui"

export default function CopyMe() {
  return (
    <section className="mt-4">
      <h2 className="text-5xl font-bold text-center">CopyMe</h2>
      <div className="flex mt-4 justify-evenly">
        <Button className="btn-lg btn-primary">btn-lg</Button>
        <Button className="btn-md btn-secondary">btn-md</Button>
        <Button className="btn-sm btn-accent">btn-sm</Button>
        <Button className="btn-xs btn-info">btn-xs</Button>
      </div>
    </section>
  );
}