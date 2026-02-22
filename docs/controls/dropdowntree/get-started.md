---
title: Getting Started
page_title: jQuery DropDownTree Documentation - Getting Started with the DropDownTree
description: "Get started with the jQuery DropDownTree by Kendo UI and learn how to create, initialize, and enable the component."
components: ["dropdowntree"]
slug: getting_started_kendoui_dropdowntree_widget
position: 1
---

# Getting Started with the DropDownTree

This guide demonstrates how to get up and running with the Kendo UI for jQuery DropDownTree.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
   <input id="dropdowntree" />

	<script>
        var items = [
            { text: "Mail", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
            { text: "Search", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/search.png" }
        ];
        $("#dropdowntree").kendoDropDownTree({
            dataImageUrlField: "image",
            dataSource: items,
            checkboxes:true,
            tagMode:"single"
        });
    </script>
```

## 1. Create an Input Element

First, create an `<input>` element on the page from which the DropDownTree component will be initialized. 

```html
<input id="dropdowntree" />
```

## 2. Initialize the DropDownTree 

In this step, you will initialize the DropDownTree from the `<input>` element. All settings of the DropDownTree will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.


```html
<input id="dropdowntree" />

<script>
    // Target the input element by using jQuery and then call the kendoDropDownTree() method.
    $("#dropdowntree").kendoDropDownTree();
</script>
```

Once the basic initialization is completed, you can start adding further configurations to the DropDownTree. 

## 3. Bind the DropDownTree to Data

You can bind the DropDownTree to local and remote data. For further information, check the [Data Binding]({% slug databinding_kendoui_dropdowntree %}) section. In the example below, the DropDownTree is bound to a local data array.

```html
<input id="dropdowntree" />

<script>
    var items = [
        { text: "Mail", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
        { text: "Search", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/search.png" }
    ];
    $("#dropdowntree").kendoDropDownTree({
        dataSource: items
    });
</script>
```

## 4. Display Icons 

By using the [`dataImageUrlField`](/api/javascript/ui/dropdowntree/configuration/dataimageurlfield) option, you can display icons next to the items. The field needs to be specified in the `items` array.

```html
<input id="dropdowntree" />

<script>
    var items = [
        { text: "Mail", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
        { text: "Search", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/search.png" }
    ];
    $("#dropdowntree").kendoDropDownTree({
        dataImageUrlField: "image",
        dataSource: items
    });
</script>
```

## 5. Set the Tag Mode Option

The DropDownTree supports both single and multiple (default) tag modes. The example below shows how to switch to single tag mode. The [`checkboxes`](/api/javascript/ui/dropdowntree/configuration/checkboxes) option must be enabled.

```html
<input id="dropdowntree" />

<script>
    var items = [
        { text: "Mail", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/mail.png" },
        { text: "Search", image: "https://demos.telerik.com/kendo-ui/content/web/treeview/search.png" }
    ];
    $("#dropdowntree").kendoDropDownTree({
        dataImageUrlField: "image",
        dataSource: items,
        checkboxes:true,
        tagMode:"single"
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the DropDownTree](https://demos.telerik.com/kendo-ui/dropdowntree/index)

## See Also 

* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/datepicker)
* [Knowledge Base Section](/knowledge-base)

