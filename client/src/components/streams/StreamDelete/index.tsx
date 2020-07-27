import React, { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../../Modal";
import { Link } from "react-router-dom";
import history from "../../../history";
import { fetchStream, deleteStream } from "../../../actions";

const StreamDelete = ({ fetchStream, deleteStream, match, stream }) => {
  useEffect(() => {
    fetchStream(match.params.id);
  }, []);

  const renderActions = () => {
    const { id } = match.params;

    return (
      <>
        <button onClick={() => deleteStream(id)} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };

  const renderContent = () => {
    const content = "Are you sure you want to delete this stream?";
    if (stream) {
      return `Are you sure you want to delete this stream with title: ${stream.title}`;
    }
    return content;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

const matchStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(matchStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
