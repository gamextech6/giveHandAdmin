import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../comman/Sidebar";
import Header from "../comman/Header";
import { getRequestByEmail, changeStatusByEmail } from "../../api";

const UserDetails = ({ match }) => {
  const { email } = useParams();
  const [phoneNo, setphoneNo] = useState("");
  const [emailId, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [gender, setGender] = useState("");
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const handlegetRequestByEmail = async (email) => {
    try {
      const result = await getRequestByEmail(email);
      console.log(result);

      const [user] = result.data;
      setphoneNo(user?.phoneNumber);
      setfullName(user?.fullName);
      setEmail(user?.email);
      setmessage(user?.message);
      setIsBlocked(user?.blocked);
      setstatus(user?.status);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleStatus = async (email, status) => {
    try {
      const result = await changeStatusByEmail(email, status);
      setstatus(status);

    } catch (error) {
      console.error("Error toggling user block status:", error);
    }
  };

  useEffect(() => {
    handlegetRequestByEmail(email);
  }, []);

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
                    Call Back Request Details
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
                      <table
                        className="table text-center align-items-center rounded border "
                        style={{ padding: "2rem", paddingTop: "2rem" }}
                      >
                        <tbody>
                          <tr
                            className="align-items-center"
                            style={{ height: "70px" }}
                          >
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                              className="mt-4"
                            >
                              Phone Number{" "}
                            </td>
                            {phoneNo && (
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                +91 {phoneNo}
                              </td>
                            )}
                          </tr>

                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Full Name{" "}
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {fullName == null || undefined ? "-" : fullName}
                            </td>
                          </tr>

                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Email ID{" "}
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {gender == null || undefined ? "-" : email}
                            </td>
                          </tr>

                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Message
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {message == null || undefined ? "-" : message}
                            </td>
                          </tr>
                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Status
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              {status}
                            </td>
                          </tr>
                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Change Status
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              <button
                                type="button"
                                className={`btn btn-success mr-2`}
                                onClick={() => handleStatus(email, "done")}
                              >
                                Done
                              </button>
                              <button
                                type="button"
                                className={`btn btn-warning ml-2`}
                                onClick={() => handleStatus(email, "pending")}
                              >
                                Pending
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="sticky-footer fixed-bottom bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2023</span>
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
