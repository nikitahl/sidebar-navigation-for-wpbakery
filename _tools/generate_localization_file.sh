#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define plugin slug and languages directory
PLUGIN_SLUG="sidebar-navigation-for-wpbakery"
LANG_DIR="languages"

# Ensure WP CLI is installed
if ! command -v wp &> /dev/null
then
    echo "Error: WP-CLI is not installed. Install it first: https://wp-cli.org/"
    exit 1
fi

# Ensure languages directory exists
mkdir -p "$LANG_DIR"

# Generate the .pot file
echo "Generating .pot file..."
wp i18n make-pot . "$LANG_DIR/$PLUGIN_SLUG.pot"

echo "Localization file generated successfully: $LANG_DIR/$PLUGIN_SLUG.pot"
