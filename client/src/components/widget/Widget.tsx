import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { orange } from "@mui/material/colors";
import { BorderAllRounded } from "@mui/icons-material";

import { tableCellClasses } from "@mui/material/TableCell";

import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { AptosClient } from "aptos";
export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
// change this to be your module account address
export const moduleAddress =
  "0xf00647f6191e75fb0dbb51b093726bb387371bbe2d89f7b7a33f31602cad705";

  type UserInfo = {
    user_name: string,
    user_avatar: string,
    account_balance: string,
    weekly_limit: string,
    incomings: string,
    outgoings: string
}

const Widget = ({ type } : {type:string}) => {
  let data: any;
  //temporary
  const amount = 100;
  const diff = 20;

  const [transactions, setTransactions] = useState<UserInfo>();
  const [newTransaction, setNewTransaction] = useState<string>("");
  const { account, signAndSubmitTransaction } = useWallet();
  const [accountHasList, setAccountHasList] = useState<boolean>(false);
  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);

  const onWriteTransaction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewTransaction(value);
  };

  const fetchList = async () => {
    if (!account) return [];
    try {
      const transactionListResource = await client.getAccountResource(
        account?.address,
        `${moduleAddress}::todolist::UserInfo`
      );
      setAccountHasList(true);
      // tasks table handle
      console.log("Success");
    } catch (e: any) {
      setAccountHasList(false);
      console.log("fail");
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);



  switch (type) {
    case "user":
      data = {
        avatar: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        hasImage: true,
        title: "PixelParas",
        isMoney: true,
        amount: 2560,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "WEEKLY LIMIT",
        isMoney: true,
        hasImage: false,
        amount: 5000,
        link: "change limit",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgb(253, 70, 0, 0.25)",
              color: "f05521",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "INCOMINGS",
        isMoney: true,
        hasImage: false,
        amount: 2150,
        link: "see details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "OUTGOINGS",
        isMoney: true,
        hasImage: false,
        amount: 1658,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }


  return (
    <div className="container">
    {data.hasImage ? (
      <div className="widget">
        <div className="hasImage">
          <span className="Image">
                <img src={data.avatar} height={100} width={100}/>
            </span>
            <span className="title">{data.title}</span>
            <span className="counter">
              {data.isMoney && "$"} {data.amount}
            </span>
            {data.icon}
          </div>
      </div>
    ):(
      <div className="widget">
            <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>

        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
      </div>
    )}
    
  </div>
  );
};

export default Widget;
