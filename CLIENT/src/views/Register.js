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

// reactstrap components
import useForm from "../components/Forms/useForm";
import registerValidation from "../utils/formValidation/registerValidation";
import parsePhoneNumber from "libphonenumber-js";
import API from "utils/API";
import { Link } from "react-router-dom";

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

const Register = (props) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    initialValues,
    registerValidation
  );

  function submit() {
    let dbPhone = parsePhoneNumber(values.phone, "PL").number;
    values.phone = dbPhone;

    //user authority defaults to developer
    API.register({
      ...values,
      userAuth: "developer",
      photo:
        "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3514977/dog-logo-mascot-clipart-md.png",
    });
    props.navigate("/login");
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <h2 className="text-muted text-center mt-2 mb-2">Sign up</h2>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="firstName"
                        placeholder="First Name"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.firstName && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.firstName}
                      </div>
                    )}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.lastName && (
                      <div style={{ fontSize: 12, color: "red" }}>
                        {errors.lastName}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="phone"
                    placeholder="Phone Number"
                    name="phone"
                    type="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.phone && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.phone}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.email && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.email}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.password && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.password}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                </InputGroup>
                {errors.confirmPassword && (
                  <div style={{ fontSize: 12, color: "red" }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </FormGroup>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-center">
            <Link to="/auth/login">
              <small>Sign in</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
