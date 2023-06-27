/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import useForm from "components/Forms/useForm";
import validate from "utils/formValidation/loginValidation";
import API from "utils/API";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

const Login = (props) => {
  const initialLoginValues = {
    email: "",
    password: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialLoginValues,
    validate
  );

  const { setValues } = useContext(AuthContext);

  async function submit() {
    const response = await API.login(values);

    if (response.ok) {
      // const { token, auth } = await response.json();
      const { token, auth } = await response.json();

      localStorage.setItem("token", token);
      localStorage.setItem("auth", auth);

      props.setAuthLevel(auth);
      props.setAuth(true);

      // set expiration timer
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 15);
      localStorage.setItem("expiration", expiration.toISOString());

      if (auth === "admin") {
        props.navigate("/admin");
      } else if (auth === "developer" || auth === "project manager") {
        console.log("here");
        props.navigate("/index");
      }

      values.email = "";
      values.password = "";

      const { first_name, last_name, profile_picture } = await API.getUser();
      setValues(first_name, last_name, profile_picture);
    } else {
      alert("Invalid login");
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <h2 className="text-muted text-center mt-2 mb-2">Sign in</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    autoComplete="new-email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      {errors.title}
                    </div>
                  )}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div style={{ fontSize: 12, color: "red" }}>
                      {errors.title}
                    </div>
                  )}
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="/auth/register">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
