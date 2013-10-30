#!/bin/bash

all=$(find tests -mindepth 2 \( ! -name qunit -prune \) -name "*.html" | xargs grep -l "qunit.js" | sort)
listed=$(cat tests/tests-list.js | grep html | sed 's/\s\|"\|,//g' | sed 's/^/tests\//' | sort)
omitted=$(comm -23 <(echo "$all") <(echo "$listed"))

if [[ $omitted ]]
    then
        echo "WARNING: some test files are omitted from the test run. Either delete them or include them in the suite."
        echo "Omitted test files:"
        echo "$omitted" | tr ' ' '\n'
fi

