import React, { useState } from "react";
import PropTypes from "prop-types";

const HelpItem = ({ faq, index, toggle }) => {
  const [arrow, setArrow] = useState(<i className="fa fa-arrow-down" />);
  return (
    <div
      className={"faq " + (faq.show ? "show" : "")}
      key={index}
      onClick={() => {
        toggle(index);

        if (faq.show) {
          {
            setArrow(<i className="fa fa-arrow-up" />);
          }
        } else {
          setArrow(<i className="fa fa-arrow-down" />);
        }
      }}
    >
      <div className="faq-question ">
        {faq.question}
        <p className="float-right" style={{ transition: "all 0.5s ease" }}>
          {arrow}
        </p>
      </div>

      <div className="faq-answer ">{faq.answer}</div>
    </div>
  );
};

HelpItem.propTypes = {};

export default HelpItem;
