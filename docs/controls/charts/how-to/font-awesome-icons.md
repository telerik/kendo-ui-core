---
title: Use FontAwesome in Labels
page_title: Use FontAwesome in Labels | Kendo UI Charts
description: "Learn how to include FontAwesome icons in Kendo UI Chart labels."
slug: howto_fontawesomeicons_charts
---

# Use FontAwesome in Labels

Visual templates allow us to render font icons in Chart labels.

The Chart labels can't contain HTML markup. To get around this we can use visual templates and construct the labels using the [Drawing API](/framework/drawing).

In the example below, we'll construct two [Text](/api/javascript/drawing/text) shapes and position them in a [Layout](/api/javascript/drawing/layout).

The first Text element will contain the FontAwesome icon. The second one will be plain text label.

###### Example - Font Icons in Category Axis Labels

```html
    <!-- Include FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.css">

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          categories: ["Foo"],
          labels: {
            visual: function(e) {
              // Layout text elements. See:
              // http://docs.telerik.com/kendo-ui/api/javascript/drawing/layout
              var layout = new kendo.drawing.Layout(e.rect, {
                orientation: "horizontal",

                // Center the content
                justifyContent: "center",

                // Align items on center line
                alignItems: "center"
              });

              // Character codes for FontAwesome available here:
              // https://fortawesome.github.io/Font-Awesome/cheatsheet/
              //
              // For example:
              // [&#xf251;] becomes String.fromCharCode(0xf251)
              var star = new kendo.drawing.Text(String.fromCharCode(0xf005), [0, 0], {
                font: "14px FontAwesome"
              });

              // The category label
              var text = new kendo.drawing.Text(e.text, [0, 0], {
                font: "14px arial,sans-serif"
              });

              layout.append(star, text);

              // Execute layout
              layout.reflow();

              return layout;
            }
          }
        },
        series: [{
          data: [1]
        }]
      });
    </script>
```

## See Also

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [Embed Font Awesome in Exported PDF]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
* [Drawing API / Layout](/api/javascript/drawing/layout)
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Shorten Chart Labels]({% slug howto_shortenchartlabels_charts %})
