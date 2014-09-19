#!/bin/sh

# colors
COLOR_RED="\x1b[31m"
COLOR_GREEN="\x1b[32m"
COLOR_RESET="\x1b[0m"

# prepare the dev environment
git clean -fxd
npm install
bower install
jspm install
tsd reinstall

if [ $? -ne 0 ]; then
  echo "$COLOR_RED"
  echo "\nINIT FAILED!\n"
  exit 1
fi

echo "$COLOR_GREEN"
echo "\nGO FORTH AND CONQUER\n"

echo "At any time you may:"
echo "--------------------"
echo "gulp help         # show available tasks"
echo "gulp              # build, test, and generate docs"
echo "gulp serve        # open the project web site"
echo "gulp watch:test   # build, test, and watch"
echo ""

echo "$COLOR_RESET"
exit 0
