---
title: Explode clicked pie segment
page_title: Explode clicked pie segment
description: Explode clicked pie segment
---

# Explode clicked pie segment

The example below demonstrates how explode a clicked pie segment

#### Example:

```html
    <div id="chart"></div>
    <script>
      var data = [{
        "source": "Hydro",
        "percentage": 22,
        "explode": true
      },                  {
        "source": "Solar",
        "percentage": 2
      },                  {
        "source": "Nuclear",
        "percentage": 49
      },                  {
        "source": "Wind",
        "percentage": 27
      }];

      $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: function(e) {
              e.success(data);
            }
          }
        },
        series: [{
          type: "pie",
          field: "percentage",
          categoryField: "source",
          explodeField: "explode",
          labels: {
            visible: true,
            background: "transparent",
            template: "#= category #: \n #= value#%"
          }
        }],
        seriesClick: function(e){
          $.each(e.sender.dataSource.view(), function() {
            // Clean up exploded state
            this.explode = false;
          });

          // Disable animations
          e.sender.options.transitions = false;

          // Explode the current slice
          e.dataItem.explode = true;
          e.sender.refresh();
        }
      });
    </script>
```
