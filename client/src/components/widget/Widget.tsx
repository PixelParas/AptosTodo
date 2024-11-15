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
import { userInfo } from "os";
export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
// change this to be your module account address
export const moduleAddress =
  "0xf00647f6191e75fb0dbb51b093726bb387371bbe2d89f7b7a33f31602cad705";

  type UserInfo = {
    user_addr: string,
    user_name: string,
    user_avatar: string,
    account_balance: string,
    weekly_limit: string,
    incomings: string,
    outgoings: string
}

const Widget = ({ type } : {type:string}) => {
  let data: any;
  let user_info: any;
  //temporary
  const amount = 100;
  const diff = 20;

  
  const [transactions, setTransactions] = useState<UserInfo>();
  const { account, signAndSubmitTransaction } = useWallet();
  const [accountHasList, setAccountHasUserInfo] = useState<boolean>(false);

  const fetchUserInfo = async () => {
    if (!account) return [];
    try {
      const transactionListResource = await client.getAccountResource(
        account?.address,
        `${moduleAddress}::todolist::UserInfo`
      );
      setAccountHasUserInfo(true);

      user_info={
        userName: (transactionListResource as any).data.user_name,
        userAvatar: (transactionListResource as any).data.user_avatar  ,
        accountBalance: (transactionListResource as any).data.account_balance ,
        weeklyLimit:(transactionListResource as any).data.weekly_limit ,
        _incomings:(transactionListResource as any).data.incomings ,
        _outgoings: (transactionListResource as any).data.outgoings
      }


    } catch (e: any) {
      setAccountHasUserInfo(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [account?.address]);

  switch (type) {
    case "user":
      data = {
        avatar: "https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        hasImage: true,
        title: "PIXELPARAS",
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
        amount: user_info.weeklyLimit,
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
        amount: user_info._incomings,
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
        amount: user_info._outgoings,
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
                <img src={user_info.userAvatar} height={100} width={100}/>
            </span>
            <span className="title">{user_info.userName}</span>
            <span className="counter">
              {data.isMoney && "$"} {user_info.accountBalance}
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
