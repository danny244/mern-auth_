import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

function Header() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <header className='bg-slate-200'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold">Auth App</h1>
        <ul className="flex gap-4">
          <Link to="/"><li>Home</li></Link>
          <Link to="/about"><li>About</li></Link>
          <Link to="/profile">
            {
              currentUser ? (
                <img src={currentUser.profilePicture} className='w-8 h-8 rounded-full object-cover' alt="profile" />
              ) : (
                <li>Sign in</li>
              )
            }
          </Link>
        </ul>
      </div>

    </header>
  )
}
export default Header