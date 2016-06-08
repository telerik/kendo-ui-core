---
title: Bind to Telerik Backend Services
page_title: Bind to Telerik Backend Services | Kendo UI Grid
description: "Learn how to use AngularJS directives to bind a Kendo UI Grid widget to Telerik Backend Services."
slug: howto_bindto_telerik_backend_services_grid
---

# Bind to Telerik Backend Services

The example below demonstrates how to bind the [Kendo UI Grid widget](http://www.telerik.com/kendo-ui/grid) to the Telerik Backend Services in an AngularJS application.

###### Example

```html
<div id="example" ng-app="KendoDemos">
  <div ng-controller="MyCtrl">
    <!-- Use grid directive with scope options -->
    <kendo-grid options="gridOptions"></kendo-grid>
  </div>
</div>

<!-- Include Backend Services script on page -->
<script src="https://bs-static.cdn.telerik.com/1.2.6/everlive.all.min.js"></script>
<script>
  // configure API key
  var everlive = new Everlive({
    apiKey: "3q4sHgIqESXbpvOp",
    scheme: "http"
  });

  angular.module("KendoDemos", [ "kendo.directives" ]);
  function MyCtrl($scope) {
    // declare dataSource bound to backend
    var dataSource = new kendo.data.DataSource({
      type: "everlive",
      transport: {
        // binding to the Order type in the backend
        typeName: "Order"
      },
      schema: {
        model: {
          id: "Id",
          fields: {
            // default fields for Backend Services types
            CreatedBy:  { type: "string" },
            CreatedAt:  { type: "date" },
            ModifiedAt: { type: "date" },

            // type fields
            Freight:    { type: "number" },
            OrderDate:  { type: "date" },
            ShipName:   { type: "string" },
            ShipCity:   { type: "string" }
          }
        }
      },
      serverPaging: true,
      pageSize: 20,

      serverSorting: true,
      sort: { field: 'OrderDate', dir: 'asc' }
    });

    $scope.gridOptions = {
      dataSource: dataSource,
      sortable: true,
      pageable: true,
      columns: [
        { field: "Freight", width: 100 },
        { field: "OrderDate", title: "Order Date", width: 120, format: "{0:MM/dd/yyyy}" },
        { field: "ShipName", title: "Ship Name" },
        { field: "ShipCity", title: "Ship City", width: 150 }
      ]
    };
  }
</script>
```

## See Also

Other articles on the Kendo UI Grid and how-to examples related to AngularJS:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Editors]({% slug howto_create_custom_editors_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use Resize Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
