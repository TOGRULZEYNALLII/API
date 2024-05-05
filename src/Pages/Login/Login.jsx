import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://ismayilli1.beget.tech/api/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response?.data?.data?.token);
      navigate("/home ");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
}

export default Login;
