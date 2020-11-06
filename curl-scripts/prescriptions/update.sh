#!/bin/bash

API="http://localhost:4741"
URL_PATH="/prescriptions"

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "prescription": {
      "name": "'"${NAME}"'",
      "description": "'"${DESCRIPTION}"'",
      "dr": "'"${DR}"'",
      "date": "'"${DATE}"'",
      "refill": "'"${REFILL}"'"
    }
  }'

echo
