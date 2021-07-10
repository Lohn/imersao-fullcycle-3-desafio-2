#!/bin/bash

dockerize -wait ${NEXT_PUBLIC_STORE_API_URL} -timeout 40s npm start