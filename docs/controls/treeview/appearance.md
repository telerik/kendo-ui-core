---
title: Appearance
page_title: jQuery TreeView Documentation - Appearance
description: "Learn how to apply different styling options to the TreeView widget."
slug: appearance_kendoui_treeview_widget
position: 5 
---

# Appearance

> As of Kendo UI R1 2022, the jQuery TreeView widget has new rendering and styling options.

In this article, you will find information about the rendering of the Kendo UI TreeView.

For additional information regarding the decision behind these changes, visit the [Styling Overview]({% slug components_rendering_overview %}) article.

For a live example, visit the [Appearance Demo of the TreeView](https://demos.telerik.com/kendo-ui/treeview/appearance).


### Size

The Kendo UI TreeView supports the `size` style option. The `size` option controls the overall size of the component. The structure of the class is `k-input-{size}`.

The following values are available for the [`size`](/api/javascript/ui/treeview/configuration/size) option:

- `sm`—small size
- `md`—medium size
- `lg`—large size
- `none`—unset

The default size value is `medium` and it is applied to the `div` wrapping element through the `k-treeview-md` class.

The example below shows a basic configuration and how to set `size` to "large":

```dojo
<input id="treeview" />
<script>
    $("#treeview").kendoTreeView({
      size: "large"
    });
</script>
```

Below is the HTML that is affected from the configuration. The changes are applied to the `div.k-treeview` wrapping element:

```html
<span class="k-treeview k-treeview-lg">
    ...
</span>
```

## Old vs New Rendering

Below you will find the differences between the old and the new rendering. 

Old Rendering:

```html
<div id="treeview-left" data-role="treeview" class="k-widget k-treeview" tabindex="0" role="tree" aria-busy="false"
    aria-activedescendant="treeview-left_tv_active">
    <ul class="k-group k-treeview-lines" role="none">
        <li role="treeitem" class="k-item k-first k-last" data-uid="a2bbf1df-e3d1-48b8-ac64-fec8a312c6ee"
            aria-selected="false" aria-expanded="true" data-expanded="true" aria-busy="false"
            id="treeview-left_tv_active">
            <div class="k-top k-bot"><span class="k-icon k-i-collapse"></span><span class="k-in">foo</span></div>
            <ul class="k-group" role="group" style="display: block;">
                <li role="treeitem" class="k-item k-last" data-uid="fa2f98ee-0bfe-4d6d-b8f5-7c7acfedb63a"
                    aria-selected="false" aria-disabled="true" aria-expanded="true" data-expanded="true"
                    aria-busy="false">
                    <div class="k-bot"><span class="k-icon k-i-collapse"></span><span
                            class="k-in k-disabled">bar</span></div>
                    <ul class="k-group" role="group" style="display: block;">
                        <li role="treeitem" class="k-item k-last" data-uid="dc2ec9eb-56d2-4178-9201-81180e31c929"
                            aria-selected="true" aria-expanded="false" data-expanded="false">
                            <div class="k-bot"><span class="k-in k-selected">baz</span></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```

New Rendering:

```html
<div id="treeview-left" data-role="treeview" class="k-treeview k-treeview-{size}" tabindex="0" role="tree"
    aria-busy="false">
    <ul class="k-group k-treeview-lines" role="none">
        <li role="treeitem" class="k-item k-treeview-item k-first k-last"
            data-uid="e023e8b6-c3ab-4bda-9590-21361b00ab4d" aria-selected="false" aria-expanded="true"
            data-expanded="true" aria-busy="false">
            <div class="k-treeview-top k-treeview-bot"><span class="k-treeview-toggle"><span
                        class="k-icon k-i-collapse"></span></span><span class="k-treeview-leaf k-in"><span
                        class="k-treeview-leaf-text">foo</span></span></div>
            <ul class="k-group k-treeview-group" role="group" style="display: block;">
                <li role="treeitem" class="k-item k-treeview-item k-last"
                    data-uid="c86b0972-66ca-4bdc-adf1-6a2dcceb2198" aria-selected="false" aria-disabled="true"
                    aria-expanded="true" data-expanded="true" aria-busy="false">
                    <div class="k-treeview-bot"><span class="k-treeview-toggle"><span
                                class="k-icon k-i-collapse"></span></span><span
                            class="k-treeview-leaf k-in k-disabled"><span class="k-treeview-leaf-text">bar</span></span>
                    </div>
                    <ul class="k-group k-treeview-group" role="group" style="display: block;">
                        <li role="treeitem" class="k-item k-treeview-item k-last"
                            data-uid="e6b9f504-57ee-42b9-8898-bb1ca050d535" aria-selected="true" aria-expanded="false"
                            data-expanded="false">
                            <div class="k-treeview-bot"><span class="k-treeview-leaf k-in k-selected"><span
                                        class="k-treeview-leaf-text">baz</span></span></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```

Old Rendering with Checkboxes:

```html
<div id="treeview-left" data-role="treeview" class="k-widget k-treeview" tabindex="0" role="tree" aria-busy="false" aria-activedescendant="treeview-left_tv_active">
   <ul class="k-group k-treeview-lines" role="none">
      <li role="treeitem" class="k-item k-first k-last" data-uid="df2c744f-fbe9-4935-878f-b36d5cc97ccb" aria-checked="false" aria-selected="false" aria-expanded="true" data-expanded="true" aria-busy="false">
         <div class="k-top k-bot"><span class="k-icon k-i-collapse"></span>
		 <span class="k-checkbox-wrapper" role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" id="_df2c744f-fbe9-4935-878f-b36d5cc97ccb" class="k-checkbox"><span class="k-checkbox-label checkbox-span"></span></span><span class="k-in">foo</span></div>
         <ul class="k-group" role="group" style="display: block; overflow: visible; height: auto;">
            <li role="treeitem" class="k-item k-last" data-uid="f0a5ce33-57f1-45ba-ae1d-2e652d0a4705" aria-checked="false" aria-selected="false" aria-expanded="true" data-expanded="true" aria-busy="false">
               <div class="k-bot"><span class="k-icon k-i-collapse"></span><span class="k-checkbox-wrapper" role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" id="_f0a5ce33-57f1-45ba-ae1d-2e652d0a4705" class="k-checkbox"><span class="k-checkbox-label checkbox-span"></span></span><span class="k-in">bar</span></div>
               <ul class="k-group" role="group" style="display: block; overflow: visible; height: auto;">
                  <li role="treeitem" class="k-item k-last" data-uid="b0f0e249-5c64-47eb-8a6f-d0bd383c46ed" aria-checked="false" aria-selected="false" aria-expanded="false" data-expanded="false" id="treeview-left_tv_active">
                     <div class="k-bot"><span class="k-checkbox-wrapper" role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" id="_b0f0e249-5c64-47eb-8a6f-d0bd383c46ed" class="k-checkbox"><span class="k-checkbox-label checkbox-span"></span></span><span class="k-in k-selected" aria-selected="true">baz</span></div>
                  </li>
               </ul>
            </li>
         </ul>
      </li>
   </ul>
</div>
```

New Rendering with Checkboxes:

```html
<div id="treeview-left" data-role="treeview" class="k-treeview k-treeview-{size}" tabindex="0" role="tree"
    aria-busy="false">
    <ul class="k-group k-treeview-lines" role="none">
        <li role="treeitem" class="k-item k-treeview-item k-first k-last"
            data-uid="d326b551-4386-4dda-8a12-bee3dbcbb940" aria-checked="false" aria-selected="false"
            aria-expanded="true" data-expanded="true" aria-busy="false">
            <div class="k-treeview-top k-treeview-bot"><span class="k-treeview-toggle"><span
                        class="k-icon k-i-collapse"></span></span><span class="k-checkbox-wrapper"
                    role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1"
                        id="_d326b551-4386-4dda-8a12-bee3dbcbb940" class="k-checkbox k-checkbox-{size} k-rounded-md"><span
                        class="k-checkbox-label checkbox-span"></span></span><span class="k-treeview-leaf k-in"><span
                        class="k-treeview-leaf-text">foo</span></span></div>
            <ul class="k-group k-treeview-group" role="group" style="display: block;">
                <li role="treeitem" class="k-item k-treeview-item k-last"
                    data-uid="ce664b23-821c-4a63-9b86-b926c540e714" aria-checked="false" aria-selected="false"
                    aria-disabled="true" aria-expanded="true" data-expanded="true" aria-busy="false">
                    <div class="k-treeview-bot"><span class="k-treeview-toggle"><span
                                class="k-icon k-i-collapse"></span></span><span class="k-checkbox-wrapper"
                            role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1" disabled=""
                                id="_ce664b23-821c-4a63-9b86-b926c540e714"
                                class="k-checkbox k-checkbox-{size} k-rounded-md"><span
                                class="k-checkbox-label checkbox-span"></span></span><span
                            class="k-treeview-leaf k-in k-disabled"><span class="k-treeview-leaf-text">bar</span></span>
                    </div>
                    <ul class="k-group k-treeview-group" role="group" style="display: block;">
                        <li role="treeitem" class="k-item k-treeview-item k-last"
                            data-uid="eea3515a-89ef-4a97-bd6f-05e537073be0" aria-checked="false" aria-selected="true"
                            aria-expanded="false" data-expanded="false">
                            <div class="k-treeview-bot"><span class="k-checkbox-wrapper"
                                    role="presentation"><input aria-hidden="true" type="checkbox" tabindex="-1"
                                        id="_eea3515a-89ef-4a97-bd6f-05e537073be0"
                                        class="k-checkbox k-checkbox-{size} k-rounded-md"><span
                                        class="k-checkbox-label checkbox-span"></span></span><span
                                    class="k-treeview-leaf k-in k-selected"><span
                                        class="k-treeview-leaf-text">baz</span></span></div>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
```

## Visual Backwards Compatibility

To achieve the same look and feel as the old rendering, you must update the element references.

> When you use a LESS theme, the new styling and rendering supports only the [default options](#options).

The following example showcases how to customize the styles of the **ТTreeView** in both the new, and the old rendering:

```dojo
    <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
    <div id="treeview"></div>
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

        $("#treeview").kendoTreeView({
          dataSource: homogeneous,
          dataTextField: "FullName"
        });
    </script>
    <style>
      /*  NEW RENDERING */
      /*  The style below will works with versions R1 2022 and later*/ 


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


      /*  OLD RENDERING */
      /*  The style below will works with versions prior to R1 2022 */ 

      /* .k-item{ background: red; }  k-item will style the items in the DropDownTree with the old as well as with the new rendering */       

      .k-treeview .k-textbox{
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
    </style>
```

## See Also

* [Appearance Overview Article]({% slug components_rendering_overview %})
* [Appearance Demo of the TreeView](https://demos.telerik.com/kendo-ui/treeview/appearance)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
