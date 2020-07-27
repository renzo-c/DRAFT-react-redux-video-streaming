import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../../actions";
import StreamForm from "../StreamForm";

const StreamEdit = ({ match, fetchStream, editStream, stream }) => {
  const {
    params: { id },
  } = match;

  useEffect(() => {
    fetchStream(id);
  }, []);

  const onSubmit = (formValues) => {
    editStream(id, formValues)
  };

  if (!stream) {
    return <>...Loading</>;
  }
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={{ title: stream.title, description: stream.description }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
