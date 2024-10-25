---
title: Data Binding
page_title: jQuery Sankey Diagram Documentation - Data Binding
description: 'Learn how to bind your data to the Kendo UI for jQuery Sankey Diagram by using the provided data property.'
slug: data_binding_kendoui_sankeychart
position: 2
---

# Data Binding

You can bind the Sankey Diagram to data by using the component's [`data`](/api/javascript/dataviz/ui/sankey/configuration/data) property. The data object contains the Sankey nodes and links configuration.

## Binding to SankeyData

The following example demonstrates how to set the [`data`](/api/javascript/dataviz/ui/sankey/configuration/data) property. 

```dojo
    <div id="sankey"></div>

    <script>
      $(document).ready(function () {
        var data = {
          nodes: [
            {
              id: "female",
              label: {
                text: "Female (58%)",
              },
            },
            {
              id: "male",
              color: 'yellow',
              label: {
                text: "Male (42%)",
              },
            },			
            {
              id: "< 18",
              label: {
                text: "< 18 years (8%)",
              },
            },
            {
              id: "18-55",
              label: {
                text: "18-55 years (35%)",
              },
            },
            {
              id: "> 55",
              label: {
                text: "> 55 years (19%)",
              },
            },
          ],
          links: [
            {
              sourceId: "female",
              targetId: "< 18",
              value: 12,
            },
            {
              sourceId: "female",
              targetId: "18-55",
              value: 32,
            },
            {
              sourceId: "female",
              targetId: "> 55",
              value: 12,
            },        
            {
              sourceId: "male",
              targetId: "< 18",
              value: 26,
            },  {
              sourceId: "male",
              targetId: "18-55",
              value: 58,
            },
            {
              sourceId: "male",
              targetId: "> 55",
              value: 24,
            }
          ],
        };
        const element = $("#sankey").kendoSankey({			
          data: data
        });

      });
    </script>
```

## Binding to Flat Data

When the data is present as an array of objects, it needs to be transformed to the `SankeyData` format.

This is achieved in the below example using the `createSankeyData` method. It takes an array of data, `dimensions`, and `measure` as input parameters and returns an object that conforms to the `SankeyData` interface. The `dimensions` refer to the Sankey `nodes` while the `measure` refers to the value that will be used to set the value of the `links`.

```dojo
    <div id="sankey"></div>
    <script>
    	$(document).ready(function () {
    		const trafficData = [
    		  {
    		    gender: "Female",
    		    device: "Tablet",
    		    age: "< 18",
    		    value: 4,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Tablet",
    		    age: "> 40",
    		    value: 8,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Mobile",
    		    age: "< 18",
    		    value: 4,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Mobile",
    		    age: "18-26",
    		    value: 24,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Mobile",
    		    age: "27-40",
    		    value: 10,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Mobile",
    		    age: "> 40",
    		    value: 2,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Desktop",
    		    age: "18-26",
    		    value: 11,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Desktop",
    		    age: "27-40",
    		    value: 28,
    		  },
    		  {
    		    gender: "Female",
    		    device: "Desktop",
    		    age: "> 40",
    		    value: 9,
    		  },
    		  {
    		    gender: "Male",
    		    device: "Mobile",
    		    age: "< 18",
    		    value: 4,
    		  },
    		  {
    		    gender: "Male",
    		    device: "Mobile",
    		    age: "18-26",
    		    value: 11,
    		  },
    		  {
    		    gender: "Male",
    		    device: "Mobile",
    		    age: "27-40",
    		    value: 28,
    		  },
    		  {
    		    gender: "Male",
    		    device: "Mobile",
    		    age: "> 40",
    		    value: 9,
    		  },
    		  {
    		    gender: "Male",
    		    device: "Desktop",
    		    age: "18-26",
    		    value: 11,
    		  },
    		  {
    		    gender: "Male",
    		    device: "Desktop",
    		    age: "27-40",
    		    value: 28,
    		  },
    		  {
    		    gender: "Male",
    		    device: "Desktop",
    		    age: "> 40",
    		    value: 9,
    		  },
    		];
    		const dimensions = [
    		  {
    		    value: (item) => item.gender,
    		  },
    		  {
    		    value: (item) => item.device,
    		  },
    		  {
    		    value: (item) => "Age " + item.age,
    		  },
    		];
    		const measure = {
    		  value: (item) => item.value,
    		};
    		const data = kendo.dataviz.createSankeyData(trafficData, dimensions, measure);
    		const element = $("#sankey").css({ width: 900, height: 300 }).kendoSankey({
    			theme: 'sass',
    			legend: {
                    position: "bottom"
                },
    			style: {
    				maxWidth: 700,
    				height: 250,
    				margin: "auto"
    			},
    			links: { colorType: 'source' },
    			data: data
    		});
    	});
    </script>
```

