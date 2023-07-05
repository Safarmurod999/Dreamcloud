import React from "react";
import "./AddressModal.scss";

function AddressModal({src}) {
  return (
    <div className="modal">
      <div className="modal__content">
        <iframe
          src={src}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <button className="modal__btn" onClick={()=>document.querySelector('.modal').style.display="none"}>Close</button>
      </div>
    </div>
  );
}

export default AddressModal;
