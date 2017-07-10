---
title: Prevent Popup Closure on Scroll
page_title: Prevent Popup Closure on Scroll | Kendo UI DropDownList
description: "Learn how to prevent popup closure on scrolling when users reach the end of the list in a Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/how-to/prevent-close-on-scroll
slug: howto_prevent_popup_closure_onscroll_dropdownlist
---

# Prevent Popup Closure on Scroll

Normally, when the popup item list is open and the user scrolls it to the end, the browser starts scrolling the page which closes the drop-down list itself.

The DropDownList enables you to prevent this behavior and to make the popup remain open in such cases. The following example demonstrates how to achieve this behavior.

> **Important**  
>
> The Kendo UI 2014.3 and earlier versions require a different approach from the one demonstrated in the example. If you use any of these versions, you can prevent the closure of the popup by implementing the `stopScroll(widget.ul);` configuration instead of the `stopScroll(widget.ul.parent());` one.

###### Example

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>Products</h4>
        <input id="products" style="width: 400px" />
    </div>

    <script>
        function stopScroll(element) {
          var activeElement;

          $(document).bind('mousewheel DOMMouseScroll', function(e) {
              var scrollTo = null;

              if (!$(activeElement).closest(".k-popup").length) {
                return;
              }

              if (e.type == 'mousewheel') {
                  scrollTo = (e.originalEvent.wheelDelta * -1);
              }
              else if (e.type == 'DOMMouseScroll') {
                  scrollTo = 40 * e.originalEvent.detail;
              }

              if (scrollTo) {
                  e.preventDefault();
                  element.scrollTop(scrollTo + element.scrollTop());
              }
          });

          $(document).on('mouseover', function(e) {
                activeElement = e.target;
          });
        }

        $(document).ready(function() {
            $("#products").kendoDropDownList({
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "jsonp",
                            url: "http://demos.telerik.com/kendo-ui/service/Products",
                        }
                    }
                },
                value: "74"
            });

            var widget = $("#products").data("kendoDropDownList");

            stopScroll(widget.ul.parent());
        });
    </script>

    <style scoped>
        #example { min-height: 1200px; padding: 30px; }

        .demo-section {
            width: 400px;
        }
        .demo-section h2 {
            text-transform: uppercase;
            font-size: 1.2em;
            margin-bottom: 10px;
        }
    </style>
</div>
```

## See Also

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_bindobjectstongmodel_dropdownlist %}).
