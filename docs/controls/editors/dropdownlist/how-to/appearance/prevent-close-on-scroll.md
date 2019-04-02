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

###### Example

```dojo
<div id="example">
    <br/><br/><br/><br/><br/><br/><br/><br/>
    <div id="example" style="min-height: 2000px; padding: 30px;">
        <input id="products" style="width: 400px" />
    </div>
</div>

<script>
    $(function() {
          $("#products").kendoDropDownList({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: {
              transport: {
                read: {
                  dataType: "jsonp",
                  url: "https://demos.telerik.com/kendo-ui/service/Products",
                }
              }
            },
            value: "74"
          });

          var widget = $("#products").data("kendoDropDownList");

          widget.ul.parent().on("wheel", function(e) {
            var container = this;

            if ((container.scrollTop == 0 && e.originalEvent.deltaY < 0) ||
                (container.scrollTop == container.scrollHeight - container.offsetHeight &&
                 e.originalEvent.deltaY > 0)) {
              e.preventDefault();
              e.stopPropagation();
            }

          });
        });
</script>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_bindobjectstongmodel_dropdownlist %}).
