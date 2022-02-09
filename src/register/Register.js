import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

const Register = () => {
  const navigate = useNavigate();

  const initialFormData = {
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    email: "",
    token: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const formRefs = useRef([]);
  formRefs.current = [];

  const addToRefs = (e) => {
    if (e && !formRefs.current.includes(e)) formRefs.current.push(e);
  };

  const handleChange = ({ target }) => {
    console.log("target:", target);

    setFormData({ ...formData, [target.name]: target.value });
  };

  // Send POST request with formData
  const handleSubmit = (e) => {
    e.preventDefault();

    const submitRegistration = () => {
      const abortController = new AbortController();

      try {
      } catch (error) {
        console.log(error);
      }
    };
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

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row my-auto">
        <div className="col-11">
          <h2>Register</h2>
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
          {/* first_name */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              id="first_name"
              aria-describedby="first_name"
              placeholder="Enter First Name"
              onChange={handleChange}
            />
          </div>

          {/* last_name */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              id="last_name"
              aria-describedby="last_name"
              placeholder="Enter Last Name"
              onChange={handleChange}
            />
          </div>

          {/* user_name */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="user_name" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="user_name"
              id="user_name"
              aria-describedby="user_name"
              placeholder="Enter Username"
              onChange={handleChange}
            />
          </div>

          {/* email */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              aria-describedby="email"
              placeholder="Enter email"
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
              onChange={handleChange}
            />
          </div>

          {/* confirm password */}
          <div className="mb-3" ref={addToRefs}>
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              id="confirm_password"
              aria-describedby="confirm_password"
              placeholder="Enter Confirm Password"
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
            <div className="col-5 my-auto ms-auto" ref={addToRefs}>
              Already registered?
              <span
                className="text-primary fw-bold"
                onClick={() => navigate("/login")}
              >
                {" "}
                <a
                  href="/login"
                  className="text-primary fw-bold text-decoration-none"
                >
                  Login Here
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
