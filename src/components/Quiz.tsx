import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RootStoreContext } from "../stores/rootStore";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  text: {
    textAlign: "center",
    fontSize: "2em",
    backgroundColor: "white",
  },
  button: {
    display: "flex",
    textAlign: "center",
    minWidth: "100%",
    backgroundColor: "#8fff33",
  },
  grid: {
    minWidth: "100%",
  },
  label: {
    textAlign: "center",
    fontSize: "10em",
    color: "White",
  },
});

const Quiz = () => {
  const classes = useStyles();
  const rootStore = useContext(RootStoreContext);
  const {
    currentItem,
    isItemLoaded,
    attemptAnswer,
    nextItem,
    isCorrect,
    isDisplayingResult,
  } = rootStore.wanikaniStore;

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{ answer: "" }}
        onSubmit={(data, { resetForm }) => {
          if (isDisplayingResult === false) {
            attemptAnswer(data.answer);
          } else {
            console.log("next item");
            nextItem();
          }
          resetForm();
        }}
      >
        {(props) => (
          <Grid className={classes.grid} container>
            <Grid item sm={12}>
              <Form
              >
                <Typography
                  className={classes.label}
                  component="p"
                  variant="h1"
                >
                  {isItemLoaded === true ? currentItem["characters"] : ""}
                </Typography>
                <Field
                  type="text"
                  name="answer"
                  variant="outlined"
                  fullWidth={true}
                  autoComplete="off"
                  size="small"
                  InputProps={{ classes: { input: classes.text } }}
                  value={isDisplayingResult === true? "" : props.values.answer}
                  as={TextField}
                />
                <Button
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  {isDisplayingResult === false ? "Submit" : "Next"}
                </Button>
                <pre>{isDisplayingResult === true ? `${isCorrect}` : ""} </pre>
              </Form>
            </Grid>
          </Grid>
        )}
      </Formik>
    </div>
  );
};

export default observer(Quiz);
