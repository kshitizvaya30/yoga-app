import React, { useEffect, useState } from "react";
import "./userForm.css";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

const UserForm = () => {
  const [batches, setBatches] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    payment: 500,
    batch: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/get-batches").then((res) => {
      setBatches(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/user-details", details)
      .then((res) => {
        setMessage("Registered!");
        setDetails({
          name: "",
          email: "",
          phone: "",
          payment: 500,
          batch: "",
        });
      })
      .catch((err) => {
        setMessage(err.response.data);
      });
  };

  const handleChange = (key, val) => {
    setDetails((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  return (
    <>
      <div className="form-container">
        <div className="heading">Enter Details</div>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <div>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={details.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={details.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={details.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div>
              <Form.Label>Payment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Payment"
                value={details.payment}
                disabled
              />
            </div>

            <div>
              <Form.Label>Batches</Form.Label>
              <Form.Select
                aria-label="Default select example"
                defaultValue={details.batch}
                onChange={(e) => handleChange("batch", e.target.value)}
              >
                <option value="" disabled>
                  Select
                </option>
                {batches.map((batch) => {
                  return (
                    <option key={batch._id} value={batch._id}>
                      {batch.timings}
                    </option>
                  );
                })}
              </Form.Select>
            </div>

            <Button type="submit">Submit</Button>
          </Form.Group>
        </Form>
        {message}
      </div>
    </>
  );
};

export default UserForm;
