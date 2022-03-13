import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import gsap from "gsap";

const Register = ({ errorHandler }) => {
  const navigate = useNavigate();

  const initialFormData = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const formRefs = useRef([]);
  formRefs.current = [];

  const addToRefs = (e) => {
    if (e && !formRefs.current.includes(e)) formRefs.current.push(e);
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Send POST request with formData
  const handleSubmit = (e) => {
    e.preventDefault();

    const submitRegistration = async () => {
      const abortController = new AbortController();

      try {
        const response = await registerUser(formData, abortController.abort());
        setFormData(response);
        errorHandler("clearErrors");

        navigate("/dashboard");
      } catch (error) {
        error && errorHandler(error);
        // console.log(error);
      }
    };

    submitRegistration();
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
        <div className="col-9 col-xl-11 col-lg-11 col-md-11 col-sm-8">
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
        <form className="col-12 col-md-6" onSubmit={handleSubmit}>
          <div className="row">
            {/* first_name */}
            <div className="col-12 col-lg-6 mb-3" ref={addToRefs}>
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
            <div className="ccol-12 col-lg-6 mb-3" ref={addToRefs}>
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
          </div>

          <div className="row">
            {/* user_name */}
            <div className="col-12 col-lg-6 mb-3" ref={addToRefs}>
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
            <div className="col-12 col-lg-6 mb-3" ref={addToRefs}>
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
          </div>

          <div className="row">
            {/* password */}
            <div className="col-12 col-lg-6 mb-3" ref={addToRefs}>
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
            <div className="col-12 col-lg-6 mb-3" ref={addToRefs}>
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
          </div>

          <div className="row mx-0">
            <button
              type="submit"
              className="col-2 btn btn-primary btn-fixed-main"
              ref={addToRefs}
            >
              Submit
            </button>
            <div
              className="col-12 my-auto ms-auto text-end p-0"
              ref={addToRefs}
            >
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
