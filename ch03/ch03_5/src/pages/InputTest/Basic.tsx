import { Input } from "../../theme/daisyui"

export default function Basic() {
  return (
    <section className='mt-4'>
      <h2 className='text-5xl font-bold text-center'>Basic</h2>
      <div className='mt-4 justify-evenly'>
        <input className="input input-primary" />
        <Input className="input-primary"></Input>
      </div>
    </section>
  )
}