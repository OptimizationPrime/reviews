## REVIEWS CRUD

### Read reviews
* **Endpoint:** `listings/:listingId/reviews`,`or`, `neighborhoods/:neighborhoodId/reviews`
* **Method:** GET
* **Request:** `{listingId: "Number", category: "String"}`
* **Response:** JSON
```
{
  "reviews": [
    {
      "review_id": "Number",
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
* **Endpoint:** `neighborhoods/:neighborhoodId/reviews`
* **Method:** POST
* **Request:**
```
    {
      "id ?"
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
  ```
* **Response:** HTTP Status Code `201`

### Update review
* **Endpoint:** `neighborhoods/:neighborhoodId/reviews/:reviewId`
* **Method:** PATCH
* **Request:**
```
    {
      "review_id: "Number",
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
```
* **Response:**: HTTP Status Code `200`

### Delete review
* **Endpoint:** `neighborhoods/:neighborhoodId/reviews/:reviewId`
* **Method:** DELETE
* **Request:** `{reviewId: "Number"}`
* **Response:**: HTTP Status Code `200`

### Read stats
* **Endpoint:** `neighborhoods/:neighborhoodId/stats`
* **Method:** GET
* **Request:** `{neighborhoodId: "Number"}`
* **Response:**: JSON
```
{
  "neighborhood_id": "Number",
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
### Read everything for a listing (neighborhood)
* **Endpoint:** `neighborhoods/:neighborhoodId/stats`
* **Method:** GET
* **Request:** `{neighborhoodId: "Number"}`
* **Response:**: JSON
```
{
  "neighborhood_id": "Number",
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
  "car": "Number",
  "restaurants": "Number",
  "streets": "Number",
  holiday: "Number",
  "quiet": "Number",
  "wildlife": "Number"
  "reviews": [
    {
      "review_id": "Number",
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


Ctrl+Shift+V for pretty?