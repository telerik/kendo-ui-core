---
title: Syncing ListView Selection with Checkboxes in Kendo UI
description: Learn how to synchronize the selection state of ListView items and checkboxes in Kendo UI, allowing seamless interaction between the two.
type: how-to
page_title: How to Sync Selection Between ListView Items and Checkboxes in Kendo UI
slug: how-to-sync-listview-selection-with-checkboxes-kendo-ui
tags: kendo-ui, listview, checkboxes, selection, javascript
res_type: kb
components: ["listview"]
ticketid: 1668686
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>ListView for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

When using a [ListView](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview) with checkboxes for each item, it's required to sync the checkbox state with the item selection state. Specifically, the need is to select ListView items when their corresponding checkboxes are checked, and to check these checkboxes when items are selected. This KB article also answers the following questions:
- How can I toggle ListView item selection with checkboxes?
- How to synchronize ListView selection with checkbox states?

## Solution

To synchronize the selection state between ListView items and checkboxes, follow these steps:

1. Set the [`selectable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/configuration/selectable) option of the ListView to `"multiple"` to allow multiple items to be selected.

2. Use the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/events/change) event of the ListView to check checkboxes based on the currently selected items. In the event handler, deselect all checkboxes, then check the checboxes based on the selected state of the items using the `k-selected` class.

    ```javascript
    change: function(e) {
        $('.k-checkbox').prop('checked', false);
        $('.k-selected').each((index, item) => {
            $(item).find('.k-checkbox').prop('checked', true);
        });
    },
    ```

3. Attach a `click` event handler to checkboxes. In this handler, based on the checkbox state, select or deselect the corresponding ListView item.

    ```javascript
    $('.k-checkbox').on('click', function(e) {
        let isChecked = $(this).prop('checked');

        if(isChecked) {
            $("#listView").data("kendoListView").select($(this).closest('.k-listview-item'));
        } else {
            $(this).closest('.k-listview-item').removeClass('k-selected');
        }
    });
    ```

4. To retrieve the selected items, use the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview/methods/select) method of the ListView. This can be triggered by an external action, such as clicking a 'Get Selected' button.

The implementation above ensures that selecting a ListView item checks its checkbox and checking a checkbox selects the ListView item, maintaining synchronization between the two.

For a practical demonstration, refer to the example below:

```dojo
<button id="btn">Get Selected</button>
    <div id="listView"></div>
    <script>
      $('#btn').on('click', function(){
        var listView = $("#listView").data("kendoListView");
        var selected = listView.select();
        console.log(selected.length);
      })
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
          dataSource = new kendo.data.DataSource({
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/Products"
              }
            },
            pageSize: 10
          });

      var listView = $("#listView").kendoListView({
        change: function(e){
          $('.k-checkbox').prop('checked', false)
          $('.k-selected').each((index, item) => { $(item).find('.k-checkbox').prop('checked', true)})
        },
        dataBound: function(){
          var listView = $("#listView").data("kendoListView");
          let sDt = "Chang";
          let currentData = listView.dataSource.data()

          var itemWithID = currentData.find(function (item) {
            return item.ProductName === sDt;
          });

          listView.select($('.k-listview-content').children('[data-uid="' + itemWithID.uid + '"]'));
          $('[data-uid="' + itemWithID.uid + '"] .k-checkbox').prop('checked', true)

          $('.k-checkbox').on('click', function(e){
            let isChecked = $(this).prop('checked')

            if(isChecked){
              $("#listView").data("kendoListView").select($(this).closest('.k-listview-item'))
            }else{
              $(this).closest('.k-listview-item').removeClass('k-selected')
            }
          })

        },
        dataSource: dataSource,
        selectable: "multiple",
        template: "<div><input class='k-checkbox' type='checkbox' />#:ProductName#</div>"
      }).data("kendoListView");
</script>
```

## See Also

- [ListView Overview](https://docs.telerik.com/kendo-ui/controls/listview/overview)
- [ListView API](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
