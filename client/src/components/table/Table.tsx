import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { tableCellClasses } from "@mui/material/TableCell";

import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { AptosClient } from "aptos";
export const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
export const client = new AptosClient(NODE_URL);
// change this to be your module account address
export const moduleAddress =
  "0xf00647f6191e75fb0dbb51b093726bb387371bbe2d89f7b7a33f31602cad705";

type Transaction = {
  transaction_id: string,
  transaction_address: string,
  product_name: string,
  product_image: string,
  time: string,
  cutomer_name:string,
  date: string,
  amount: string,
  payment_method: string,
  status: string
} 

const List = () => {  
  const rows = [
    {
      id: "0x0f00647f61.....",
      product: "Paras deelip satpute",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "kanaad sanjay raut",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Vikrant kannad raut",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Abdul mohsin mohammad khan",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
        `${moduleAddress}::todolist::TransactionList`
      );
      setAccountHasList(true);
      // tasks table handle
      const tableHandle = (transactionListResource as any).data.transactions.handle;
      // tasks table counter
      const taskCounter = (transactionListResource as any).data.transaction_counter;

      let transactions = [];
      let counter = 1;
      while (counter <= taskCounter) {
        const tableItem = {
          key_type: "u64",
          value_type: `${moduleAddress}::todolist::Transaction`,
          key: `${counter}`,
        };
        const transaction = await client.getTableItem(tableHandle, tableItem);
        transactions.push(transaction);
        counter++;
      }
      // set tasks in local state
      setTransactions(transactions);
    } catch (e: any) {
      setAccountHasList(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  return (
    <TableContainer className="table"
    sx={{
      [`& .${tableCellClasses.root}`]: {
        borderBottom: "none"
      }
    }}
  
    
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.transaction_id}>
              <TableCell className="tableCell">{row.transaction_address.substring(0,25)+"..."}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.product_image} alt="" className="image" />
                  {row.product_name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.time}</TableCell>
              <TableCell className="tableCell">{row.cutomer_name}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.payment_method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
