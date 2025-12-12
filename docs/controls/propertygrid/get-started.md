---
title: Getting Started
page_title: jQuery PropertyGrid Documentation - Getting Started with the PropertyGrid
description: "Get started with the jQuery PropertyGrid by Kendo UI and learn how to create, initialize, and enable the component."
components: ["propertygrid"]
slug: getting_started_kendoui_propertygrid_widget
position: 1
---

# Getting Started with the PropertyGrid

This guide demonstrates how to get up and running with the Kendo UI for jQuery PropertyGrid.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="propertyGrid"></div>

    <script>
      $(document).ready(function () {
        var items = [
		    	{ field: "size", group: "Kendo UI/Telerik", editor: "DropDownList", editorOptions: { dataSource: ["small", "medium", "large", "none"] }, description: 'Controls     the overall physical size of a button. Default value is "medium".' },
		    	{ field: "fillMode", group: "Kendo UI/Telerik", editor: "DropDownList", editorOptions: { dataSource: ["solid", "outline", "flat", "link", "clear", "none"] },     description: 'Controls how the color is applied to the button. Default value is "solid".' },
		    	{ field: "themeColor", group: "Kendo UI/Telerik", editor: "DropDownList", editorOptions: { dataSource: ["base", "primary", "secondary", "tertiart", "info",     "warning", "success", "error", "dark", "light", "inverse", "none"] }, description: 'Controls the main color applied to the button.' },			
		    	{
		    		field: "font",
		    		group: "HTML",
		    		template: "&nbsp;",
		    		items: [
		    			{
		    				field: "font-weight",
		    				editor: "NumericTextBox",
		    				editorOptions: {
		    					min: 100, max: 900, step: 100
		    				},
		    				validation: { required: true }
		    			},
		    			{
		    				field: "font-family",
		    				editor: "AutoComplete",
		    				editorOptions: {
		    					dataSource: ["Arial", "Roboto", "Georgia", "Calibri", "Cursive", "Monospace", "Fantasy"]
		    				},
		    				validation: { required: true }
		    			}
		    		],
		    	}
		    ];

		    var obj = {
		    	size: "medium",
		    	fillMode: "solid",
		    	themeColor: "success",
		    	font: {
		    		"font-weight": 400,
		    		"font-family": "Roboto"
		    	}
		    };

		    $("#propertyGrid").kendoPropertyGrid({
		    	model: obj,
		    	items: items,
		    	width: 550,
		    	height: 450,
		    	columns: {
		    		fieldColumn: { width: 200 },
		    		valueColumn: { width: 300 },
		    	}
		    })
      });
    </script>
```

## 1. Create a PropertyGrid Element

First, create an empty `<div>` element that you will use to initialize the component.

```html
<div id="propertygrid"></div>
```

## 2. Initialize the PropertyGrid

In this step, you will initialize the PropertyGrid from the `<div>` element.

```html
<div id="propertygrid"></div>

<script>
    // Target the propertygrid element by using jQuery and then call the kendoPropertyGrid() method.
    $("#propertygrid").kendoPropertyGrid({
        // Add some basic configurations such as resizable.
        resizable: true,
        height: 450,
        width: 500
    });
</script>
```
## 3. Configure the Columns in the PropertyGrid

Once the basic initialization is completed, you can start adding additional configurations to the PropertyGrid. The PropertyGrid provides a [`columns`](/api/javascript/ui/propertygrid/configuration/columns) configuration option that allows you to configure the field and value columns configuration options.

```html
<div id="propertygrid"></div>

<script>
    // Target the propertygrid element by using jQuery and then call the kendoPropertyGrid() method.
    $("#propertygrid").kendoPropertyGrid({        
        resizable: true,
        height: 450,
        width: 500,
        columns: {
			  	fieldColumn: { width: 200 },
			  	valueColumn: { width: 300 }
			  }
    });
</script>
```


## 4. Bind the PropertyGrid to Its Items

One of the most important configuration is the [`items`](/api/javascript/ui/propertygrid/configuration/items). The `items` option allows you to configure the properties of the model. You can set a group and description or configure the editor according to the requirements. 

```html
    <div id="propertygrid"></div>

    <script>
      var items = [
		  	{ field: "size", group: "Kendo UI/Telerik", editor: "DropDownList", editorOptions: { dataSource: ["small", "medium", "large", "none"] }, description: 'Controls   the overall physical size of a button. Default value is "medium".' },
		  	{ field: "fillMode", group: "Kendo UI/Telerik", description: 'Controls how the color is applied to the button. Default value is "solid".' },
		  	{ field: "enable", group: "Kendo UI/Telerik", description: 'Controls if the component will be enabled or disabled.' },			
		  	{
		  		field: "font",
		  		group: "HTML",
		  		template: "&nbsp;",
		  		items: [
		  			{
		  				field: "font-weight",
		  				editor: "NumericTextBox",
		  				editorOptions: {
		  					min: 100, max: 900, step: 100
		  				},
		  				validation: { required: true }
		  			},
		  			{
		  				field: "font-family",
		  				editor: "AutoComplete",
		  				editorOptions: {
		  					dataSource: ["Arial", "Roboto", "Georgia"]
		  				},
		  				validation: { required: true }
		  			}
		  		],
		  	}
		  ];

      $("#propertygrid").kendoPropertyGrid({        
        resizable: true,
        height: 450,
        width: 500,
        columns: {
			  	fieldColumn: { width: 200 },
			  	valueColumn: { width: 300 }
			  },
        items: items
      });
    </script>
