import React, { useEffect, useState } from "react";
import "./userForm.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UserForm = () => {
  const [batches, setBatches] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    payment: 500,
    batch: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get("https://yoga-app-m7p5.onrender.com/get-batches").then((res) => {
        setBatches(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
      if(!handleAge())return;
      console.log("present here");
      e.preventDefault();
      axios
        .post("https://yoga-app-m7p5.onrender.com/user-details", details)
        .then((res) => {
          setMessage("Registered!");
          setDetails({
            name: "",
            email: "",
            phone: "",
            age: "",
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

  const handleAge = () => {
    if(details.age < 18 || details.age > 65){
      alert("Age should be between 18-65");
      setDetails(prevState => ({
        ...prevState,
        age: '',
      }))
      return false;
    }
    return true;
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
                required
              />
            </div>
            <div>
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={details.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number" 
                onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                placeholder="Enter phone"
                value={details.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>

            <div>
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number" 
                onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
                placeholder="Enter Age"
                value={details.age}
                onChange={(e) => handleChange("age", e.target.value)}
                required
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
                required
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
