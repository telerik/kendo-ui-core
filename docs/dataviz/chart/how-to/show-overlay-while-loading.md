---
title: Show overlay while loading
page_title: Show overlay while loading
description: Show overlay while loading
---

# Show overlay while loading

The example below demonstrates how to show a loading indicator while chart data is being loaded.

The loading indicator is cleared in the [render](/api/javascript/dataviz/ui/chart#events-render) event.

Replace with the [dataBound](/api/javascript/dataviz/ui/chart#events-dataBound) event for version prior to 2014.3.1119.

#### Example:

```html
    <div class="chart-wrap" style="position: relative;">
      <div id="chart"></div>
      <div class="chart-loading"></div>
    </div>
    <script>
      var ds = new kendo.data.DataSource({
        transport: {
          read: function(e) {
            // Delay response to simulate remote data
            setTimeout(function() {
              e.success([{
                value: 1
              }, {
                value: 2
              }, {
                value: 3
              }]);
            }, 2000);
          }
        }
      });

      $("#chart").kendoChart({
        dataSource: ds,
        series: [{
          field: "value"
        }],
        render: function(e) {
          // Clear up the loading indicator for this chart
          var loading = $(".chart-loading", e.sender.element.parent());
          kendo.ui.progress(loading, false);
        }
      });

      $(document).ready(function() {
        // Spin all loading indicators on the page
        kendo.ui.progress($(".chart-loading"), true);
      });
    </script>
```
