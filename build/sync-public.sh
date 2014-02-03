#!/bin/sh

LAST_PICK=`git show --format="%H" r-private | head -1`
MASTER=`git show --format="%H" core/master | head -1`

if [ $LAST_PICK == $MASTER ];
then
    echo "Private repository is up to date with Kendo UI Core"
    exit 0
fi
