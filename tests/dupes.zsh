#!/bin/zsh

# remove artifacts from incomplete runs
rm **/*tmp

# scan for duplicates
for test in **/*.*; do
    grep -E '^\s*(asyncTest|test)\(' $test > $test.tmp
    sort -u $test.tmp > $test.u.tmp
    sort $test.tmp > $test.s.tmp

    diff $test.s.tmp $test.u.tmp -q 1>/dev/null 2>/dev/null

    if [ $? -ne 0 ]; then
        echo "$test contains duplicate tests"
        comm -3 $test.s.tmp $test.u.tmp
    fi
done

# remove artifacts after run
rm **/*tmp
