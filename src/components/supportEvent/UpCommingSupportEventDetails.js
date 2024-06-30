import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
import RichTextEditor from 'react-rte';
import { getFundraisRequestByEmail, changeStatusByEmail, updateFundraise } from "../../api";

const UserDetails = () => {
  const { email } = useParams();
  const [phoneNo, setPhoneNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(RichTextEditor.createEmptyValue());
  const [status, setStatus] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [fundraiseData, setFundraiseData] = useState(null);

  const handlegetFundraisRequestByEmail = async (email) => {
    try {
      const result = await getFundraisRequestByEmail(email);
      console.log(result);

      const [user] = result.data;
      setPhoneNo(user?.phoneNumber);
      setFullName(user?.fullName);
      setEmailId(user?.email);
      setCategory(user?.category);
      setSubCategory(user?.subCategory);
      setTitle(user?.title);
      setDescription(RichTextEditor.createValueFromString(user?.description || "", 'html'));
      setIsBlocked(user?.blocked);
      setStatus(user?.status);
      setFundraiseData(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e, field) => {
    const newValue = e.target.value;
    setFundraiseData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setFundraiseData((prevData) => ({
      ...prevData,
      description: value.toString('html'),
    }));
  };

  const handleUpdateFundraise = async () => {
    try {
      const updatedData = {
        ...fundraiseData,
        description: description.toString('html'),
      };
      const result = await updateFundraise(emailId, updatedData);
      console.log("Fundraise updated:", result);
      // Optionally, you can update the state or perform any other actions upon successful update
    } catch (error) {
      console.error("Error updating fundraiser:", error);
    }
  };

  useEffect(() => {
    handlegetFundraisRequestByEmail(email);
  }, [email]);

  return (
    <div className="card">
      <body id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content" className="bg-white">
              <nav
                className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
                style={{ height: "80px" }}
              >
                <ul className="navbar-nav text-black">
                  <h4
                    className="ml-2"
                    style={{
                      fontFamily: "Poppins",
                      fontSize: "30px",
                      fontWeight: "400",
                    }}
                  >
                    Fundrais Request Details
                  </h4>
                </ul>
              </nav>

              <div
                className="mt-5"
                style={{ marginRight: "200px", marginLeft: "100px" }}
              >
                <div className="row">
                  <div className="col-lg-12 mb-4 col-sm-12">
                    <div
                      className="table-container"
                      style={{ overflowX: "auto" }}
                    >
                      <form className="border rounded">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={fundraiseData?.email || ""}
                              onChange={(e) => handleChange(e, "email")}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              value={fundraiseData?.phoneNumber || ""}
                              onChange={(e) =>
                                handleChange(e, "phoneNumber")
                              }
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              value={fundraiseData?.fullName || ""}
                              onChange={(e) => handleChange(e, "fullName")}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Category</label>
                            <input
                              type="text"
                              className="form-control"
                              value={fundraiseData?.category || ""}
                              onChange={(e) => handleChange(e, "category")}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Sub Category</label>
                            <input
                              type="text"
                              className="form-control"
                              value={fundraiseData?.subCategory || ""}
                              onChange={(e) => handleChange(e, "subCategory")}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={fundraiseData?.title || ""}
                              onChange={(e) => handleChange(e, "title")}
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <label>Description</label>
                            <RichTextEditor
                              value={description}
                              onChange={handleDescriptionChange}
                              className="mt-5"
                              style={{ height: '400px' }}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Status</label>
                            <input
                              type="text"
                              className="form-control"
                              value={fundraiseData?.status || ""}
                              onChange={(e) => handleChange(e, "status")}
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <label>Change Status</label>
                            <div>
                              <button
                                type="button"
                                className="btn btn-success mr-2"
                                onClick={() =>
                                  handleUpdateFundraise("done")
                                }
                              >
                                Done
                              </button>
                              <button
                                type="button"
                                className="btn btn-warning ml-2"
                                onClick={() =>
                                  handleUpdateFundraise("pending")
                                }
                              >
                                Pending
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="sticky-footer fixed-bottom bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdateFundraise}
                  >
                    Update Fundraise
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </body>
    </div>
  );
};

export default UserDetails;
