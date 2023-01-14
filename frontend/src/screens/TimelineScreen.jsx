import React, { useState, useEffect } from "react";
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
import Web3 from "web3";
import { loadContract } from "../utils/load-contracts";
import detectEthereumProvider from "@metamask/detect-provider";

const TimelineScreen = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);
  const [contractFaucet, setContractFaucet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchContracts = async () => {

        const provider = await detectEthereumProvider();

        if (provider) {

        const result = await loadContract("Faucet", provider);
        setContractFaucet(result);

        }
    }
    fetchContracts();
  }, [])

  const fileSelectedHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  console.log("isAuth", isAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const milestone = new FormData();
    milestone.append("description", e.target[1].value);
    milestone.append("title", e.target[0].value);
    milestone.append("owner_id", userId);

    console.log("milestone", milestone);

      // add funds to the company
      const blockHash = await contractFaucet.addFunds({
        from: userId,
        value: Web3.utils.toWei("0.3", "ether")
    });

    console.log("BLock hash: ", blockHash.tx)

    milestone.append("txn_id", blockHash.tx);
    milestone.append("file", image, image.name);

    await addMilestoneToDb(milestone).then(async (res) => {
      console.log("success", res);
      setModalOpen(false);

    });
    window.location.reload();
  };

  return (
    <div>
      <div className="ms-5">
        <h2 className="text-white ">Timeline screen</h2>
      </div>{" "}
      <Timeline />
      <div className="container parent-element">
        <Button
          className="btn btn-light text-white float-end"
          rounded
          onClick={() => setModalOpen(true)}
          style={{
            borderRadius: "50%",
            backgroundColor: "#343434",
            borderColor: "#343434",
            width: "50px",
            height: "50px",
            right: "20px",
            bottom: "20px",
          }}
        >
          <h3>+</h3>
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