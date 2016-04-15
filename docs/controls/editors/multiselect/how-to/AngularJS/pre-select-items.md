---
title: Preselect Items on Load
page_title: Preselect Items on Load | Kendo UI MultiSelect
description: "Learn how to pre-select items on load in the Kendo UI MultiSelect widget."
slug: howto_preselect_itemson_load_angular_multiselect
---

# Preselect Items on Load

The example below demonstrates how to preselect items in Kendo UI MultiSelect without loading the whole source in AngularJS.

> **Important**
>
> This example needs to be run in the Dojo to function correctly.

###### Example

```html
    <div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">
        <div style="padding:10px">
           <p>Pre-select items using static initial data:</p>
           <select
              kendo-multi-select
              k-data-source="countryNames"
              k-data-text-field="'ProductName'"
              k-data-value-field="'ProductID'"
              k-ng-model="products"
              k-options="selectOptions"
              k-rebind="selectOptions"
              k-value-primitive="true"></select>

           <br/>
           <p>Pre-select items using data loaded via ajax:</p>
           <select
              kendo-multi-select
              k-data-source="productDataSource"
              k-data-text-field="'ProductName'"
              k-data-value-field="'ProductID'"
              k-ng-model="products2"
              k-options="secondOptions"
              k-rebind="secondOptions"
              k-value-primitive="true"></select>
      </div>
    </div>
    <style scoped>
        .demo-section {
            width: 400px;
        }
        .demo-section p {
            padding: 5px 0;
        }
    </style>
</div>

<!-- The example uses linq.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/linq.js/2.2.0.2/jquery.linq.min.js"></script>

<script>
  var kms;
  angular.module("KendoDemos", [ "kendo.directives" ])
    .controller("MyCtrl", function ($scope,$http){
    $scope.countryNames = {
      type: "odata",
      pageSize: 10,
      serverPaging: true,
      serverFiltering: true,
      serverSorting: true,
      transport: {
        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
      }
    };

    $scope.selectOptions = {
      autoBind: false,
      value: [
        { ProductName: "Not Loaded 1", ProductID: 1 },
        { ProductName: "Not Loaded 2", ProductID: 11 }
      ]
    };

    $scope.products = [1, 11];

    $scope.productDataSource = {
      type: "odata",
      pageSize: 10,
      serverPaging: true,
      serverFiltering: true,
      serverSorting: true,
      transport: {
        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
      }
    };

    $scope.secondOptions = {
      autoBind: false,
      valuePrimitive: true
    };

    $scope.products2 = [];

    function LoadValues(valuesToSelect) {
      var filter =  $.Enumerable.From(valuesToSelect)
      .Select(function(x) { return "(ProductID eq "+x+")" })
      .ToArray().join("or");

      var success = function(data, status, headers) {
        var values = $.Enumerable.From(data.d)
        .Select(function(x) { return {ProductName: x.ProductName, ProductID: x.ProductID, } })
        .ToArray();

        $scope.secondOptions = {
          autoBind: false,
          valuePrimitive: true,
          value: values
        };
        $scope.products2 = valuesToSelect;
      };

      $scope.filter = filter;
      $http.get('http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products?$filter='+filter).success(success);
    }

    setTimeout(function() {
      LoadValues([3, 4]);
    });
  });
</script>
```

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Bind Values to Template]({% slug howto_bind_values_totemplate_multiselect %})
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