## Customize Nodes from Flat Data

To [customize the element instances]({% slug customization_kendoui_sankeychart %}#customizing-specific-node-or-link) when the data is an array of objects, transform the `data` that stores the returned value of the `createSankeyData` method.

The following example demonstrates this approach by mapping the `data.nodes` to set the color to `lightblue` for the nodes with an even id, and `lightgreen` for the nodes with an odd id.

```dojo
	<div id="sankey"></div>
    <script>  
      $(document).ready(function() {
        const trafficData = [
          {
            gender: "Female",
            device: "Tablet",
            age: "< 18",
            value: 4,
          },
          {
            gender: "Female",
            device: "Tablet",
            age: "> 40",
            value: 8,
          },
          {
            gender: "Female",
            device: "Mobile",
            age: "< 18",
            value: 4,
          },
          {
            gender: "Female",
            device: "Mobile",
            age: "18-26",
            value: 24,
          },
          {
            gender: "Female",
            device: "Mobile",
            age: "27-40",
            value: 10,
          },
          {
            gender: "Female",
            device: "Mobile",
            age: "> 40",
            value: 2,
          },
          {
            gender: "Female",
            device: "Desktop",
            age: "18-26",
            value: 11,
          },
          {
            gender: "Female",
            device: "Desktop",
            age: "27-40",
            value: 28,
          },
          {
            gender: "Female",
            device: "Desktop",
            age: "> 40",
            value: 9,
          },
          {
            gender: "Male",
            device: "Mobile",
            age: "< 18",
            value: 4,
          },
          {
            gender: "Male",
            device: "Mobile",
            age: "18-26",
            value: 11,
          },
          {
            gender: "Male",
            device: "Mobile",
            age: "27-40",
            value: 28,
          },
          {
            gender: "Male",
            device: "Mobile",
            age: "> 40",
            value: 9,
          },
          {
            gender: "Male",
            device: "Desktop",
            age: "18-26",
            value: 11,
          },
          {
            gender: "Male",
            device: "Desktop",
            age: "27-40",
            value: 28,
          },
          {
            gender: "Male",
            device: "Desktop",
            age: "> 40",
            value: 9,
          },
        ];
        const dimensions = [
          {
            value: (item) => item.gender,
          },
          {
            value: (item) => item.device,
          },
          {
            value: (item) => "Age " + item.age,
          },
        ];
        const measure = {
          value: (item) => item.value,
        };

        const data = kendo.dataviz.createSankeyData(trafficData, dimensions, measure);

        const links = {
          colorType: "source",
        };
        const sankeyData = {
          ...data,
          nodes: data.nodes.map((node) => {
            if (node.id % 2 === 0) {
              node.color = "lightblue";
            } else {
              node.color = "lightgreen";
            }
            return node;
          }),
        };

        const element = $("#sankey").css({ maxWidth: 700, height: 300}).kendoSankey({          
          data: sankeyData,
          links: links
        });
      });
    </script>
```

## Suggested Links


* [JavaScript API Reference of the Sankey](/api/javascript/dataviz/ui/sankey)
