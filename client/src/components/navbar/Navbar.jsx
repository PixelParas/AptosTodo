import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <WalletSelector/>
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon"
            onClick={() => {
              if (!document.fullscreenElement &&
                !document.mozFullScreenElement && !document.webkitFullscreenElement) { 
                 if (document.documentElement.requestFullscreen) {
                   document.documentElement.requestFullscreen();
                 } else if (document.documentElement.mozRequestFullScreen) {
                   document.documentElement.mozRequestFullScreen();
                 } else if (document.documentElement.webkitRequestFullscreen) {
                   document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                 }
               } else {
                  if (document.cancelFullScreen) {
                     document.cancelFullScreen();
                  } else if (document.mozCancelFullScreen) {
                     document.mozCancelFullScreen();
                  } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                  }
               }
        
            }}
            
            />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
