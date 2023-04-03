export default function Bootstrap() {
  return (
  <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="Form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="Form-label">Password</label>
    <input type="password" className="Form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 htmlForm-check">
    <input type="checkbox" className="Form-check-input" id="exampleCheck1"/>
    <label className="htmlForm-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>)
}