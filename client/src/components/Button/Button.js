import React from "react";
import "./Button.css";



const Button = (props) => {
  const { successCallback, create, update, deletes, isActive } = props;

  return (
    <>
      {deletes === "delete" ? (
        <button
          className="btn btn-danger Button"
          onClick={() => successCallback()}
        >
          <i class="fa-solid fa-trash"></i> &nbsp;Remove
        </button>
      ) : null}

      {create === "create" ? (
        <div className="validate_form">
          <button
            disabled={isActive === false ? true : false}
            className={isActive === false ? "submit_btn" : "submit_btn active"}
            value="Create"
            type="submit"
          >
            <i class="fa-solid fa-upload"></i> &nbsp;Create
          </button>
        </div>
      ) : null}
      {update === "update" ? (
        <div className="validate_form">
          <button
            disabled={isActive === false ? true : false}
            className={isActive === false ? "submit_btn" : "submit_btn active"}
            value="Update"
            type="submit"
          >
            <i class="fa-solid fa-pen"></i> &nbsp;Update
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Button;
