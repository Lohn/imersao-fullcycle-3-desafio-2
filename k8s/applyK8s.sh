#!/bin/bash
kubectl apply -f postgres-configmap.yml
kubectl apply -f postgres-storage.yml
kubectl apply -f postgres-stack.yml
kubectl apply -f api-stack.yml
kubectl apply -f next-stack.yml