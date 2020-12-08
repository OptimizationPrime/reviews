// Graph schema for arangoDB

// neighborhooed- VERTEX - connected to user through review and separately to listing
{
  "neighborhood": {
    "id": "number",
    "name": "string",
    "dog_friendly": "number",
    "grocery_stores": "number",
    "neighbors_friendly": "number",
    "parking_easy": "number",
    "yard": "number",
    "community_events": "number",
    "sidewalks": "number",
    "walk_night": "number",
    "five_years": "number",
    "kids_outside": "number",
    "car": "number",
    "restaurants": "number",
    "streets": "number",
    "holiday": "number",
    "quiet": "number",
    "wildlife": "number"
  }
}

// review - EDGE - b/w from neighborhood to user
{
  "review": {
  "review_id": "number",
  "username": "string",
  "user_type": "string",
  "review_date": "string",
  "full_text": "string",
  "likes": "number",
  "category":
    "parent": "boolean",
    "commute": "boolean",
    "dog_owner": "boolean",
    "community": "boolean"
  }

  _from neighborhoods/<neighborhood_name> _to users/</user_name>
}

// user - VERTEX - connected to neighborhood through review
{
  "user": {
    "id": "number",
    "name": "string",
    "user_type": "string",
    "dog_owner": "boolean",
    "parent": "boolean"
  }
}

// EDGE - connection b/w listing and neighborhood
{
  _from listings/<listing_name> to _neighborhoods/</neighborhood_name>
}

// VERTEX - listing connected to neighborhood
{
  "id": "number"
}

















// RULE attribute must contain the JSON Schema description.
// LEVEL controls when the validation will be applied.
// MESSAGE sets the message that will be used when validation fails.
// The additionalProperties keyword is used to control the handling of extra stuff, that is, properties whose names are not listed in the properties keyword. By default any additional properties are allowed.

// var schema = {
//   rule: {
//     properties:
//     {
//     "review_id": {type: "number"},
//     "username": {type: "string"},
//     "user_type": {type: "string"},
//     "review_date": {type: "string"},
//     "full_text": {type: "string"},
//     "likes": {type: "number",
//     "category": {
//       {type: "object",
//       "parent": {type: "boolean"},
//       "commute": {type: "boolean"},
//       "dog_owner": {type: "boolean"},
//       "community": {type: "boolean"}
//     }

//     additionalProperties: { type: "string" },
//     required: ["nums"]
//   },
//   level: "moderate",
//   message: "The document does not contain apropriate properties"
// };

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