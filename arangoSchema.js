// RULE attribute must contain the JSON Schema description.
// LEVEL controls when the validation will be applied.
// MESSAGE sets the message that will be used when validation fails.
// The additionalProperties keyword is used to control the handling of extra stuff, that is, properties whose names are not listed in the properties keyword. By default any additional properties are allowed.

var schema = {
  rule: {
    properties:
    {
    "review_id": {type: "number"},
    "username": {type: "string"},
    "user_type": {type: "string"},
    "review_date": {type: "string"},
    "full_text": {type: "string"},
    "likes": {type: "number",
    "category": {
      {type: "object",
      "parent": {type: "boolean"},
      "commute": {type: "boolean"},
      "dog_owner": {type: "boolean"},
      "community": {type: "boolean"}
    }

    additionalProperties: { type: "string" },
    required: ["nums"]
  },
  level: "moderate",
  message: "The document does not contain apropriate properties"
};

// nums: { type: "array", items: { type: "number", maximum: 6 } } },
// {
//   "type": "object",
//   "properties": {
//     "number":      { "type": "number" },
//     "street_name": { "type": "string" },
//     "street_type": { "type": "string",
//                      "enum": ["Street", "Avenue", "Boulevard"]
//                    }
//   }
// }