---
title: Keep View and Model in Sync
page_title: Keep View and Model in Sync | Kendo UI MultiSelect
description: "Learn how to keep the view and the model a Kendo UI MultiSelect in AngularJS applications in sync."
slug: howto_keepviewandmodelinsync_angular_multiselect
---

# Keep View and Model in Sync

> **Important**
>
> Avoid changing the IDs of the Data Source to achieve the desired custom item selection logic inside the Kendo UI MultiSelect.

To keep the view and model in sync:

1. Attach an event listener to the [`select`](/api/javascript/ui/multiselect#events-select) event by using `k-on-select`.

2. If `"Unknown"` is selected, all other options are deselected by assigning the value of `"Unknown"` to the model.

        $scope.selectedIds = [0];

3. If any other option is selected, find the `"Unknown"` option and remove it from the model. Then, add the current selection.

You can implement a similar result by following the same steps and using the [`change`](/api/javascript/ui/multiselect#events-change) event handler. In this case, it is not necessary to add the current selection from **Step 3**.

The following example demonstrates how to keep in sync the view and the model of a Kendo UI MultiSelect in AngularJS applications.

###### Example

```html
  <base href="http://demos.telerik.com/kendo-ui/multiselect/angular">
  <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <h2>Options</h2>
        <select id="multiselect" kendo-multi-select k-options="selectOptions" k-ng-model="selectedIds" k-on-select="onSelect(kendoEvent)" k-value-primitive="true" k-rebind="selectedIds"></select>
        <p style="padding-top: 1em;">Selected: {% raw %} {{ selectedIds }} {% endraw %}</p>
      </div>
    </div>
    </div>

  <script>

    angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){

      $scope.onSelect = function(ev){

        var selectedId = ev.sender.dataItem(ev.item).Id;

        if(selectedId === 0){
          $scope.selectedIds = [0];
        } else {
          var index = $scope.selectedIds.indexOf(0);
          if (index > -1) {               
            $scope.selectedIds.splice(index, 1);
            $scope.selectedIds.push(selectedId);
          }
        }
      }

      $scope.selectOptions = {
        placeholder: "Select products...",
        dataTextField: "Name",
        dataValueField: "Id",
        valuePrimitive: true,
        autoBind: false,
        dataSource: [
          { Name: "Option 1", Id: 1 },
          { Name: "Option 2", Id: 2 },
          { Name: "Option 3", Id: 3 },
          { Name: "UNKNOWN", Id: 0 },
        ]
      }

      $scope.selectedIds = [2,3];

    });
  </script>
  </div>
```

## See Also

Other articles on the Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})

For more runnable examples on the Kendo UI MultiSelect, browse its [**How To** documentation folder]({% slug howto_bind_values_totemplate_multiselect %}).
