import { Box, Stack, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

export default function ErrorComponent({ errorMessage }) {

  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      <Stack>
        <ErrorOutline color="warning" sx={{ fontSize: "10rem" }} />
        <Typography variant="subtitle1" sx={{color: "red"}}>
          {errorMessage}
        </Typography>
      </Stack>
    </Box>
  );
}