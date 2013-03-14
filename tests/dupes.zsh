#!/bin/zsh

rm **/*tmp
for test in **/*.*; do
    grep 'est(' $test > $test.tmp
    sort -u $test.tmp > $test.u.tmp
    sort $test.tmp > $test.s.tmp

    diff $test.s.tmp $test.u.tmp -q 2>/dev/null

    if [ $? -ne 1 ]; then
        echo "good tests found in $test"
    fi
done
