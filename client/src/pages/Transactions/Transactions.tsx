import "./Transactions.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Table from "../../components/table/Table"

const List = () => {
  return (
    <div className="list">
    <Sidebar/>
  <div className="listContainer">
      <Navbar/>
    <div className="datatable">
      <div className="datatableTitle">
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <Table/>
    </div>
    </div>
    </div>
  );
}

export default List