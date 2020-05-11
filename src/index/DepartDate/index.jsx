import React, { useMemo } from "react";
import Header from "../../common/Header";
import PropsTypes from "prop-types";
import "./index.css";
import dayjs from "dayjs";
import { h0 } from "../../common/utils/fp";

// onclick 也是可以传递的 date 也是传递防止依赖关系
const DepartDate = ({ date, onClick }) => {
  // use memo again
  const h0OfDepart = h0(date);
  const departDate = new Date(h0OfDepart);

  //UI 组件的计算重新利用
  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format("YYYY-MM-DD");
  }, [h0OfDepart]);

  const isToday = h0OfDepart === h0();

  const weekString =
    ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][departDate.getDay()] +
    (isToday ? "(TODAY)" : "");

  return (
    <div className="depart-date">
      <div className="input-date" onClick={onClick}>
        <input type="hidden" name="date" value={departDateString} />
        {departDateString} <span className="depart-week">{weekString}</span>
      </div>
    </div>
  );
};

DepartDate.propTypes = {
  date: PropsTypes.number.isRequired,
  onClick: PropsTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  //   return {};
};
// export default connect(function mapStateToProps (state){}, function mapDispatchToProps (dispatch){})(App);

export default DepartDate;
