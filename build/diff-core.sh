#!/bin/sh

if git remote | grep -q core;
then
    echo "core remote found, switching to core-master branch"
    git checkout core-master; git pull
else
    echo "core remote not found, adding..."
    git remote add core git@github.com:telerik/kendo-ui-core.git
    git fetch core
    git checkout --track -b core-master core/master
fi

find src styles -type f | xargs -I{} git diff master -- {};
