#!/bin/bash

API="http://localhost:4741"
URL_PATH="/prescriptions"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "prescription": {
      "name": "'"${NAME}"'",
      "description": "'"${DESCRIPTION}"'",
      "dr": "'"${DR}"'"
    }
  }'

echo
