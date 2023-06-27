import { useState } from "react";
import { Button, Container, Row, Form } from "reactstrap";
import moment from "moment";
import API from "utils/API";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const UpdatePhoto = (props) => {
  const [file, setFile] = useState(null);
  const [clicked, setClicked] = useState(false);

  async function submit(event) {
    event.preventDefault();

    setClicked(true);

    if (file) {
      try {
        const storageRef = ref(
          storage,
          `Images/${moment(Date.now()).format("YY-MM-DD HH:mm:ss")}`
        );

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            console.log("downloadURL: " + downloadURL);
            try {
              await API.updatePic({pic: downloadURL});
            } catch (err) {
              console.log(err);
            }

            setClicked(false);
          });
        });
      } catch (err) {
        console.log(err);
      }
    }

    setFile(null);
    props.toggle();
  }

  return (
    <Container style={{ width: "250px", height: "350px" }} fluid>
      <Form onSubmit={submit}>
        <Row>
          <label htmlFor="add">
            <div className="imgContainer">
              <img
                src={file ? URL.createObjectURL(file) : props.pic}
                alt=""
                style={{ width: "80%", height: "80%" }}
              />
              <i className="ni ni-cloud-upload-96" style={{ zIndex: 2 }}></i>
            </div>
          </label>
          <input
            type="file"
            id="add"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* <div className="card-profile-image">
            <img
              alt="..."
              // className="rounded-circle"
              style={{ width: "200px", height: "240px", objectFit: "cover" }}
              src={require("../../assets/img/theme/team-4-800x800.jpg")}
            />
          </div> */}
        </Row>
        {!file && clicked && <p>Please upload a picture</p>}
        <Button className="fixed-bottom" color="success" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default UpdatePhoto;
