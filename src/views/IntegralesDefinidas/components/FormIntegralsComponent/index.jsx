//MUI
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import IntervalInput from "./components/ItervalInput";
//zustand
import shallow from "zustand/shallow";
//formik
import { useFormik } from "formik";
import * as yup from "yup";
import useIntegralsStore from "../../../../stores/IntegralsStore";
import { MathComponent } from 'mathjax-react'

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
    aInp: yup
      .number("Solo numeros")
      .required("campo requerido"),
    bInp: yup
      .number("Solo numeros")
      .required("campo requerido"),
  })

  const formik = useFormik({
    initialValues: {
      itglInp: "",
      aInp: -1,
      bInp: 1
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const requestBody = {
        itgl: values.itglInp,
        aInp: values.aInp,
        bInp: values.bInp
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
              startAdornment: <InputAdornment position="start">
                <MathComponent tex={`\int_{a}^{b}`} />
              </InputAdornment>,
              endAdornment: <InputAdornment position="end">dx</InputAdornment>
            }}
          />
        </Stack>
        <IntervalInput
          formikProps={{
            values: [formik.values.aInp, formik.values.bInp],
            handleChange: formik.handleChange,
            errors: [
              formik.touched.aInp && Boolean(formik.errors.aInp),
              formik.touched.bInp && Boolean(formik.errors.bInp)
            ],
            helperTexts: [
              formik.touched.aInp && formik.errors.aInp,
              formik.touched.bInp && formik.errors.bInp
            ]
          }}
        />
        <Stack direction={"row"} gap={1}>
          <Button {...btnProps} color="secondary">
            Limpiar
          </Button>
          <Button {...btnProps} type="submit">
            Calcular
          </Button>
        </Stack>
      </form>
    </Box>
  );
}