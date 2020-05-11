import React from "react";
import { useState, useMemo } from "react";
import "./index.css";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { h0 } from "../utils/fp";
import classnames from "classnames";

const DateNav = ({
  date,
  isPrevDisabled = false,
  isNextDisabled = false,
  onPrevClick,
  onNextClick
}) => {
  const currentDateString = useMemo(() => {
    const d = dayjs(date);
    return d.format("MMM/DD") + d.locale("zh-cn").format("ddd");
  }, [date]);

  return (
    <div className={"nav"}>
      <span
        className={classnames("nav-prev", { "nav-disabled": isPrevDisabled })}
        onClick={onPrevClick}
      >
        Prev Day
      </span>
      <span className="nav-current"> {currentDateString}</span>
      <span
        onClick={onNextClick}
        className={classnames("nav-next", {
          "nav-disabled": isNextDisabled
        })}
      >
        Next Day
      </span>
    </div>
  );
};

DateNav.propTypes = {
  date: PropTypes.number.isRequired,
  isPrevDisabled: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
  onPrevClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired
};

export default DateNav;
