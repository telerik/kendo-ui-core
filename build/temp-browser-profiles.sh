export BROWSER_TEMP=`mktemp -d`
export FIREFOX_PROFILE=${BROWSER_TEMP##*.}
xvfb-run -a firefox -no-remote -CreateProfile $FIREFOX_PROFILE
