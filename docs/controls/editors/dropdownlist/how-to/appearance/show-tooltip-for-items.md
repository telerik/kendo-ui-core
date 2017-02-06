---
title: Show List Item Details in ToolTip
page_title: Show List Item Details in ToolTip | Kendo UI DropDownList
description: "Learn how to show details for Kendo UI DropDownList items by using a Kendo UI Tooltip."
previous_url: /controls/editors/dropdownlist/how-to/show-tooltip-for-items
slug: howto_show_list_items_details_in_tooltip_dropdownlist
---

# Show List Item Details in ToolTip

Sometimes you might need to show additional information about a list item in a Kendo UI DropDownList.

A possible way to achieve this behavior is to use a Kendo UI Tooltip that displays the details when the user hovers with the mouse over the DropDownList item.

The following example demonstrates how to customize the information displayed in the Tooltip depending on the respective data item fields.

###### Example

```html
<input id="dropdownlist" />
<script>
  var ddl = $("#dropdownlist").kendoDropDownList({
    dataSource: {
      transport: {
        read: {
          url: 'https://jsonplaceholder.typicode.com/users',
          dataType: 'json'
        }
      }
    },
    dataTextField: "username",
    dataValueField: "id"
  }).data('kendoDropDownList');

  $('body').kendoTooltip({
    filter: 'li.k-item',
    position: 'right',
    content: function(e){
      var item = ddl.dataItem($(e.target));

      var result = '<h3>' + item.name + '</h3>' +
					'<h4>' + item.email + '</h4>' +
          'Address: <hr />' +
          '<p>Street: ' + item.address.street + '</p>' +
          '<p>Suite: ' + item.address.suite + '</p>' +
          '<p>ZIP Code: ' + item.address.zipcode + '</p>';

      return result;
    },
    width: 220,
    height: 280
  });
</script>
```

## See Also

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %}).
