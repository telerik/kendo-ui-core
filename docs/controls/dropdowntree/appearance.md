---
title: Appearance
page_title: jQuery DropDownTree Documentation - Appearance
description: "Get started with the jQuery DropDownTree by Kendo UI and set the width of the list and popup of the widget."
slug: appearance_kendoui_dropdowntree
position: 7
---

# Appearance

> As of Kendo UI R1 2022, the jQuery DropDownTree widget has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI DropDownTree.
For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the DropDownTree](https://demos.telerik.com/kendo-ui/dropdowntree/appearance).

## Options

The Kendo UI DropDownTree supports the following styling options:

- [`size`](#size)—configures the overall size of the widget.
- [`rounded`](#rounded)—configures the border radius.
- [`fillMode`](#fillMode)—controls how the color is applied.

### Size

The `size` option controls how big or small the DropDownTree looks. The structure of the class for a Single Selection DropDownTree is `k-picker-{size}`. The structure of the class in Multiple Selection mode is `k-input-{size}`. The option also affects the `span.k-chip` element through the `k-chip-{size}` class.

The following values are available for the [`size`](/api/javascript/ui/dropdowntree/configuration/size) option:

- `sm`—small size
- `md`—medium size (default)
- `lg`—large size
- `none`—unset

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="dropdowntree" />

<script>
    $("#dropdowntree").kendoDropDownTree({
        size:"large",
        dataSource: {
            data: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        }
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-outline k-picker-lg k-rounded-lg">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-outline k-dropdowntree-clearable k-input-lg k-rounded-lg">
</span>
```

### Rounded

The `rounded` option controls how much border radius is applied to the widget. The structure of the class is `k-rounded-{size}`.

The following values are available for the [`rounded`](/api/javascript/ui/dropdowntree/configuration/rounded) option:

- `sm`—small border radius
- `md`—medium border radius
- `lg`—large border radius
- `full`—ellipse-like border radius
- `none`—unset

The default value is `full` and it is applied to the wrapping `span.k-dropdowntree` element that contains the whole HTML through the `k-rounded-full` class.

The example below shows a basic DropDownTree configuration and how to set `rounded` to "medium":

```dojo
<input id="dropdowntree" />

<script>
    $("#dropdowntree").kendoDropDownTree({
        rounded:"medium",
        dataSource: {
            data: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        }
    });
</script>
```

The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-dropdowntree-clearable k-picker-outline k-picker-lg k-rounded-md">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-lg k-dropdowntree-clearable k-input-outline  k-rounded-md k-state-border-down">
</span>
```

### FillMode

The `fillMode` option controls how the color is applied to the widget. The structure of the class is `k-picker-{fillMode}`.

The following values are available for the [`fillMode`](/api/javascript/ui/dropdowntree/configuration/fillmode) option:

- `solid`
- `flat`
- `outline`
- `none`

The default value is `solid` and it is applied to the `span.k-dropdowntree` element through the `k-picker-solid` class.

The example below shows a basic DropDownTree configuration and how to set `fillMode` to "outline":

```dojo
<input id="dropdowntree" />

<script>
    $("#dropdowntree").kendoDropDownTree({
        fillMode:"outline",
        dataSource: {
            data: [
                {
                    text: "foo", items: [
                        { text: "bar" }
                    ]
                }
            ]
        }
    });
</script>
```
The changes are applied to the `span.k-dropdowntree` wrapping element:

```html
<span class="k-dropdowntree k-picker k-picker-outline k-picker-md k-rounded-md k-dropdowntree-clearable">
</span>
```

The HTML when multiple selection is configured:

```html
<span class="k-dropdowntree k-input k-input-outline k-input-md k-dropdowntree-clearable k-rounded-md k-state-border-down">
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering. Some of the HTML elements rendered before are replaced with others in the new rendering.

Old Single Selection Rendering:

```html
 <span title="" class="k-widget k-dropdowntree k-dropdowntree-clearable k-state-border-down" unselectable="on"
    tabindex="0" aria-disabled="false" aria-haspopup="tree" aria-expanded="true"
    aria-owns="d5464a25-e452-4eee-bd7a-8aebcb918a00" role="listbox"
    aria-activedescendant="a18f7c00-9e73-4db1-ac81-b41bf193b1dc">
    <span unselectable="on" class="k-dropdown-wrap k-state-default k-active k-state-border-down">
        <span unselectable="on" class="k-input k-readonly" role="option" aria-selected="true"
            id="a18f7c00-9e73-4db1-ac81-b41bf193b1dc">Select ...</span>
        <span unselectable="on" class="k-clear-value k-hidden" title="clear" role="button" tabindex="-1">
            <span class="k-icon k-i-x"></span>
        </span>
        <span role="button" unselectable="on" class="k-select"
            aria-label="select"><span class="k-icon k-i-arrow-60-down"></span>
        </span></span>
    <input id="dropdowntree" style="width: 100%; display: none;" data-role="dropdowntree">
</span>
```

New Single Selection Rendering:

```html
<span class="k-dropdowntree k-picker k-picker-solid k-picker-md k-rounded-md k-dropdowntree-clearable k-hover"
        unselectable="on" tabindex="0" aria-disabled="false" aria-haspopup="tree" aria-expanded="false"
        aria-owns="d380d0fa-2f21-4d11-90bf-d21226c147a6" role="listbox"
        aria-activedescendant="de8203cb-189a-4341-92aa-d7337a65ece4" style="">
    <span unselectable="on"
    class="k-input-inner k-readonly" role="option" aria-selected="true"
    id="de8203cb-189a-4341-92aa-d7337a65ece4">Select ...</span>
    <span unselectable="on" class="k-clear-value k-hidden" title="clear" role="button" tabindex="-1"><span
        class="k-icon k-i-x"></span>
    </span>
    <button unselectable="on"
        class="k-select k-input-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-icon-button"
        aria-label="select"><span class="k-icon k-i-arrow-60-down k-button-icon"></span>
    </button>
    <input id="dropdowntree" data-role="dropdowntree" style="display: none;">
</span>
```

Old Multiple Selection Rendering:

```html
 <div class="k-widget k-dropdowntree k-dropdowntree-clearable" unselectable="on" title=""
    aria-owns="dace9881-3aee-4a51-8940-8c3278b77ff1" tabindex="0" aria-disabled="false" aria-haspopup="tree"
    aria-expanded="false" role="listbox" aria-multiselectable="true"
    aria-describedby="d69ca64c-e5d4-4a63-abd5-01065574092c_tagList" style="width: 100%;">
    <div class="k-multiselect-wrap k-floatwrap" unselectable="on">
        <ul unselectable="on" data-template="tagTemplate" data-bind="source: tags" class="k-reset"
            id="d69ca64c-e5d4-4a63-abd5-01065574092c_tagList" data-stop="true" role="none">
            <li class="k-button " unselectable="on" role="option" aria-selected="true"><span
                    unselectable="on">Sofas</span><span aria-hidden="true" title="delete" aria-label="delete"
                    class="k-select"><span class="k-icon k-i-close"></span></span></li>
        </ul><span unselectable="on" class="k-input k-readonly" role="option" aria-selected="true"
            style="display: none;">Select ...</span><span unselectable="on" class="k-clear-value" title="clear"
            role="button" tabindex="-1"><span class="k-icon k-i-x"></span></span>
    </div><input id="dropdowntree" style="width: 100%; display: none;" data-role="dropdowntree" multiple="multiple">
</div>
```

New Multiple Selection rendering:

```html
<span class="k-dropdowntree k-input k-input-solid k-input-md k-rounded-md k-dropdowntree-clearable k-hover"
        unselectable="on" title="" aria-owns="faa1c5a4-47ae-4e8a-b0c5-b8fa95443a5a" tabindex="0" aria-disabled="false"
        aria-haspopup="tree" aria-expanded="false" role="listbox" aria-multiselectable="true"
        aria-describedby="f809adf5-0db6-4945-a17a-9b408a9fd86b_tagList" style="">
    <select id="dropdowntree1"
        data-role="dropdowntree" multiple="multiple" style="display: none;"></select>
    <div unselectable="on" class="k-input-values k-chip-list k-chip-list-md" data-template="tagTemplate"
        data-bind="source: tags" id="f809adf5-0db6-4945-a17a-9b408a9fd86b_tagList" data-stop="true" role="none">
        <span unselectable="on" class="k-input-inner k-readonly" role="option" aria-selected="true"
            style="display: flex;">Select ...</span>
    </div>
    <span unselectable="on" class="k-clear-value" title="clear"
    role="button" tabindex="-1"><span class="k-icon k-i-x"></span></span>
</span>
```

With the previous versions, when the filtering was enabled, the search icon in the DropDownTree popup was rendered on the right side. With the new rendering, the search icon is rendered on the left side.

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

The following example showcases how to customize the styles of the **DropDownTree** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <input id="dropdowntree" style="width: 100%;" />
    <script>
      var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
      homogeneous = new kendo.data.HierarchicalDataSource({
        transport: {
          read: {
            url: serviceRoot + "/Employees",
            dataType: "jsonp"
          }
        },
        schema: {
          model: {
            id: "EmployeeId",
            hasChildren: "HasEmployees"
          }
        }
      });
     $("#dropdowntree").kendoDropDownTree({
        placeholder: "Select ...",
        dataSource: homogeneous,   
        filter: "contains",            
        noDataTemplate: 'No Data!',
        height: "auto",
        dataTextField: "FullName"
      });
    </script>
    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later*/ 
     .k-dropdowntree .k-input-inner, .k-popup-dropdowntree .k-input-inner{ /* customize the style input */
        background: lightyellow;
      }
     .k-treeview .k-treeview-item{ /* customize the style of the items in the popup */
        background: pink;
      }
     .k-treeview .k-treeview-leaf{ /* customize the styles of the items in the popup */
        background-color: #FFDFDD;
        border: 1px solid purple;
      }  
     .k-treeview .k-treeview-leaf-text{
        color: purple;
      }
     .k-treeview .k-selected{ /* customize the styles of the selected items in the popup */
        background-color: purple !important;
      }  
     .k-treeview .k-selected .k-treeview-leaf-text{ /* customize the text of the selected item in the popup */
        color: white;
      }
     /*customize nodataTemplate */
      .k-popup-dropdowntree .k-no-data{
        color: fuchsia !important;
        font-weight: bold;
      }
     /*  OLD RENDERING */
      /*  The style below will works with versions prior to R1 2022 */ 
     /* .k-item{ background: red; }  k-item will style the items in the DropDownTree with the old as well as with the new rendering */
     .k-dropdowntree .k-input, .k-popup-dropdowntree .k-input{
        background-color: salmon !important;
      }
     .k-popup-dropdowntree .k-textbox{
        background-color: #FED8B1;
      }
     .k-treeview .k-item .k-in{ /* customize the style of the items in the popup */
        color: orange;
        background-color: lightyellow;
      }
     .k-treeview .k-state-selected{ /* customize the styles of the selected items in the popup */
        background-color: #FED8B1 !important;
        border: 2px solid orange !important;
        color: brown !important;
      }
     .k-treeview .k-state-selected:hover{ /* customize the styles of the selected items in the popup */
        background-color: orange !important;
        color: white !important;
      }       
     /*customize nodataTemplate */
      .k-popup-dropdowntree .k-nodata{        
        color: red;
      }
    </style>
    </div>
```

The DropDownTree provides options for setting the widths of its [list](#setting-the-list-width) and [popup](#setting-the-popup-width).

## Setting the List Width

To customize the width of the DropDownTree list and change its dimensions, use the jQuery `width()` method.

    <input id="dropdowntree">

    <script>
    $(document).ready(function() {
        var dropdowntree = $("#dropdowntree").kendoDropDownTree({
        dataSource: [
            {
            text: "Item 1",
            items: [
                { text: "Item 1.1" },
                { text: "Item 1.2" }
            ]
            },
            { text: "Item 2" }
        ]
        }).data("kendoDropDownTree");

        dropdowntree.list.width(400);
    });
    </script>

## Setting the Popup Width

You can enable the `popup` element to automatically adjust its width according to the length of the item label it displays. When the `autoWidth` option is set to `true`, the popup will display the content on a single line and will not wrap it up.

    <input id="dropdowntree">

    <script>
    $(document).ready(function() {
        var dropdowntree = $("#dropdowntree").kendoDropDownTree({
        autoWidth: true,
        dataSource: [
            {
            text: "Item 1",
            items: [
                { text: "Item 1.1" },
                { text: "Item 1.2" }
            ]
            },
            { text: "Item 2" }
        ]
        }).data("kendoDropDownTree");
    });
    </script>

## See Also

* [Basic Usage of the DropDownTree (Demo)](https://demos.telerik.com/kendo-ui/dropdowntree/index)
* [JavaScript API Reference of the DropDownTree](/api/javascript/ui/dropdowntree)
