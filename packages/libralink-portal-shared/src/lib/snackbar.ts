import { useSnackbar as useDefaultSnackbar, SnackbarProvider } from "notistack";

export { SnackbarProvider };

export const useSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useDefaultSnackbar();

  const open = enqueueSnackbar;
  const close = closeSnackbar;

  const error = (message: string) => {
    open(message, {
      variant: "error",
    });
  };

  const success = (message: string) => {
    open(message, {
      variant: "success",
    });
  };

  const serverError = () => {
    error("Server error");
  };

  return { open, close, serverError, error, success };
};
