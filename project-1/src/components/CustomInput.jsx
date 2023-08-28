import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const CustomInput = ({ name, control, label , idDisabled }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          variant="outlined"
          className="capitalize"
          fullWidth
          disabled={idDisabled}
        />
      )}
    />
  );
};