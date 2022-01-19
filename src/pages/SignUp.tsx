import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp, FieldValue } from "firebase/firestore";
import { ReactComponent as ArrowRight } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import toast from "react-hot-toast";
import OAuth from "../components/OAuth";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });

        const formDataCopy: {
          name: string;
          password?: string;
          timestamp?: FieldValue;
        } = { ...formData };
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db, "users", user.uid), formDataCopy);

        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Welcome back!</p>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter your name!"
          className="nameInput"
          id="name"
          value={name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Enter your email!"
          className="emailInput"
          id="email"
          value={email}
          onChange={onChange}
        />
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Create a password"
            id="password"
            value={password}
            onChange={onChange}
          />
          <img
            src={visibilityIcon}
            alt="Show Password"
            className="showPassword"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot Password
        </Link>
        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton">
            <ArrowRight fill="#fff" width="34px" height="34px" />
          </button>
        </div>
      </form>
      <OAuth />
      <Link to="/sign-in" className="registerLink">
        Sign In Instead
      </Link>
    </div>
  );
};

export default SignUp;
