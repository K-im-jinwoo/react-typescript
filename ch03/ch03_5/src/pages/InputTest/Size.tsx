import { Input } from "../../theme/daisyui"

export default function Size() {
  return (
    <section className="mt-4">
      <h2 className="text-3xl font-bold text-center">Size</h2>
      <div className="flex p-4 mt-4 justify-evenly">
        <div>
          <label htmlFor="" className="label"></label>
          <Input className="input-primary input-lg"></Input>
        </div>
        <div>
          <label htmlFor="" className="label"></label>
          <Input className="input-secondary input-md"></Input>
        </div>
        <div>
          <label htmlFor="" className="label"></label>
          <Input className="input-accent input-sm"></Input>
        </div>
        <div>
          <label htmlFor="" className="label"></label>
          <Input className="input-info input-xs"></Input>
        </div>
      </div>
    </section>
  );
}