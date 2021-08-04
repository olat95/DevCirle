import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.css";
import { signupAsync } from "../redux/action/signUpAction";
import style from "../styles/signup.module.css";

const SignUpComponent = () => {
  const dispatch = useDispatch();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gitHubLink: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleFormChanges = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  // const validateCP = () => {
  //   if (signupData.password === signupData.confirmPassword) {
  //     return {
  //       isMatch: true,
  //       cPassword: "match",
  //     };
  //   }
  //   return {
  //     isMatch: false,
  //     cPassword: "Password does not match",
  //   };
  // };

  const validateInfo = (values) => {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.gitHubLink) {
      errors.gitHubLink = "Link to GitHub is required";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password needs to be 6 characters or more";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.password = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setErrors(validateInfo(signupData));

    // const passwordMatch = validateCP();
    // if (!passwordMatch.isMatch) {
    //   return setError({
    //     ...error,
    //     passwordMatch,
    //   });
    // }

    //call signup action
    //dispatch(signupAsync(signupData));
  };
  // useSelector((state) => console.log(state.signup));
  // console.log(error);
  return (
    <section className={style.section}>
      <div
        className={`${style.form} ${
          Object.entries(errors).length ? style.lform : ""
        }`}
      >
        <form onSubmit={handleSubmit} error={errors}>
          <h1 className={style.formTitle}>Sign Up</h1>
          <div>
            <input
              className={style.formInput}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={signupData.firstname}
              onChange={handleFormChanges}
            />
          </div>
          {errors.firstName && <span>{errors.firstName}</span>}
          <div>
            <input
              className={style.formInput}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={signupData.lastname}
              onChange={handleFormChanges}
            />
          </div>
          {errors.lastName && <span>{errors.lastName}</span>}
          <div>
            <input
              className={style.formInput}
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleFormChanges}
            />
          </div>
          {errors.email && <span>{errors.email}</span>}
          <div>
            <input
              className={style.formInput}
              type="text"
              name="gitHubLink"
              placeholder="GitHub Link"
              value={signupData.githubLink}
              onChange={handleFormChanges}
            />
          </div>
          {errors.gitHubLink && <span>{errors.gitHubLink}</span>}
          <div onChange={handleFormChanges}>
            Gender
            <br />
            <select name="gender">
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {errors.gender && <span>{errors.gender}</span>}
          <div>
            <input
              className={style.formInput}
              type="password"
              placeholder="Password"
              name="password"
              value={signupData.password}
              onChange={handleFormChanges}
            />
          </div>
          {errors.password && <span>{errors.password}</span>}
          <div>
            <input
              className={style.formInput}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleFormChanges}
            />
          </div>
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          <button type="submit" className={style.formButton}>
            Submit
          </button>
          <h4>
            Already have an account? <a href="">Log In</a>
          </h4>
        </form>
      </div>
    </section>
  );
};

export default SignUpComponent;
