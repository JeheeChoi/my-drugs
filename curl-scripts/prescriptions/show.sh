#!/bin/sh

API="http://localhost:4741"
URL_PATH="/prescriptions"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}"

echo
