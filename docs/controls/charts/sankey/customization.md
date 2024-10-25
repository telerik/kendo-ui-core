---
title: Customization
page_title: jQuery Sankey Diagram Documentation - Customization
description: "Get started with the jQuery Sankey Chaarts by Kendo UI and learn how to customize the component."
slug: customization_kendoui_sankeychart
position: 3
---

# Customization

You can configure the labels, nodes, and links displayed on the Sankey Diagram by using the following properties:

 - [`links`](/api/javascript/dataviz/ui/sankey/configuration/links)&mdash;Provides options to set the [`colorType`](/api/javascript/dataviz/ui/sankey/configuration/links.colortypes) of the link to either `static`, `source`, or `target`. It also allows you to control the opacity and highlighting of the link.
 - [`nodes`](/api/javascript/dataviz/ui/sankey/configuration/nodes)&mdash;Provides options to modify the `color`, `opacity`, `offset`, `padding`, and `width` of the node.
 - [`labels`](/api/javascript/dataviz/ui/sankey/configuration/labels)&mdash;Provides options to modify the `font`, `color`, and `opacity` of the label. It also allows you to set the `visible` property to show or hide the label.

## Configure the Link Colors

The Sankey diagram provides different [`colorTypes`](/api/javascript/dataviz/ui/sankey/configuration/links.colortypes) of the links. The supported values are:

 * `static`&mdash;The color is static and is determined by the link's color option.
 * `source`&mdash;The link color is the same as the source node color.
 * `target`&mdash;The link color is the same as the target node color.

The example below demonstrates the different [`colorTypes`](/api/javascript/dataviz/ui/sankey/configuration/links.colortypes). You can select a `colorType` from the DropDownList at the top:

```dojo
    <input type="text" id="ddl" />
    <div id="sankey"></div>
    <script>
      $(document).ready(function() {
        const data = {
          nodes: [
            {
              id: "female",
              label: {
                text: "Female (58%)",
              },
            },
            {
              id: "male",
              label: {
                text: "Male (42%)",
              },
            },
            {
              id: "tablet",
              label: {
                text: "Tablet (12%)",
              },
            },
            {
              id: "mobile",
              label: {
                text: "Mobile (40%)",
              },
              offset: {
                left: 20,
              },
            },
            {
              id: "desktop",
              label: {
                text: "Desktop (48%)",
              },
            },
            {
              id: "< 18",
              label: {
                text: "< 18 years (8%)",
              },
            },
            {
              id: "18-26",
              label: {
                text: "18-26 years (35%)",
              },
            },
            {
              id: "27-40",
              label: {
                text: "27-40 years (38%)",
              },
            },
            {
              id: "> 40",
              label: {
                text: "> 40 years (19%)",
              },
            },
          ],
          links: [
            {
              sourceId: "female",
              targetId: "tablet",
              value: 12,
              color: "#317773",
            },
            {
              sourceId: "female",
              targetId: "mobile",
              value: 14,
            },
            {
              sourceId: "female",
              targetId: "desktop",
              value: 32,
            },
            {
              sourceId: "male",
              targetId: "mobile",
              value: 26,
            },
            {
              sourceId: "male",
              targetId: "desktop",
              value: 16,
            },
            {
              sourceId: "tablet",
              targetId: "< 18",
              value: 4,
            },
            {
              sourceId: "tablet",
              targetId: "> 40",
              value: 8,
            },
            {
              sourceId: "mobile",
              targetId: "< 18",
              value: 4,
            },
            {
              sourceId: "mobile",
              targetId: "18-26",
              value: 24,
            },
            {
              sourceId: "mobile",
              targetId: "27-40",
              value: 10,
            },
            {
              sourceId: "mobile",
              targetId: "> 40",
              value: 2,
            },
            {
              sourceId: "desktop",
              targetId: "18-26",
              value: 11,
            },
            {
              sourceId: "desktop",
              targetId: "27-40",
              value: 28,
            },
            {
              sourceId: "desktop",
              targetId: "> 40",
              value: 9,
            },
          ],
        };

        const element = $("#sankey").css({ width: 900, height: 600}).kendoSankey({
          title: {
            text: 'Sankey Diagram'
          },
          links: { colorType: 'target' },
          data: data
        });

        const sankey = element.getKendoSankey();

        let ddl = $('#ddl').kendoDropDownList({
          optionLabel: 'Select links colortype',
          dataSource: {
            data: ["static", "source", "target"]
          },
          change: function(e){
            sankey.setOptions({
              links: { colorType: e.sender.value() },
            });
          }
        }).data('kendoDropDownList')
     });
    </script>
```

## Customizing Specific Node or Link

As the properties set to [`data`](/api/javascript/dataviz/ui/sankey/configuration/data) take precedence, using the `data` property allows you to target a single node or link and apply a specific configuration only to that element.

The demo below shows how to configure and use the `data` prop to:

 - Change the color of the first link.
 - Change the offset of the node with the label text **Мobile**.

 ```dojo
    <div id="sankey"></div>
    <script>  
      $(document).ready(function() {
        const data = {
          nodes: [
            {
              id: "female",
              label: {
                text: "Female (58%)",
              },
            },
            {
              id: "male",
              label: {
                text: "Male (42%)",
              },
            },
            {
              id: "tablet",
              label: {
                text: "Tablet (12%)",
              },
            },
            {
              id: "mobile",
              label: {
                text: "Mobile (40%)",
              },
              offset: {
                left: 50,
              },
            },
            {
              id: "desktop",
              label: {
                text: "Desktop (48%)",
              },
            },
            {
              id: "< 18",
              label: {
                text: "< 18 years (8%)",
              },
            },
            {
              id: "18-26",
              label: {
                text: "18-26 years (35%)",
              },
            },
            {
              id: "27-40",
              label: {
                text: "27-40 years (38%)",
              },
            },
            {
              id: "> 40",
              label: {
                text: "> 40 years (19%)",
              },
            },
          ],
          links: [
            {
              sourceId: "female",
              targetId: "tablet",
              value: 12,
              color: "darkblue",
            },
            {
              sourceId: "female",
              targetId: "mobile",
              value: 14,
            },
            {
              sourceId: "female",
              targetId: "desktop",
              value: 32,
            },
            {
              sourceId: "male",
              targetId: "mobile",
              value: 26,
            },
            {
              sourceId: "male",
              targetId: "desktop",
              value: 16,
            },
            {
              sourceId: "tablet",
              targetId: "< 18",
              value: 4,
            },
            {
              sourceId: "tablet",
              targetId: "> 40",
              value: 8,
            },
            {
              sourceId: "mobile",
              targetId: "< 18",
              value: 4,
            },
            {
              sourceId: "mobile",
              targetId: "18-26",
              value: 24,
            },
            {
              sourceId: "mobile",
              targetId: "27-40",
              value: 10,
            },
            {
              sourceId: "mobile",
              targetId: "> 40",
              value: 2,
            },
            {
              sourceId: "desktop",
              targetId: "18-26",
              value: 11,
            },
            {
              sourceId: "desktop",
              targetId: "27-40",
              value: 28,
            },
            {
              sourceId: "desktop",
              targetId: "> 40",
              value: 9,
            },
          ],
        };

        const element = $("#sankey").css({ maxWidth: 700, height: 300}).kendoSankey({          
          data: data
        });
      });
    </script>
 ```

## See Also

* [Basic Usage of the Sankey (Demo)](https://demos.telerik.com/kendo-ui/sankey-charts/index)
* [JavaScript API Reference of the Sankey](/api/javascript/dataviz/ui/sankey)
