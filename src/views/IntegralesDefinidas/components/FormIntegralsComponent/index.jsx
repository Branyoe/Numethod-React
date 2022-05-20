//MUI
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import IntervalInput from "./components/ItervalInput";
//zustand
import shallow from "zustand/shallow";
//formik
import { useFormik } from "formik";
import * as yup from "yup";
import useIntegralsStore from "../../../../stores/IntegralsStore";

export default function FromIntegralsComponent() {
  //****************logic seccion******************
  //*consumo de useFakeRuleStore
  const { postIntegrals, responseIntegrals } = useIntegralsStore(state => ({
    postIntegrals: state.postIntegrals,
    responseIntegrals: state.responseIntegrals
  }), shallow);

  console.log(responseIntegrals);

  //formikForm
  const validationSchema = yup.object({
    itglInp: yup
      .string("Solo strings")
      .required("campo requerido"),
    xLInp: yup
      .number("Solo numeros")
      .required("campo requerido"),
    xUInp: yup
      .number("Solo numeros")
      .required("campo requerido"),
  })

  const formik = useFormik({
    initialValues: {
      itglInp: "",
      xLInp: -1,
      xUInp: 1
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const requestBody = {
        itgl: values.itglInp,
        xLow: values.xLInp,
        xUp: values.xUInp
      }
      postIntegrals(requestBody)
    }
  });

  //props seccion******************
  const boxProps = {
    // component: "form",
    noValidate: true,
    maxWidth: "false",
    autoComplete: "off",
    m: 1,
    sx: {
      '& .MuiTextField-root': { mb: 1.3 }
    }
  }

  const btnProps = {
    variant: "contained",
    fullWidth: true
  }

  //render seccion*****************
  return (
    <Box
      {...boxProps}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack>
          <TextField
            id="itglInp"
            value={formik.values.itglInp}
            onChange={formik.handleChange}
            error={formik.touched.fxInp && Boolean(formik.errors.itglInp)}
            helperText={formik.touched.fxInp && formik.errors.itglInp}
            name="itglInp"
            label="Integral"
            type="search"
            InputProps={{
              endAdornment: <InputAdornment position="end">dx</InputAdornment>
            }}
          />
        </Stack>
        <IntervalInput
          formikProps={{
            values: [formik.values.xLInp, formik.values.xUInp],
            handleChange: formik.handleChange,
            errors: [
              formik.touched.xLInp && Boolean(formik.errors.xLInp),
              formik.touched.xUInp && Boolean(formik.errors.xUInp)
            ],
            helperTexts: [
              formik.touched.xLInp && formik.errors.xLInp,
              formik.touched.xUInp && formik.errors.xUInp
            ]
          }}
        />
        <Button {...btnProps} type="submit">
          Calcular
        </Button>
      </form>
    </Box>
  );
}