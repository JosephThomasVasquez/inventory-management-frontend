import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../utils/api";
import gsap from "gsap";

const Login = ({ errorHandler }) => {
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location);

  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const formRefs = useRef([]);
  formRefs.current = [];

  const addToRefs = (e) => {
    if (e && !formRefs.current.includes(e)) formRefs.current.push(e);
  };

  useEffect(() => {
    gsap.fromTo(
      formRefs.current,
      {
        opacity: 0,
        x: -100,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(2.5)",
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(2.5)",
      }
    );
  }, []);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitLogin = async () => {
      const abortController = new AbortController();

      try {
        const response = await loginUser(formData, abortController.abort());
        setFormData(response);
        errorHandler("clearErrors");

        navigate("/dashboard");
      } catch (error) {
        error && errorHandler(error);
        console.log(error);
      }
    };

    submitLogin();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-11">
          <h2>Login</h2>
        </div>

        <div className="col-1 button-back">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleGoBack}
          >
            Back
          </button>
        </div>
      </div>

      <div className="row">
        <form className="col-6" onSubmit={handleSubmit}>
          {/* email */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* password */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              aria-describedby="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="row mx-0">
            <button
              type="submit"
              className="col-2 btn btn-primary"
              ref={addToRefs}
            >
              Submit
            </button>

            <div className="col-5 my-auto ms-auto text-end p-0" ref={addToRefs}>
              Need an account?
              <span
                className="text-primary fw-bold"
                onClick={() => navigate("/register")}
              >
                {" "}
                <a
                  href="/register"
                  className="text-primary fw-bold text-decoration-none"
                >
                  Register Here
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
