import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";

export const Linkedin = () => {
  
  const queryParams = new URLSearchParams(window.location.search);

  const authcode = queryParams.get("code");
  console.log(authcode);

  const Form_data = {
    code: authcode,
  };

  const submit = async () => {
    const options = {
      method: "POST",
      url: "http://127.0.0.1:3006/authcode",
      data: Form_data,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <h1>Linkedin Login</h1>
      <div style={{ margin: "20px", textColor: "white" }}>
        <Button variant="contained">
          <a
            style={{ color: "white", textDecoration: "none" }}
            href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77qftgrc4v5tjo&redirect_uri=https://26e0-2402-3a80-8aa-7b07-54be-fdfe-a50e-d7bc.in.ngrok.io&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social"
          >
            Authcode
          </a>
        </Button>
      </div>
      <div style={{ margin: "20px" }}>
        <Button variant="contained" onClick={submit}>
          Access token
        </Button>
      </div>
    </>
  );
};
