#!/bin/bash

if git remote | grep -q core;
then
    echo "core remote found, switching to core-$BRANCH branch"
    git checkout core-$BRANCH; git pull
else
    echo "core remote not found, adding..."
    git remote add core git@github.com:telerik/kendo-ui-core.git
    git fetch core
    git checkout --track -b core-$BRANCH core/$BRANCH
fi

DIFF_FILE=diff.diff

find src styles tests -type f | grep -v 'tests/kendo-test-helpers.js' | xargs -I{} git diff --color origin/$BRANCH -- {}>$DIFF_FILE;

cat diff.diff

if [[ -s $DIFF_FILE ]]; then
    echo "Diffs detected, failing"
    exit 1;
else
    echo "No diffs found, success"
    exit 0;
fi


