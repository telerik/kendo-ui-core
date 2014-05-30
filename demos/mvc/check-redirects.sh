#!/bin/bash

# Get the first command line parameter
args=("$@")
domain=${args[0]}

okCodes="200 301"
count=0

#List of URLs to check: <from> <to>
urls="/kendo-ui/web/drag-and-drop/index.html /kendo-ui/dragdrop/index
/kendo-ui/themebuilder/dataviz.html /kendo-ui/themebuilder/
/kendo-ui/themebuilder/web.html /kendo-ui/themebuilder/
/kendo-ui/themebuilder/mobile.html /kendo-ui/mobilethemebuilder/
/kendo-ui/mobilethemebuilder/index.html /kendo-ui/mobilethemebuilder/
/kendo-ui/web/grid/rtl.html /kendo-ui/grid/right-to-left-support
/kendo-ui/web/grid/remote-data.html /kendo-ui/grid/remote-data-binding
/kendo-ui/web/grid/local-data.html /kendo-ui/grid/local-data-binding
/kendo-ui/web/grid/navigation.html /kendo-ui/grid/keyboard-navigation
/kendo-ui/dataviz/api/events.html /kendo-ui/chart-api/events
/kendo-ui/mobile/apps/sushi/ /kendo-ui/mobile-apps/sushi/
/kendo-ui/mobile/tabstrip/index.html /kendo-ui/mobile-tabstrip/index
/kendo-ui/mobile/overview/ /kendo-ui/
/kendo-ui/mobile/overview/index.html /kendo-ui/
/kendo-ui/web/grid/index.html?php /php-ui/grid/index
/kendo-ui/web/grid/index.html?jsp /jsp-ui/grid/index
/kendo-ui/web/grid/index.html?mvc /aspnet-mvc/grid/index
/kendo-ui/web/grid/index.html /kendo-ui/grid/index
/kendo-ui/web/grid/ /kendo-ui/grid/index
/kendo-ui/web/grid /kendo-ui/grid/index
/kendo-ui/web /kendo-ui/
/kendo-ui/web/ /kendo-ui/
/kendo-ui/web/?php /php-ui/
/kendo-ui /kendo-ui/
/aspnet-mvc /aspnet-mvc/
/php-ui /php-ui/
"

#Make `for` iterate over new lines
IFS='
'

for line in $urls; do
    url=`echo ${line} | awk '{print $1}'`
    url="http://${domain}${url}"

    target=`echo ${line} | awk '{print $2}'`
    target="http://${domain}${target}"

    echo "Checking ${url}"
    result=`curl --silent --head -w 'Destination %{url_effective}' --location "${url}"`

    httpCodes=`echo "${result}" | grep HTTP/1.1 | awk '{print $2}'`
    destination=`echo "${result}" | grep Destination | awk '{print $2}'`

    if [[ $destination == $target ]]; then
        let count=$count+1
        echo "OK"
    else
        echo "FAIL"
        echo "Expected ${target}"
        echo "Actual   ${destination}"
        exit 1
    fi

    while read code; do
        if [[ !( $okCodes =~ $code ) ]]; then
            echo "Failed with code ${code}"
            echo "${result}"
            exit 1
        fi
    done <<< "$httpCodes"
done

echo "Success. Checked ${count} redirects."
