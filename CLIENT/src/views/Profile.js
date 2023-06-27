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
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import API from "utils/API";
import UpdatePhoto from "components/Forms/UpdatePhoto";

const Profile = () => {
  const [values, setValues] = useState({});
  const [isEditPhotoOpen, setIsEditPhotoOpen] = useState(false);

  const toggleNewPhoto = () => setIsEditPhotoOpen(!isEditPhotoOpen);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProfile = async () => {
      try {
        const profile = await API.getUser(abortController);

        setValues(profile);
      } catch (err) {
        if (!DOMException) {
          console.log(err);
        }
      }
    };

    fetchProfile();

    return () => {
      abortController.abort();
    };
  }, []);

  console.log(values);

 

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="10">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="justify-content-center">
                  <h3 className="mb-0">My account</h3>
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={values.profile_picture}
                        />
                      </a>
                    </div>
                  </Col>
                  <Col className="text-right">
                    <Button
                      color="info"
                      href="#pablo"
                      onClick={toggleNewPhoto}
                    >
                      Edit photo
                    </Button>
                  </Col>
                  {isEditPhotoOpen && (
                    <Modal isOpen={isEditPhotoOpen} toggle={toggleNewPhoto}>
                      <Container className="m-4 align-self-center" fluid>
                        <ModalHeader toggle={toggleNewPhoto}>
                          Add New Photo
                        </ModalHeader>
                        {/* <CreateProject
                          toggle={toggleNewPhoto}
                          setProjects={setProjects}
                        /> */}
                        <UpdatePhoto toggle={toggleNewPhoto} pic={values.profile_picture} />
                      </Container>
                    </Modal>
                  )}
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={values.first_name}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={values.last_name}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={values.email}
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone-number"
                          >
                            Phone number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={values.phone}
                            id="input-phone-number"
                            placeholder="Phone number"
                            type="text"
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-user-authority"
                          >
                            User role
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={values.user_authority}
                            id="input-user_authority"
                            placeholder="User Authority"
                            type="text"
                            readOnly={true}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
