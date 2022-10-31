import React from "react";
import useToggle from "hooks/useToggle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PostSaved = ({ isSaved = false }) => {
  const [saved, setSaved] = useToggle(isSaved);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
    setSaved();
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon className="text-iconColor" />}
        checkedIcon={<BookmarkIcon className="text-primary" />}
        checked={saved}
        onChange={handleClick}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={saved ? "Added to save list" : "Removed from save list"}
        action={action}
      />
    </>
  );
};

PostSaved.propTypes = {
  isSaved: PropTypes.bool,
};

export default PostSaved;
