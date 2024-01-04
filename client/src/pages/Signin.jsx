import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function Signin() {
  //created a state to store all our input values
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //converting response to json
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="max-w-lg h-fit mx-auto mt-[20rem] p-3">
      <h1 className="text-3xl font-bold text-center my-7">Sign in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "loading..." : "Sign in"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="sigh-up">
          <span className="text-blue-500">sign up</span>
        </Link>
      </div>
      <p className="text-red-700">
        {error ? error.message || "something went wrong" : ""}
      </p>
    </div>
  );
}

export default Signin;
