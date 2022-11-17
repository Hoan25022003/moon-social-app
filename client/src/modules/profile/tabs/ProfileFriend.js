import React from "react";
import useChangeValue from "hooks/useChangeValue";
import Search from "components/search/Search";
import FriendList from "modules/friends/FriendList";
import FriendItem from "modules/friends/FriendItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileFriend = () => {
  const { value, handleChange } = useChangeValue();
  return (
    <div className="px-3 py-4">
      {/* <Search
        isSuggested={false}
        placeholder="Search friend"
        onChange={handleChange}
      ></Search>
      <FriendList className="my-3">
        <FriendItem
          src="https://images.unsplash.com/photo-1667114790847-7653bc249e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          fullName="Hoan Do"
          email="hoan@gmail.com"
        ></FriendItem>
      </FriendList> */}

      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Full name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Avatar
                  src="https://images.unsplash.com/photo-1668531282396-96bea4cacab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt=""
                />
              </TableCell>
              <TableCell>Dat Dang</TableCell>
              <TableCell className="text-text3">datdang@gmail.com</TableCell>
              <TableCell align="center" className="text-thirdColor">
                Male
              </TableCell>
              <TableCell>
                <a href="/profile/6960" target="_blank">
                  <Button
                    variant="outlined"
                    className={`w-full py-1 font-semibold capitalize rounded-full hover:bg-graySoft text-primary border-primary`}
                  >
                    View Info
                  </Button>
                </a>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Avatar
                  src="https://images.unsplash.com/photo-1668531282396-96bea4cacab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  alt=""
                />
              </TableCell>
              <TableCell>Dat Dang</TableCell>
              <TableCell className="text-text3">datdang@gmail.com</TableCell>
              <TableCell align="center" className="text-thirdColor">
                Male
              </TableCell>
              <TableCell>
                <a href="/profile/6960" target="_blank">
                  <Button
                    variant="outlined"
                    className={`w-full py-1 font-semibold capitalize rounded-full hover:bg-graySoft text-primary border-primary`}
                  >
                    View Info
                  </Button>
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProfileFriend;
