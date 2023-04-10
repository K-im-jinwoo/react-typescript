import { Button } from "../../theme/daisyui"

export default function CopyMe() {
  return (
    <section className='mt-4'>
      <h2 className='text-5xl font-bold text-center'>CopyMe</h2>
      <div className='flex mt-4 justify-evenly'>
        <button className="btn btn-primary">daysiui button</button>
        <Button className="btn btn-primary">Button</Button>
      </div>
    </section>
  )
}