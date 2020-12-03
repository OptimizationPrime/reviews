## REVIEWS CRUD

### Read reviews
* **Endpoint:** `listings/:id/reviews`,`or`, `listings/:id/neighborhoods/:id/reviews`
* **Method:** GET
* **Request:** `{id: number, category: string}`
* **Response:** JSON
```
{
  "reviews": [
    {
      "username": "String",
      "user_type": "String",
      "review_date": "String",
      "full_text": "String",
      "likes": "Number",
      "category": {
        "parent": "Boolean",
        "commute": "Boolean",
        "dog_owner": "Boolean",
        "community": "Boolean"
      }
    }
  ]
}
```

### Create review
* **Endpoint:** `neighborhood/:id/reviews`
* **Method:** POST
* **Request:**
    {
      "username": "String",
      "user_type": "String",
      "review_date": "String",
      "full_text": "String",
      "likes": "Number",
      "category": {
        "parent": "Boolean",
        "commute": "Boolean",
        "dog_owner": "Boolean",
        "community": "Boolean"
      }
    }
* **Response:** HTTP Status Code `201`

### Update review
* **Endpoint:** `neighborhood/:id/reviews/:id`
* **Method:** PATCH
* **Request:**
    {
      "reviews_id: "Number",
      "username": "String",
      "user_type": "String",
      "review_date": "String",
      "full_text": "String",
      "likes": "Number",
      "category": {
        "parent": "Boolean",
        "commute": "Boolean",
        "dog_owner": "Boolean",
        "community": "Boolean"
      }
    }
* **Response:**: HTTP Status Code `200`

### Delete review
* **Endpoint:** `neighborhood/:id/reviews/:id`
* **Method:** DELETE
* **Request:** `{reviews_id: "Number"}`
* **Response:**: HTTP Status Code `200`

### Read stats
* **Endpoint:** `neighborhoods/:id/stats`
* **Method:** GET
* **Request:** `{id: number}`
* **Response:**: JSON
```
{
  "dog_friendly": "Number",
  "grocery_stores": "Number",
  "neighbors_friendly": "Number",
  "parking_easy": "Number",
  yard: "Number",
  "community_events": "Number",
  sidewalks: "Number",
  "walk_night": "Number",
  "five_years": "Number",
  "kids_outside": "Number",
  car: "Number",
  restaurants: "Number",
  streets: "Number",
  holiday: "Number",
  quiet: "Number",
  wildlife: "Number"
}
```


Ctrl+Shift+V for pretty?