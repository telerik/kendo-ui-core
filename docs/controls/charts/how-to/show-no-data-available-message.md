---
title: Show an empty message when chart has no data
page_title: Show an empty message when chart has no data
description: Show an empty message when chart has no data
---

# Show an empty message when chart has no data

The example below demonstrates how to show a message if chart data source is empty. 

The message ``<div>`` is positioned and decorated via CSS.

#### Example:

```html
    <div class="container">
      <div id="chart"></div>
      <div class="overlay"><div>No data available</div></div>
    </div>

    <script>  
     $("#chart").kendoChart({
        dataSource: {
          transport: {
            read: function(e) {
              setTimeout(function() {
                e.success([{
                  value: 1
                }, {
                  value: 2
                }]);
              }, 2000);
            }
          }
        },
        seriesDefaults: {
          type: "pie"
        },
        series: [{
          field: "value",
          name: "Foo"
        }],
        dataBound: function(e) {
          var view = e.sender.dataSource.view();
          $(".overlay").toggle(view.length === 0);
        }
      });
    </script>

	<style>
      .container {
        position: relative;
      }

      .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: .2;
        filter: alpha(opacity=60); 
        background-color: #6495ed;      
        text-align: center;
      }

      .overlay div {
        position: relative;
        font-size: 34px;
        margin-top: -17px;
        top: 50%;
      }
    </style> 
```
