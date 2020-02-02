import * as Yup from "yup";

const newQuoteSchema = Yup.object().shape({
  quoteNumber: Yup.string()
    .max(18)
    .required("this field is required"),
  customer: Yup.string()
    .max(25)
    .required("this field is required"),
  dateReceived: Yup.date().required("this field is required"),
  state: Yup.string().max(18),
  machine: Yup.string().max(40),
  teeth: Yup.number().max(999),
  gearPitch: Yup.string(),
  clientKey: Yup.string().max(60, "too long"),
  type: Yup.string(),
  size: Yup.string(),
  gapAcross: Yup.number("must be a number"),
  gapAround: Yup.number("must be a number"),
  cavAcross: Yup.number("must be a number"),
  cavAround: Yup.number("must be a number"),
  cornerRadius: Yup.number("must be a number"),
  material: Yup.string(),
  price: Yup.string()
});

export default newQuoteSchema;
