---
title: Preselect Items on Load
page_title: Preselect Items on Load | Kendo UI MultiSelect
description: "Learn how to pre-select items on load in the Kendo UI MultiSelect widget."
slug: howto_preselect_itemson_load_angular_multiselect
---

# Preselect Items on Load

> **Important**
>
> The approach described in this article does not work with primitive values. This means that the values have to be of the complex type (objects). For more details on this issue, refer to:
> * [The `k-value-primitive` attribute]({% slug angularjs_integration_directives %}#the-k-value-primitive-attribute)
> * [MVVM value binding]({% slug valuebinding_mvvm_kendoui %}#data-bound-widgets-and-value-binding)

The following example demonstrates how to preselect items in the Kendo UI MultiSelect without loading the whole source in AngularJS. To ensure the proper functioning of the example, run it in the Dojo.

###### Example

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/linq.js/2.2.0.2/jquery.linq.min.js"></script>
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
              k-value-primitive="false"></select>

      <br/>
      <p>Pre-select items using data loaded via ajax:</p>
      <select
              kendo-multi-select
              k-data-source="productDataSource"
              k-data-text-field="'ProductName'"
              k-data-value-field="'ProductID'"
              k-options="secondOptions"
              k-ng-model="products2"
              k-rebind="products2"></select>
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
      autoBind: false
    };

    $scope.products = [
      { ProductName: "Not Loaded 1", ProductID: 1 },
      { ProductName: "Not Loaded 2", ProductID: 11 }
    ];

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
      valuePrimitive: false
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
            valuePrimitive: false
        };

        $scope.products2 = values;
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
