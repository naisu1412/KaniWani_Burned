import "./App.css";
import { Box } from "@material-ui/core";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#B067EB",
      }}
    >
      <Quiz />
    </Box>
  );
}

export default App;
