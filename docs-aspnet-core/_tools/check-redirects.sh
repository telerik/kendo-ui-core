#!/bin/bash

# Expecting host name as first parameter
args=("$@")
host=${args[0]}

ok_codes="200 301 302"
count=0
err_count=0

# List of URLs to check: <from> <to>
urls="
/kendo-ui/api/wrappers/jsp /kendo-ui/api/jsp/alert
/kendo-ui/api/web/grid /kendo-ui/api/javascript/ui/grid
/kendo-ui/api/mobile/application /kendo-ui/api/javascript/mobile/application
/kendo-ui/api/mobile/scrollview /kendo-ui/api/javascript/mobile/ui/scrollview
/kendo-ui/api/framework/fx/common /kendo-ui/api/javascript/effects/common
/kendo-ui/api/framework/class /kendo-ui/api/javascript/class
/kendo-ui/api/framework/color /kendo-ui/api/javascript/color
/kendo-ui/api/framework/kendo /kendo-ui/api/javascript/kendo
/kendo-ui/api/framework/layout /kendo-ui/api/javascript/layout
/kendo-ui/api/framework/router /kendo-ui/api/javascript/router
/kendo-ui/api/framework/binder /kendo-ui/api/javascript/data/binder
/kendo-ui/api/framework/datasource /kendo-ui/api/javascript/data/datasource
/kendo-ui/api/framework/node /kendo-ui/api/javascript/data/node
/kendo-ui/api/dataviz/chart /kendo-ui/api/javascript/dataviz/ui/chart
/kendo-ui/api/dataviz/diagram /kendo-ui/api/javascript/dataviz/ui/diagram
/kendo-ui/api/javascript/dataviz/chart /kendo-ui/api/javascript/dataviz/ui/chart
/kendo-ui/api/javascript/dataviz/diagram /kendo-ui/api/javascript/dataviz/ui/diagram
/kendo-ui/api/dataviz/map/layer /kendo-ui/api/javascript/dataviz/map/layer
/kendo-ui/api/javascript/dataviz/drawing/group /kendo-ui/api/javascript/drawing/group
/kendo-ui/api/javascript/dataviz/geometry/point /kendo-ui/api/javascript/geometry/point
/kendo-ui/web/styles-and-layout/appearance-styling /kendo-ui/styles-and-layout/appearance-styling
/kendo-ui/web/grid/overview /kendo-ui/controls/data-management/grid/overview
/kendo-ui/web/treelist/overview /kendo-ui/controls/data-management/treelist/overview
/kendo-ui/web/autocomplete/overview /kendo-ui/controls/editors/autocomplete/overview
/kendo-ui/web/upload/overview /kendo-ui/controls/editors/upload/overview
/kendo-ui/dataviz/chart/overview /kendo-ui/controls/charts/overview
/kendo-ui/dataviz/sparkline/overview /kendo-ui/controls/charts/sparkline/overview
/kendo-ui/dataviz/treemap/overview /kendo-ui/controls/charts/treemap/overview
/kendo-ui/dataviz/stockchart/overview /kendo-ui/controls/charts/stockchart/overview
/kendo-ui/dataviz/lineargauge/overview /kendo-ui/controls/gauges/lineargauge/overview
/kendo-ui/dataviz/diagram/overview /kendo-ui/controls/diagrams-and-maps/diagram/overview
/kendo-ui/dataviz/map/overview /kendo-ui/controls/diagrams-and-maps/map/overview
/kendo-ui/dataviz/barcode/overview /kendo-ui/controls/barcodes/barcode/overview
/kendo-ui/dataviz/qrcode/overview /kendo-ui/controls/barcodes/qrcode/overview
/kendo-ui/web/calendar/overview /kendo-ui/controls/scheduling/calendar/overview
/kendo-ui/web/gantt/overview /kendo-ui/controls/scheduling/gantt/overview
/kendo-ui/web/notification/overview /kendo-ui/controls/layout/notification/overview
/kendo-ui/web/splitter/overview /kendo-ui/controls/layout/splitter/overview
/kendo-ui/web/button/overview /kendo-ui/controls/navigation/button/overview
/kendo-ui/web/menu/overview /kendo-ui/controls/navigation/menu/overview
/kendo-ui/framework/draganddrop/overview /kendo-ui/controls/interactivity/draganddrop/overview
/kendo-ui/framework/fx/overview /kendo-ui/controls/interactivity/fx/overview
/kendo-ui/web/progressbar/overview /kendo-ui/controls/interactivity/progressbar/overview
/kendo-ui/web/sortable/overview /kendo-ui/controls/interactivity/sortable/overview
/kendo-ui/mobile/introduction /kendo-ui/controls/hybrid/introduction
/kendo-ui/webforms/asp-net-hello-jquery /kendo-ui/third-party/tutorials/webforms/asp-net-hello-jquery
/kendo-ui/dataviz/drawing/overview /kendo-ui/framework/drawing/overview
/kendo-ui/framework/drawing/how-to/custom-page-layout /kendo-ui/controls/data-management/grid/how-to/pdf-export/custom-page-layout
/kendo-ui/tutorials/accessibility/accessibility-overview /kendo-ui/accessibility/accessibility-overview
/kendo-ui/getting-started/introduction /kendo-ui/introduction
/kendo-ui/using-kendo-with/introduction /kendo-ui/introduction
/kendo-ui/tutorials/asp.net/kendo-music-store/kendo-music-store-intro /kendo-ui/aspnet-mvc/tutorials/tutorial-kendo-music-store/kendo-music-store-intro
/kendo-ui/aspnet-mvc/tutorial-kendo-music-store/kendo-music-store-intro /kendo-ui/aspnet-mvc/tutorials/tutorial-kendo-music-store/kendo-music-store-intro
/kendo-ui/aspnet-mvc/tutorial-saleshub/kendo-saleshub-intro /kendo-ui/aspnet-mvc/tutorials/tutorial-saleshub/kendo-saleshub-intro
/kendo-ui/ /kendo-ui/introduction
/kendo-ui/api/javascript/ui/RangeSlider /kendo-ui/api/javascript/ui/rangeslider
/kendo-ui/api/javascript/ui/Splitter /kendo-ui/api/javascript/ui/splitter
/kendo-ui/api/framework/validator /kendo-ui/api/javascript/ui/validator
/kendo-ui/controls/data-management/grid/introduction /kendo-ui/controls/data-management/grid/overview
/kendo-ui/api/javascript/mobile/ui/ButtonGroup /kendo-ui/api/javascript/mobile/ui/buttongroup
/kendo-ui/api/javascript/mobile/ui/TabStrip /kendo-ui/api/javascript/mobile/ui/tabstrip
"

#Make `for` iterate over new lines
IFS='
'

echo "Checking documentation redirects on ${host}"
for line in $urls; do
    let count=$count+1

    url=`echo ${line} | awk '{print $1}'`
    url="${host}${url}"

    target=`echo ${line} | awk '{print $2}'`
    target="${host}${target}"

    printf '.'
    result=`curl --silent --head -w 'Destination %{url_effective}' --location "${url}"`

    result_codes=`echo "${result}" | grep HTTP/1.1 | awk '{print $2}'`
    destination=`echo "${result}" | grep Destination | awk '{print $2}'`

    if [[ $destination != $target ]]; then
        echo ""
        echo "FAIL for ${url}"
        echo "Expected ${target}"
        echo "Actual   ${destination}"
        let err_count=$err_count+1
        continue
    fi

    while read code; do
        if [[ !( $ok_codes =~ $code ) ]]; then
            echo ""
            echo "FAIL for ${url} with code ${code}"
            echo ""
            echo "${result}"
            echo ""
            let err_count=$err_count+1
        fi
    done <<< "$result_codes"
done

echo ""
echo "Checked ${count} redirects with ${err_count} failures."

exit ${err_count}
