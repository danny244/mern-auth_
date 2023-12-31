import { Link } from "react-router-dom"

function Header() {
  return (
    <header className='bg-slate-200'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/sign-in">Sign in</Link>
        </ul>
      </div>
    </header>
  )
}
export default Header