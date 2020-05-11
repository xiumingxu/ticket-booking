import "./Candidate.css";
import PropTypes from "prop-types";

import React, { memo, useState, useCallback, useContext, useMemo } from "react";
import URI from "urijs";

const Candidate = ({ tickets }) => {
  return (
    <div className="candidate">
      <ul>
        {tickets.map((ticket, idx) => {
          return {
            /* <Seat
                            idx={idx}
                            onToggle={onToggle}
                            expanded={expandedIndex === idx}
                            {...ticket}
                            key={ticket.type}
                        /> */
          };
        })}
      </ul>
    </div>
  );
};
Candidate.propTypes = {
  tickets: PropTypes.array.isRequired
};

export default Candidate;
