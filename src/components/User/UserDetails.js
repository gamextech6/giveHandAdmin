import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../comman/Sidebar';
import Header from '../comman/Header';
import { getUserByEmail, blockUser, unblockUser } from "../../api";

const UserDetails = () => {
  const { email } = useParams();
  const [userData, setUserData] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleGetUserByEmail = async (email) => {
    try {
      const result = await getUserByEmail(email);
      console.log(result);
  
      const user = result.data[0]; // Accessing the first user object from the array
      setUserData(user);
      setIsBlocked(user?.blocked);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };  

  const handleToggleBlockUser = async () => {
    try {
      if (isBlocked) {
        await unblockUser(userData.phoneNumber);
      } else {
        await blockUser(userData.phoneNumber);
      }
      setIsBlocked(!isBlocked);
    } catch (error) {
      console.error("Error toggling user block status:", error);
    }
  };

  useEffect(() => {
    handleGetUserByEmail(email);
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
                    User Details
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
                          {userData && Object.entries(userData).map(([key, value]) => (
                            <tr key={key} style={{ height: "70px" }}>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                                className="mt-4"
                              >
                                {key}
                              </td>
                              <td
                                style={{
                                  padding: "1.5rem",
                                  paddingTop: "1.5rem",
                                }}
                              >
                                {value}
                              </td>
                            </tr>
                          ))}
                          <tr style={{ height: "70px" }}>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              Block / Unblock
                            </td>
                            <td
                              style={{
                                padding: "1.5rem",
                                paddingTop: "1.5rem",
                              }}
                            >
                              <button
                                type="button"
                                className={`btn ${isBlocked ? "btn-success" : "btn-danger"
                                  }`}
                                onClick={handleToggleBlockUser}
                              >
                                {isBlocked ? "Unblock" : "Block"}
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
