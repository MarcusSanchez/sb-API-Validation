export default {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "amazon_url": { "type": "string", "format": "uri" },
    "author": { "type": "string" },
    "language": { "type": "string" },
    "pages": { "type": "integer", "minimum": 0 },
    "publisher": { "type": "string" },
    "title": { "type": "string" },
    "year": { "type": "integer", "minimum": 0 }
  },
  "required": ["amazon_url", "author", "language", "pages", "publisher", "title", "year"],
  "additionalProperties": false
}

