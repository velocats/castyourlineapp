#!/bin/bash

set -e

read -p "Commit message: " message

if [ -z "$message" ]; then
  echo "Commit message cannot be empty."
  exit 1
fi

git add .

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$message"
git push

echo "Done."