```

## 5. Define the Model in the PropertyGrid

The PropertyGrid allows you to define the [`model`](/api/javascript/ui/propertygrid/configuration/model) to which you bind the component.

```html
    <div id="propertygrid"></div>

    <script>
      var obj = {
		  	size: "medium",
		  	fillMode: "solid",
		  	enable: true,
		  	font: {
		  		"font-weight": 400,
		  		"font-family": "Roboto"
		  	}
		  };

      var items = [
		  	{ field: "size", group: "Kendo UI/Telerik", editor: "DropDownList", editorOptions: { dataSource: ["small", "medium", "large", "none"] }, description: 'Controls   the overall physical size of a button. Default value is "medium".' },
		  	{ field: "fillMode", group: "Kendo UI/Telerik", description: 'Controls how the color is applied to the button. Default value is "solid".' },
		  	{ field: "enable", group: "Kendo UI/Telerik", description: 'Controls if the component will be enabled or disabled.' },			
		  	{
		  		field: "font",
		  		group: "HTML",
		  		template: "&nbsp;",
		  		items: [
		  			{
		  				field: "font-weight",
		  				editor: "NumericTextBox",
		  				editorOptions: {
		  					min: 100, max: 900, step: 100
		  				},
		  				validation: { required: true }
		  			},
		  			{
		  				field: "font-family",
		  				editor: "AutoComplete",
		  				editorOptions: {
		  					dataSource: ["Arial", "Roboto", "Georgia"]
		  				},
		  				validation: { required: true }
		  			}
		  		],
		  	}
		  ];

      $("#propertygrid").kendoPropertyGrid({        
        resizable: true,
        height: 450,
        width: 500,
        columns: {
			  	fieldColumn: { width: 200 },
			  	valueColumn: { width: 300 }
			  },
        items: items,
        model: obj
      });
    </script>
```

## 6. Enable the ContextMenu

The PropertyGrid allows you to configure and customize the [`ContextMenu`](/api/javascript/ui/propertygrid/configuration/contextmenu) that will render on right-click on the cells. By default, the ContextMenu is disabled.
The example below demonstrates how the default ContextMenu can be enabled. You can check the full list with the available options in the [`API`](/api/javascript/ui/propertygrid/configuration/contextmenu). 


```html
    <div id="propertygrid"></div>

    <script>
      var obj = {
		  	size: "medium",
		  	fillMode: "solid",
		  	enable: true,
		  	font: {
		  		"font-weight": 400,
		  		"font-family": "Roboto"
		  	}
		  };

      var items = [
		  	{ field: "size", group: "Kendo UI/Telerik", editor: "DropDownList", editorOptions: { dataSource: ["small", "medium", "large", "none"] }, description: 'Controls   the overall physical size of a button. Default value is "medium".' },
		  	{ field: "fillMode", group: "Kendo UI/Telerik", description: 'Controls how the color is applied to the button. Default value is "solid".' },
		  	{ field: "enable", group: "Kendo UI/Telerik", description: 'Controls if the component will be enabled or disabled.' },			
		  	{
		  		field: "font",
		  		group: "HTML",
		  		template: "&nbsp;",
		  		items: [
		  			{
		  				field: "font-weight",
		  				editor: "NumericTextBox",
		  				editorOptions: {
		  					min: 100, max: 900, step: 100
		  				},
		  				validation: { required: true }
		  			},
		  			{
		  				field: "font-family",
		  				editor: "AutoComplete",
		  				editorOptions: {
		  					dataSource: ["Arial", "Roboto", "Georgia"]
		  				},
		  				validation: { required: true }
		  			}
		  		],
		  	}
		  ];

      $("#propertygrid").kendoPropertyGrid({        
          resizable: true,
          height: 450,
          width: 500,
          columns: {
		  	  	fieldColumn: { width: 200 },
		  	  	valueColumn: { width: 300 }
		  	  },
          contextMenu: true,
          items: items,
          model: obj
        });
      </script>
```


## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the PropertyGrid](https://demos.telerik.com/kendo-ui/propertygrid/index)

## See Also 

* [JavaScript API Reference of the PropertyGrid](/api/javascript/ui/propertygrid)
* [Knowledge Base Section](/knowledge-base)


