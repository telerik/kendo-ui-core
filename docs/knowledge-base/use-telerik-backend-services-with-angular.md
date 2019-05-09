---
title: Bind to Kinvey Backend Services
page_title: jQuery Grid Documentation | Bind to Telerik Backend Services | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to use AngularJS directives to bind the widget to Telerik Backend Services."
previous_url: /controls/data-management/grid/how-to/AngularJS/use-telerik-backend-services-with-angular
slug: howto_bindto_telerik_backend_services_grid
---

# Bind to Telerik Backend Services

The following example demonstrates how to bind the [Grid](http://www.telerik.com/kendo-ui/grid) to the Kinvey Backend Services in an AngularJS application.

###### Example

```dojo
<div id="example" ng-app="KendoDemos">
    <div ng-controller="MyCtrl" data-ng-init="init()">
        <!-- Use grid directive with scope options -->
        <kendo-grid options="gridOptions"></kendo-grid>
    </div>
</div>

<!-- Kinvey JS SDK (HTML, PhoneGap, etc.) -->
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/kinvey-html5-sdk.min.js"></script>

<!-- Kinvey Kendo UI Data Source -->
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/kendo.data.kinvey.min.js"></script>
<script>
    // configure API key
    Kinvey.init({
        appKey: 'kid_SJyRpx96G',
        appSecret: 'a88466f87e434ca4a1a0194e33d3168d'
    });

    angular.module("KendoDemos", ["kendo.directives"])
        .controller('MyCtrl', ["$scope", MyCtrl]);

    function MyCtrl($scope) {
        $scope.init = function() {
            if (!Kinvey.User.getActiveUser()) {
                var that = this;
                Kinvey.User.signup()
                    .then(function() {
                        that.dataSource.read();
                    })
                    .catch(function(error) {
                        alert(error.message);
                    });
            } else {
                this.dataSource.read();
            }
        };

        // declare dataSource bound to backend
        $scope.dataSource = new kendo.data.DataSource({
            type: "kinvey",
            transport: {
                typeName: "products"
            },
            schema: {
                model: {
                    id: "_id",
                    fields: {
                        UnitPrice: {
                            type: "number"
                        },
                        UnitsInStock: {
                            type: "number"
                        },
                        Discontinued: {
                            type: "boolean"
                        }
                    }
                }
            },
            pageSize: 20,
            serverSorting: true,
            serverPaging: true,
            error: function(err) {
                alert(JSON.stringify(err));
            }
        });

        $scope.gridOptions = {
            autoBind: false,
            dataSource: $scope.dataSource,
            height: 430,
            sortable: true,
            pageable: true,
            columns: [{
                field: "ProductName",
                title: "Product Name"
            }, {
                field: "UnitPrice",
                title: "Unit Price",
                width: 220
            }, {
                field: "UnitsInStock",
                title: "Units In Stock",
                width: 220
            }, {
                field: "Discontinued",
                title: "Discontinued",
                width: 220
            }]
        };
    }
</script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Change Languages Dynamically]({% slug howto_dynamic_language_change %})
* [How to Create Custom ToolBar Templates]({% slug howto_create_custom_toolbar_templates_grid %})
* [How to Create Custom Editors]({% slug howto_create_custom_editors_grid %})
* [How to Create Custom Edit Buttons]({% slug howto_create_custom_edit_buttons_grid %})
* [How to Use Resize Columns from a Button]({% slug howto_resize_columnsfrom_abutton_grid %})
* [How to Use AngularJS in Popup Editor Templates]({% slug howto_use_angularin_popup_editor_templates_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
