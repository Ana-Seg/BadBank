import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ bgcolor, txtcolor, header, title, text, body, status }) => {
  function classes() {
    const bg = bgcolor ? ` bg-${bgcolor}` : '';
    const txt = txtcolor ? ` text-${txtcolor}` : ' text-white';
    return `card mb-6${bg}${txt}`.trim();
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <div className={classes()} style={{ maxWidth: "35rem", width: "100%", padding: "2rem" }}>
        <div className="card-header">{header}</div>
        <div className="card-body">
          {title && <h5 className="card-title">{title}</h5>}
          {text && <p className="card-text">{text}</p>}
          {body}
          {status && <div id="createStatus">{status}</div>}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  bgcolor: PropTypes.string,
  txtcolor: PropTypes.string,
  header: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  body: PropTypes.node.isRequired,
  status: PropTypes.string,
};

export default Card;

