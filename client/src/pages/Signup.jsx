import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  //created a state to store all our input values
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // so here what we are doing is we are keeping the previous inserted value and then inserting a new one
    // we used [e.target.id] here because we are using our id as the name of our inputs so we can know which is which
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // console.log(formData);

  // had to configure vite config for it to work
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //converting response to json
      const data = await res.json();
      console.log(data);
      setLoading(false);
      setError(false);

      if (data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }

      setError(false);

      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="max-w-lg h-fit mx-auto mt-[20rem] p-3">
      <h1 className="text-3xl font-bold text-center my-7">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link>
          <span className="text-blue-500">sign in</span>
        </Link>
      </div>
      <p className="text-red-700">{error && "something went wrong"}</p>
    </div>
  );
}
export default Signup;
