---
title: Multiple Pointers
page_title: jQuery LinearGauge Documentation - Multiple Pointers
description: "Get started with the jQuery LinearGauge by Kendo UI and highlight multiple values by rendering multiple pointers."
slug: pointers_kendoui_lineargauge
position: 4
---

# Multiple Pointers

The LinearGauge enables you to highlight multiple values by rendering multiple pointers.

You can independently customize each pointer including its current value, color, and shape.

    <div id="gauge"></div>
    <script>
      $("#gauge").kendoLinearGauge({
        pointer: [{
          value: 10,
          color: 'red',
          shape: 'arrow'
        }, {
          value: 20,
          color: '#28b4c8',
          margin: 18,
          size: 5
        }, {
          value: 30,
          color: '#78d237',
          size: 15
        },{
          value: 37,
          color: 'purple'
        },{
          value: 47,
          color: 'green',
          shape: 'arrow'
        }]
      });
    </script>

## See Also

* [Using Multiple Pointers in the LinearGauge (Demo)](https://demos.telerik.com/kendo-ui/linear-gauge/multiple-pointers)
* [JavaScript API Reference of the LinearGauge](/api/javascript/dataviz/ui/lineargauge)
