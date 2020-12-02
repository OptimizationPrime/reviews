## REVIEWS CRUD

### Read reviews
* **Endpoint:** `/:id/neighborhood_reviews`
* **Method:** GET
* **Request:** `{id: number, category: string}`
* **Response:** JSON
```
{
  'username': 'String',
  'user_type': 'String',
  'review_date': 'String',
  'full_text': 'String',
  'likes': 'Number',
  'category': {
    'parent': 'Boolean',
    'commute': 'Boolean',
    'dog_owner': 'Boolean',
    'community': 'Boolean'
  }
}
```

### Create review
* **Endpoint:** `/reviews/:id/neighborhood_reviews/`
* **Method:** POST
* **Request:**
* **Response:** HTTP Status Code `201`

### Update review
* **Endpoint:** `/reviews/:id/neighborhood_reviews`
* **Method:** PATCH
* **Request:**
* **Response:**: HTTP Status Code `200`

### Delete review
* **Endpoint:** `/reviews/:id/neighborhood_reviews`
* **Method:** DELETE
* **Request:**
* **Response:**: HTTP Status Code `200`

### Read stats
* **Endpoint:** `/reviews/:id/neighborhood_stats`
* **Method:** GET
* **Request:** `{id: number}`
* **Response:**: JSON
```
{
  'dog_friendly': 'Number',
  'grocery_stores': 'Number',
  'neighbors_friendly': 'Number',
  'parking_easy': 'Number',
  yard: 'Number',
  'community_events': 'Number',
  sidewalks: 'Number',
  'walk_night': 'Number',
  'five_years': 'Number',
  'kids_outside': 'Number',
  car: 'Number',
  restaurants: 'Number',
  streets: 'Number',
  holiday: 'Number',
  quiet: 'Number',
  wildlife: 'Number'
}
```


Ctrl+Shift+V for pretty?