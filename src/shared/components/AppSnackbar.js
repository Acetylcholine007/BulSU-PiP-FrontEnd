import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useContext } from "react";
import { SnackbarContext } from "../../contexts/SnackbarContext";

function AppSnackbar() {
  const { showSnackbar, setShowSnackbar, snackbarData } = useContext(SnackbarContext);

  const typeSelector = (data) => {
    switch (data.type) {
      case 0:
        return (
          <Alert onClose={() => setShowSnackbar(false)} severity="success" variant="filled">
            {data.message}
          </Alert>
        );
      case 1:
        return (
          <Alert onClose={() => setShowSnackbar(false)} severity="info" variant="filled">
            {data.message}
          </Alert>
        );
      case 2:
        return (
          <Alert onClose={() => setShowSnackbar(false)} severity="warning" variant="filled">
            {data.message}
          </Alert>
        );
      case 3:
        return (
          <Alert onClose={() => setShowSnackbar(false)} severity="error" variant="filled">
            {data.message}
          </Alert>
        );
    }
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={showSnackbar}
      autoHideDuration={6000}
      onClose={() => setShowSnackbar(false)}
    >
      {typeSelector(snackbarData)}
    </Snackbar>
  );
}

export default AppSnackbar;
