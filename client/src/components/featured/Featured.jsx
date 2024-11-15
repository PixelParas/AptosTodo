import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Home Loan</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total loan paid till today</p>
        <p className="amount">$870,000</p>
        <p className="desc">
          Next loan payment on 22-11-2024
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Loan Interest</div>
            <div className="itemResult negative">
              <div className="resultAmount">12%</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Interest paid</div>
            <div className="itemResult negative">
              <div className="resultAmount">$370,000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Monthly Payments</div>
            <div className="itemResult positive">
              <div className="resultAmount">$12,000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Loan amount</div>
            <div className="itemResult positive">
              <div className="resultAmount">$1,200,000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Total Loan</div>
            <div className="itemResult negative">
              <div className="resultAmount">$1,700,000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Time remaining</div>
            <div className="itemResult positive">
              <div className="resultAmount">3.2yrs</div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default Featured;
