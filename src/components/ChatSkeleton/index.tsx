import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  list: {
    padding: 20,
    "& > div:nth-child(even)": {
      display: "flex",
      justifyContent: "flex-start",
    },
    "& > div:nth-child(odd)": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
}));

const ChatSkeleton = ( { length = 3 } ) => {
  const classes = useStyles();
  return (
    <Box className={classes.list}>
      {Array.from(new Array(length)).map((_item, index) => (
        <Box key={index} pt={0.5}>
          <Skeleton height="90px" width="80%" />
        </Box>
      ))}
    </Box>
  );
};

export default ChatSkeleton;
