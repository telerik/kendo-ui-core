---
title: Using fixed bar size
page_title: Using fixed bar size
description: Using fixed bar size
---

# Using fixed bar size

The example below demonstrates how to use the series [visual](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-series.visual) function to scale the bars default drawing element so that it always has the same size.

#### Example:

```html
    <div id="chart"></div>
    <script>
      var BAR_SIZE = 10;
      $("#chart").kendoChart({
        series: [{
          type: "bar",
          data: [1, 2],
          visual: function(e) {
            //create the default visual
            var visual = e.createVisual();        
            //scale it so that it has the predefined size
            visual.transform(kendo.geometry.transform().scale(1, BAR_SIZE / e.rect.size.height, e.rect.center() ));
            return visual;
          }
        }]            
      });
    </script>
    </div>
```
