//MUI
import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
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
  const { postIntegrals, setIsDirty } = useIntegralsStore(state => ({
    postIntegrals: state.postIntegrals,
    setIsDirty: state.setIsDirty
  }), shallow);

  const cleanForm = () => {
    formik.resetForm();
    setIsDirty();
  };

  //formikForm
  const validationSchema = yup.object({
    fxInp: yup
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
      fxInp: "",
      aInp: -1,
      bInp: 1
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const requestBody = {
        fx: values.fxInp,
        xLow: values.aInp,
        xUp: values.bInp
      }
      postIntegrals(requestBody);
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
          <Typography
            variant='caption'
            component="div"
            ml={1}
            mb={0}
          >
            Integral
          </Typography>
          <TextField
            id="fxInp"
            value={formik.values.fxInp}
            onChange={formik.handleChange}
            error={formik.touched.fxInp && Boolean(formik.errors.fxInp)}
            helperText={formik.touched.fxInp && formik.errors.fxInp}
            name="fxInp"
            // label="Integral"
            type="search"
            size="medium"
            placeholder="f(x)"
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <MathComponent tex={String.raw`\int_{a}^{b}`} />
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
          <Button {...btnProps} onClick={cleanForm} color="secondary">
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