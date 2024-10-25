---
title: Scale Options
page_title: jQuery LinearGauge Documentation - Scale Options
description: "Get started with the jQuery LinearGauge by Kendo UI and customize the options of its scale."
slug: scale_kendoui_lineargauge
position: 3
---

# Scale Options

The LinearGauge enables you to customize the appearance of the scale by configuring the component's options.

For example, you can change the appearance of the label and ticks, customize the ranges, and others. For the full list of options, refer to the [API reference of the LinearGauge](/api/javascript/dataviz/ui/lineargauge).

```dojo
    <div id="gauge"></div>

    <script>
      $("#gauge").kendoLinearGauge({
        scale: {
          min: 0,
          max: 100,
          ranges: [
            {
              from: 0,
              to: 25,
              color: "#34A56F"
            }, {
              from: 25,
              to: 55,
              color: "#6F2DA8"
            }, {
              from: 55,
              to: 100,
              color: "yellow"
            }
          ],
          labels: {
            template: "#: value #%",
            position: "outside",
            color: '#6F2DA8'
          },
          minorUnit: 5,
          majorUnit: 10
        }
      });
    </script>
```

## See Also

* [Scale Options of the LinearGauge (Demo)](https://demos.telerik.com/kendo-ui/linear-gauge/scale-options)
* [JavaScript API Reference of the LinearGauge](/api/javascript/dataviz/ui/lineargauge)
