import { Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';


export default function IntervalInput({ formikProps: { values, handleChange, errors, helperTexts } }) {

  return (
    <Box
      sx={{ 
        mt: 2,
        mb: 2,
        p: 1, 
        outline: "1px #bdbdbd solid", 
        borderRadius: "5px" 
      }}
      maxWidth="false"
    >
      <Typography
        variant='caption'
        component="div"
        ml={1}
        mb={1}
      >
        Intervalo
      </Typography>
      <Stack direction="row" gap={1}>
        <TextField
          id="xLInp"
          value={values[0]}
          onChange={handleChange}
          error={errors[0]}
          helperText={helperTexts[0]}
          name="xLInp"
          label="xLow"
          type="number"
          inputProps={
            {
              readOnly: false
            }
          }
          size="small"
          fullWidth
        />
        <TextField
          id="xUInp"
          value={values[1]}
          onChange={handleChange}
          error={errors[1]}
          helperText={helperTexts[1]}
          name="xUInp"
          label="xUp"
          type="number"
          size="small"
          inputProps={
            {
              readOnly: false
            }
          }
          fullWidth
        />
      </Stack>
    </Box>
  );
}