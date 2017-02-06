---
title: Adjust Width Automatically
page_title: Adjust Width Automatically | Kendo UI DropDownList
description: "Learn how to automatically adjust the width of a Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/how-to/auto-adjust-the-width
slug: howto_automatically_adjust_width_dropdownlist
---

# Adjust Width Automatically

You can automatically adjust the width of the DropDownList depending on its list items.

To achieve this behavior:

1. After the widget is initialized, reset the list width of the widget to `auto`.
2. In the `adjustDropDownWidth` function, add the scrollbar width to the list width.

There are 2 possible scenarios:

**Scenario 1** The DropDownList is already bound when it is opened. In this case, execute `adjustDropDownWidth` in the [`open`](/api/javascript/ui/dropdownlist#events-open) event.

**Scenario 2** The DropDownList triggers a remote request after it is opened. In this case, execute `adjustDropDownWidth` in the [`dataBound`](/api/javascript/ui/dropdownlist#events-dataBound) event.

The following example demonstrates how to automatically adjust the width of a DropDownList depending on its list items.

###### Example

```html
<style>

  .k-list
  {
    white-space: nowrap;
  }

</style>

<div id="example">

  <p>
    Remote data: <select id="color-remote"></select>
  </p>

  <p>
    Local data: <select id="color-local"></select>
  </p>

</div>

<script>
  $(function() {

    var data = [
      { text: "Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey Grey ", value: "13" },
      { text: "Black 1", value: "1" },
      { text: "Orange 2", value: "2" },
      { text: "Black 3", value: "3" },
      { text: "Orange 4", value: "4" },
      { text: "Black 5", value: "5" },
      { text: "Orange 6", value: "6" },
      { text: "Black 7", value: "7" },
      { text: "Orange 8", value: "8" },
      { text: "Black 9", value: "9" },
      { text: "Orange 10", value: "10" },
      { text: "Black 11", value: "11" },
      { text: "Orange 12", value: "12" }
    ];

    // DropDownList bound to remote data that is fetched on open
    // use a dataBound handler

    $("#color-remote").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      autoBind: false,
      dataSource: {
        transport: {
          read: function (e) {
            setTimeout(function(){
              e.success(data);
            }, 500);
          }
        }
      },
      dataBound: adjustDropDownWidth
    });

    var remoteDropDown = $("#color-remote").data("kendoDropDownList");

    remoteDropDown.list.width("auto");

    // DropDownList bound to local data or remote data that is fetched immediately upon initialization
    // use an open handler

    $("#color-local").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: data,
      open: adjustDropDownWidth
    });

    var localDropDown = $("#color-local").data("kendoDropDownList");

    localDropDown.list.width("auto");

    function adjustDropDownWidth(e) {
      var listContainer = e.sender.list.closest(".k-list-container");
      listContainer.width(listContainer.width() + kendo.support.scrollbar());
    }    

  });
</script>
```

## See Also

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %}).
