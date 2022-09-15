# API

## Requests

### **GET** - /api/v1/search_by_date

#### CURL

```sh
curl -X GET "https://hn.algolia.com/api/v1/search_by_date\
?query=nodejs"
```

#### Query Parameters

- **query** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "nodejs"
  ],
  "default": "nodejs"
}
```

### **GET** - /

#### CURL

```sh
curl -X GET "http://localhost:3000/"
```

### **GET** - /posts

#### CURL

```sh
curl -X GET "http://localhost:3000/posts"
```

### **GET** - /posts

#### CURL

```sh
curl -X GET "http://localhost:3000/posts\
?page=2"
```

#### Query Parameters

- **page** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "2"
  ],
  "default": "2"
}
```

### **GET** - /posts

#### CURL

```sh
curl -X GET "http://localhost:3000/posts\
?title=Explaining"
```

#### Query Parameters

- **title** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "Explaining"
  ],
  "default": "Explaining"
}
```

### **GET** - /posts

#### CURL

```sh
curl -X GET "http://localhost:3000/posts\
?tag=comment"
```

#### Query Parameters

- **tag** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "comment"
  ],
  "default": "comment"
}
```

### **GET** - /posts

#### CURL

```sh
curl -X GET "http://localhost:3000/posts\
?author=frankenst1"
```

#### Query Parameters

- **author** should respect the following schema:

```
{
  "type": "string",
  "enum": [
    "frankenst1"
  ],
  "default": "frankenst1"
}
```

### **GET** - /posts/32677265

#### CURL

```sh
curl -X GET "http://localhost:3000/posts/32677265"
```

#### Path Parameters

- **RequestVariable** should respect the following schema:

```
{
  "type": "string",
  "default": "32677265"
}
```

### **GET** - /posts/2

#### CURL

```sh
curl -X GET "http://localhost:3000/posts/2"
```

#### Path Parameters

- **RequestVariable** should respect the following schema:

```
{
  "type": "string",
  "default": "2"
}
```

### **DELETE** - /posts/32829160

#### CURL

```sh
curl -X DELETE "http://localhost:3000/posts/32829160"
```

#### Path Parameters

- **RequestVariable** should respect the following schema:

```
{
  "type": "string",
  "default": "32829160"
}
```

### **DELETE** - /posts/2

#### CURL

```sh
curl -X DELETE "http://localhost:3000/posts/2"
```

#### Path Parameters

- **RequestVariable** should respect the following schema:

```
{
  "type": "string",
  "default": "2"
}
```

## References

