import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  Form,
  FormGroup,
  Input,
  ModalHeader,
  Label,
  ModalBody,
} from "reactstrap";
import { addMilestoneToDb } from "../Api";
import Timeline from "../components/TimelineComponent";
const TimelineScreen = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState("");

  const fileSelectedHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  console.log("isAuth", isAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    console.log(image.name);
    // const milestone = {
    //   "title": e.target[0].value,
    //   "description": e.target[1].value,
    //   "owner_id":userId,
    //   "file": formData,
    // };

    const milestone = new FormData();
    milestone.append("description", e.target[1].value);
    milestone.append("title", e.target[0].value);
    milestone.append("owner_id", userId);
    milestone.append("file", image, image.name);

    console.log("milestone", milestone);
    await addMilestoneToDb(milestone).then((res) => {
      console.log("success", res);
      setModalOpen(false);
    });
  };
  return (
    <div>
      <div className="ms-5">
        <h2 className="text-white ">Timeline screen</h2>
      </div>{" "}
      <Timeline />
      <div className="container">
        <Button
          className="btn btn-light"
          rounded
          onClick={() => setModalOpen(true)}
          style={{ borderRadius: "20px" }}
        >
          <h1>+</h1>
        </Button>
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
          <ModalHeader>Add Lifestone</ModalHeader>
          <ModalBody>
            <Form
              className="col-8 mx-auto"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <FormGroup>
                <Label type="text">Title</Label>
                <Input placeholder="Title" required />
              </FormGroup>
              <FormGroup>
                <Label type="text">Description</Label>
                <Input placeholder="Description" required />
                {/* <FormText>Please include the date at the beginning of the description</FormText> */}
              </FormGroup>
              <FormGroup>
                <Label type="text">Upload Image</Label>
                <br />
                <Input
                  className="file"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={fileSelectedHandler}
                />
              </FormGroup>
              <Input type="submit" value="Submit" />
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default TimelineScreen;