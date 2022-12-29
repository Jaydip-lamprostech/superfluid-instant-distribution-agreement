import React from "react";
import "../styles/editsubscriber.scss";

function EditSubscriber({ editSubscriberData }) {
  return (
    <div className="edit-subscriber-main">
      <button className="edit-subscriber-title">Edit Subscriber</button>
      <h3>Index #</h3>
      <span>{editSubscriberData.index}</span>
      <h3>Subscriber Address</h3>
      <span>{editSubscriberData.sub_address}</span>
      <h3>Subscriber Unit</h3>
      <input type="number" placeholder={editSubscriberData.unit} />
      <button>Submit</button>
    </div>
  );
}

export default EditSubscriber;
