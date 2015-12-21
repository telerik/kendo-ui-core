---
title: Color-coded ranges in bars
page_title: Color-coded ranges in bars
description: Render custom bars with color-coded ranges (stripes)
---

# Color-coded ranges in bars

Color ranges can be used to convey additional information, e.g. value composition.

This is usually implemented through stacked bar series,
but at times we might need a little bit more flexibility.

Consider the type of chart illustrated below:
![Color-coded ranges](images/color-coded-bars.png)

We can implement it by defining a [series visual](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-series.visual)
that draws the ranges dynamically.

Note that the visual will remain in use until the next [render event](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#events-render).
This allows you to update it asynchronously or in real-time.

#### Example: Color-coded ranges (stripes) in bars

```html
    <div id="chart" />
    <script>
      var WIDTH = 5;
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      $("#chart").kendoChart({
        series: [{
          type: "bar",
          data: [10, 20, 30],
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-series.visual
          visual: function(e) {
            // http://docs.telerik.com/kendo-ui/api/javascript/geometry/rect
            var left = e.rect.topLeft();
            var right = e.rect.topRight();
            var bottom = e.rect.bottomLeft();

            // http://docs.telerik.com/kendo-ui/api/javascript/drawing/group
            var group = new draw.Group();

            for (var x = left.x; x < right.x; x += WIDTH) {
              var rect = new geom.Rect([x, left.y], [WIDTH, e.rect.height()])

              // http://docs.telerik.com/kendo-ui/api/javascript/drawing/path
              var value = Math.random();
              var path = draw.Path.fromRect(rect, {
                fill: {
                  color: value > 0.5 ? "green" : "lightgreen"
                },
                stroke: null,

                // Custom field
                value: value
              });

              group.append(path);
            }

            return group;
          }
        }]
      });
    </script>
```

# See Also

* [Drawing API](http://docs.telerik.com/kendo-ui/framework/drawing/overview)
