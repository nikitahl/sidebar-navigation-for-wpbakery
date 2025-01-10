#!/bin/bash

# Define the zip file name
ZIP_FILE="sidebar-for-wpbakery.zip"

# Remove any existing zip file to avoid conflicts
if [ -f "$ZIP_FILE" ]; then
  rm "$ZIP_FILE"
fi

# Add the designated files and folders to the zip file directly
zip -r "$ZIP_FILE" \
  *.php \
  readme.txt \
  css \
  js \
  -x "*.DS_Store"  # Exclude unnecessary files like macOS metadata
