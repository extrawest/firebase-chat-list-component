import React, { FC, useRef, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, TextField, Grid } from "@material-ui/core";
import { useField, useForm } from "react-final-form-hooks";
import { fade } from "@material-ui/core/styles/colorManipulator";
import innerHeight from "ios-inner-height";
import { isIOS } from "react-device-detect";
import Send from '@material-ui/icons/Send';
import { FormApi } from "final-form";
import { validateRequire } from "../../utils/validator";
import ScrollableList from "../ChatScrollableList";
import ChatSkeleton from "../ChatSkeleton";
import { useIsResponsive } from "../../hooks/useIsResponsive";
import { useWindowSize } from "../../hooks/useWindowSize";
import { ChatProps, ValuesProps } from "../../interfaces";

const useStyles = makeStyles((theme) => ({
  chatSection: {
    width: "100%",
    height: "60vh",
    maxHeight: 690,
    maxWidth: 410,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    boxShadow: "none",
    "& > div": {
      maxHeight: 545,
      position: "relative",
    },
  },
  chatSectionModal: {
    height: "calc(100% - 120px)",
    marginBottom: 0,
    background: theme.palette.common.white,
    [theme.breakpoints.down("sm")]: {
      height: "calc(100% - 110px)",
    },
  },
  chatWrapper: {
    maxWidth: 410,
    position: "relative",
    background: theme.palette.common.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageArea: {
    width: "100%",
    overflowY: "auto",
    margin: 0,
    padding: "20px 10px",
    "& .tastt-MuiListItem-root": {
      position: "relative",
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      "&.chatbox-buyer": {
        "& > .message-body": {
          borderTopRightRadius: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: fade("#29C797", 0.12),
          marginLeft: "auto",
          "& .tastt-MuiTypography-root": {
            wordBreak: "break-word"
          },
          "&:after": {
            width: 0,
            height: 0,
            content: "''",
            top: 0,
            right: -15,
            position: "absolute",
            borderStyle: "solid",
            borderWidth: "15px 15px 0 0",
            borderColor: `${fade(
              "#29C797",
              0.12,
            )} transparent transparent transparent`,
          },
        },
        "& > .message-info": {
          marginLeft: "auto",
        },
      },
      "&.chatbox-delivery": {
        "& > .message-body": {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          background: fade(theme.palette.grey[900], 0.06),
          marginRight: "auto",
          "& .tastt-MuiTypography-root": {
            wordBreak: "break-word"
          },
          "&:before": {
            width: 0,
            height: 0,
            content: "''",
            top: 0,
            left: -15,
            position: "absolute",
            borderStyle: "solid",
            borderWidth: "0 15px 15px 0",
            borderColor: `transparent ${fade(
              theme.palette.grey[900],
              0.06,
            )} transparent transparent`,
          },
        },
        "& > .message-info": {
          marginRight: "auto",
        },
      },
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 60,
    boxShadow: "0px -5px 9px rgba(0, 0, 0, 0.12)",
    padding: "0 12px",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    background: theme.palette.common.white,
    "& form": {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
      paddingBottom: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  sendMessageButton: {
    padding: 0,
    background: theme.palette.primary.main,
    width: 36,
    height: 36,
  },
  chatFieldBox: {
    marginBottom: 0,
    "& .tastt-MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  shareLocation: {
    padding: 0,
  },
  form: {
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  actionsButton: {
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ChatBox: FC<ChatProps> = ({
  chatMessagePlaceholder,
  loading,
  handleSubmitMessage,
  messages
} ) => {
  
  const formActionsRef = useRef<any>( null );
  
  const classes = useStyles();

  const isMobile = useIsResponsive( "sm" );

  const onSubmit = ( values: ValuesProps, form: FormApi<ValuesProps, Partial<ValuesProps>> ) => {
    handleSubmitMessage(values, form);
  };

  const validate = ( values: ValuesProps ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errors: any = validateRequire(
      values,
      [ "message" ],
      "",
    );

    return errors;
  };
  
  const { form, handleSubmit } = useForm({
    onSubmit,
    validate,
  });
  
  const message = useField( "message", form );

  const [, windowHeight] = useWindowSize();

  const height = isMobile ? isIOS ? `${innerHeight()}px - 125px`  : `${windowHeight}px - 115px` : "100%";

  //dynamic height for chat messages and chat form
  const style = {
    height: `calc( ${height} - ${formActionsRef?.current?.clientHeight}px)`,
  };

  const ref = useRef<any>(null);

  const scrollToBottom = () => {
    ref && ref?.current?.scrollIntoView( { behavior: "smooth" } );
  };

  const hanldeSubmitByKeyPress = ( event: React.KeyboardEvent ) => {
    if ( (event.ctrlKey || event.metaKey) && (event.keyCode === 13 || event.keyCode === 10 ) ){
      handleSubmit();
    }
  };

  useEffect( () => {
    scrollToBottom();
  }, [] );

  const allowedProps = { ref: formActionsRef }

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        className={classes.chatWrapper}
        ref={ref}
      >
        {loading ? (
          <ChatSkeleton />
        ) : (
          <ScrollableList
            messages={messages}
            className={classes.messageArea}
            style={style}
          />
        )}
        <Box
          className={classes.actions}
          {...allowedProps}
        >
          <form
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <TextField
              {...message.input}
              variant="outlined"
              id="chat-message"
              placeholder={chatMessagePlaceholder}
              multiline
              rowsMax={4}
              fullWidth
              className={classes.chatFieldBox}
              onKeyUp={hanldeSubmitByKeyPress}
            />
            <Box className={classes.actionsButton}>
              <IconButton
                type="submit"
                className={classes.sendMessageButton}
              >
                <Send />
              </IconButton>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChatBox;