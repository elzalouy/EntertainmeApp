import "text-encoding-polyfill";
import Joi from "@hapi/joi";

const validateEventSchema = Joi.object({
  additional_info: Joi.string().allow(null, ""),
  budget: Joi.string()
    .required()
    .min(1)
    .max(10)
    .messages({ any: "budget field is required" }),
  duration: Joi.string()
    .required()
    .messages({ any: "duration field is required" }),
  address: Joi.string()
    .required()
    .messages({ any: "Address field is required" }),
  date: Joi.date().required().messages({ any: "Date field is required" }),
  description: Joi.string()
    .required()
    .messages({ any: "Description field is required" }),
  placement: Joi.string()
    .required()
    .messages({ any: "Placement field is required" }),
  guests: Joi.string().required().messages({ any: "Guests field is required" }),
  additional_equipment: Joi.array().max(30),
  artists: Joi.array(),
  name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .messages({ any: "Name field is required" }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({ any: "Email should be valid ex: example@email.com" }),
  phone_number: Joi.string()
    .required()
    .messages({ any: "Phone number is required" }),
  production_items: Joi.array()
    .min(0)
    .required()
    .messages({ any: "Production items should be at least one item" }),
  type: Joi.valid("brief", "booking"),
  budget_tbd: Joi.valid(0, 1),
  duration_tbd: Joi.valid(0, 1),
  event_name: Joi.string()
    .required()
    .min(2)
    .max(300)
    .messages({ any: "This field is required" }),
});

export const validateEvent = (data) => {
  const result = validateEventSchema.validate(data);
  if (result.error) return { error: result.error.message };
  else return null;
};
const exports = { validateEvent };
export default exports;
