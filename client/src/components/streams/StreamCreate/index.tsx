import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../../actions";
import StreamForm from "../StreamForm";

const StreamCreate = ({ handleSubmit, createStream }) => {
  const onSubmit = (formProps) => {
    createStream(formProps);
  };

  return (
    <div>
      <h3>Create Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);

interface Errors {
  title?: string;
  description?: string;
}
