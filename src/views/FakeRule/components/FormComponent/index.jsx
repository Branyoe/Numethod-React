//MUI
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import IntervalSlider from "./components/IntervalSlider";
//zustand
import useFakeRuleStore from "../../../../stores/FakeRuleStore";
import shallow from "zustand/shallow";
//formik
import { useFormik } from "formik";
import * as yup from "yup";

export default function FormComponent() {
  //****************logic seccion******************
  //*consumo de useFakeRuleStore
  const { postFakeRule, setIsDirty } = useFakeRuleStore(state => ({
    postFakeRule: state.postFakeRule,
    setIsDirty: state.setIsDirty
  }), shallow);

  //formikForm
  const validationSchema = yup.object({
    fxInp: yup
      .string("Solo strings")
      .required("campo requerido"),
    eAInp: yup
      .number("Solo numeros")
      .required("campo requerido")
      .min(0.000000000000000000000001, "no se admiten valores negativos")
      .max(100, "no se admiten valores mayores a 100"),
    xLInp: yup
      .number("Solo numeros")
      .required("campo requerido"),
    xUInp: yup
      .number("Solo numeros")
      .required("campo requerido"),
  })

  const formik = useFormik({
    initialValues: {
      fxInp: "",
      eAInp: "",
      xLInp: -1,
      xUInp: 1
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      const requestBody = {
        fx: values.fxInp,
        xLow: values.xLInp,
        xUp: values.xUInp,
        stopFactor: values.eAInp
      }
      postFakeRule(requestBody)
    }
  });

  const cleanForm = () => {
    formik.resetForm();
    setIsDirty();
  };

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
            id="fxInp"
            value={formik.values.fxInp}
            onChange={formik.handleChange}
            error={formik.touched.fxInp && Boolean(formik.errors.fxInp)}
            helperText={formik.touched.fxInp && formik.errors.fxInp}
            name="fxInp"
            label="F(x)"
            type="search"
          />
        </Stack>
        <Stack>
          <TextField
            id="eAInp"
            value={formik.values.eAInp}
            onChange={formik.handleChange}
            error={formik.touched.eAInp && Boolean(formik.errors.eAInp)}
            helperText={formik.touched.eAInp && formik.errors.eAInp}
            name="eAInp"
            label="Factor de paro"
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{"Ea<"}</InputAdornment>,
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
          />
        </Stack>
        <IntervalSlider
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
        <Stack direction={"row"} gap={1}>
          <Button {...btnProps} color="secondary" onClick={cleanForm}>
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