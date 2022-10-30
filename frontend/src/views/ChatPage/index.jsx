import ResponsiveAppBar from "../TopBar/TopBar";
import { Box} from "@mui/material";
import Sidebar from "./sideBar";
import Chat from "./chat";
import { FinduserByEmail } from "../../apis/user";


const ChatPage = () => {
  const handleSearch = () => {
    const email = "bx@gmail.com";
    FinduserByEmail({ email }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
        }}
      >
        <ResponsiveAppBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/*Side Bar*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "30%",
              height: "100%",
              backgroundColor: "#ADADAD",
              boxSizing: "border-box",
            }}
          >
            <Sidebar />
          </Box>

          {/*ChatRoom*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "70%",
              height: "100%",
            }}
          >
            <Chat/>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default ChatPage;
