---
title: Use FontAwesome in Labels
page_title: Use FontAwesome in Labels | Kendo UI Charts
description: "Learn how to include FontAwesome icons in Kendo UI Chart labels."
slug: howto_fontawesomeicons_charts
---

# Use FontAwesome in Labels

The Chart labels cannot contain HTML markup, so you are not able to use FontAwesome via CSS styles. Below are listed the options to work around this.

## Apply Unicode Code Points

The simplest approach is to use the Unicode symbols from the font directly.

An obvious drawback is that you are limited to FontAwesome for the entire label.

### To Series Labels

The example below demonstrates how to use FontAwesome icons in series labels with Unicode.

###### Example

```html
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

### To Series Notes

The example below demonstrates how to use FontAwesome icons in series notes with Unicode.

###### Example

```html
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

## Render Custom Visuals

Visual templates are the most flexible way to override the rendering of the Chart elements. They allow you to construct the labels by using the [Drawing API]({% slug overview_kendoui_drawingapi %}).

The example below demonstrates how to construct a visual using two [Text](/api/javascript/drawing/text) shapes and position them in a [Layout](/api/javascript/drawing/layout). The first `Text` element contains the FontAwesome icon. The second one is a plain text label.

###### Example

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

Other articles and how-to examples on Kendo UI Charts:

* [Chart JavaScript API Reference](/api/javascript/dataviz/ui/chart)
* [How to Embed Font Awesome in Exported PDF]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
* [Drawing API: layout](/api/javascript/drawing/layout)
* [How to Display Checkboxes Next to Legend Items]({% slug howto_displaycheckboxes_nexttolegenditems_charts %})
* [How to Draw on Scatter Plots Surface]({% slug howto_drawonscatterplotssurface_charts %})
* [How to Render Custom Plot Bands]({% slug howto_rendercustomplotbands_charts %})
* [How to Shorten Chart Labels]({% slug howto_shortenchartlabels_charts %})
* [How to Use Linear Gradient As Background in Bars]({% slug howto_uselineargradient_inbars_charts %})

For more runnable examples on Kendo UI Charts, browse the [how-to articles]({% slug howto_createdynamicplotbands_charts %}).
