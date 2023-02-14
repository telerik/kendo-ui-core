---
title: Use FontAwesome Icons in Chart Labels
page_title: Use FontAwesome Icons in Chart Labels
description: "Learn how to include FontAwesome icons in Kendo UI Chart labels."
previous_url: /controls/charts/how-to/font-awesome-icons, /controls/charts/how-to/appearance/font-awesome-icons
slug: howto_fontawesomeicons_charts
tags: chart, use, fontawesome, icons, labels
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

As the Chart labels cannot contain HTML markup, how am I supposed to implement FontAwesome icons by using CSS styles?

## Solution

To achieve the desired scenario, use either of the following options:
* [Apply Unicode code points](#applying-unicode-code-points)
* [Render custom visuals](#rendering-custom-visuals)

### Applying Unicode Code Points

Using the Unicode symbols from the font directly is the most common approach to achieve this behavior. However, an obvious drawback is that you are limited to FontAwesome for the entire label.

#### Series Labels

The following example demonstrates how to use FontAwesome icons in series labels with Unicode.

```dojo
    <!-- Include FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css">

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        categoryAxis: {
          categories: ["Foo"],
          labels: {
            font: "16px FontAwesome",

            // Character codes for FontAwesome available here:
            // https://fortawesome.github.io/Font-Awesome/cheatsheet/
            //
            // For example:
            // [&#xf251;] becomes String.fromCharCode(0xf251)
            template: String.fromCharCode(0xf005) + " #: value #"
          }
        },
        series: [{
          data: [1]
        }]
      });
    </script>
```

#### Series Notes

The following example demonstrates how to use FontAwesome icons in series notes with Unicode.

```dojo
    <!-- Include FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css">

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        dataSource: {
          data: [{
            value: 1,
            noteText: "A"
          }, {
            value: 2,
            noteText: "B"
          }]
        },
        series: [{
          field: "value",
          noteTextField: "noteText",
          type: "line",
          notes: {
            label: {
              font: "30px FontAwesome",
              margin: { right: 5 },

              // Character codes for FontAwesome are available at
              // https://fortawesome.github.io/Font-Awesome/cheatsheet/
              //
              // For example,
              // [&#xf251;] becomes String.fromCharCode(0xf251)
              template: String.fromCharCode(0xf2ac)
            },
            icon: {
              visible: false
            }
          }
        }]
      });
    </script>
```

### Rendering Custom Visuals

Visual templates are the most flexible way to override the rendering of the Chart elements. They allow you to construct the labels by using the [Drawing API]({% slug overview_kendoui_drawingapi %}).

The following example demonstrates how to construct a visual that uses two [Text](/api/javascript/drawing/text) shapes and to position them in a [Layout](/api/javascript/drawing/layout). The first `Text` element contains the FontAwesome icon. The second one is a plain text label.

```dojo
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
              // https://docs.telerik.com/kendo-ui/api/javascript/drawing/layout
              var layout = new kendo.drawing.Layout(e.rect, {
                orientation: "horizontal",

                // Center the content
                justifyContent: "center",

                // Align items on center line
                alignItems: "center",

                // Leave some space between the elements
                spacing: 5
              });

              // Character codes for FontAwesome are available at
              // https://fortawesome.github.io/Font-Awesome/cheatsheet/
              //
              // For example,
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

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [API Reference of the Drawing layout](/api/javascript/drawing/layout)
* [How to Embed Font Awesome in Exported PDF]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
