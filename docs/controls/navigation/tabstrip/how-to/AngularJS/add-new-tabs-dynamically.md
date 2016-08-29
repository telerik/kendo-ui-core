---
title: Add New Tabs Dynamically by Manual HTML Content Compilation
page_title: Add New Tabs Dynamically by Manual HTML Content Compilation | Kendo UI TabStrip
description: "Learn how to add new tabs dynamically to the Kendo UI TabStrip widget in AngularJS applications."
slug: howto_addnewtabsdynamically_tabstrip
---

# Add New Tabs Dynamically by Manual HTML Content Compilation

Out of the box, the Kendo UI TabStrip does not support the execution of dynamic Angular templates&mdash;directives and bindings. For more information on this issue, refer to [this forum thread](http://www.telerik.com/forums/use-angularjs-directive-in-tab-content).

However, it is possible to use a workaround and to compile the HTML content manually after adding a new tab by targeting the element that needs to be compiled through `$compile`.

The example below demonstrates how to add new tabs by using the [`$compile` AngularJS service](https://docs.angularjs.org/api/ng/service/$compile) and load content dynamically.

###### Example

```html
    <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content">
        <div ng-controller="MyCtrl">
          <div kendo-tab-strip="tabstrip" k-content-urls="[ null, null]">
            <!-- tab list -->
            <ul>
              <li class="k-state-active">First tab</li>
            </ul>
            <div style="padding: 1em">
              <kendo-grid options="mainGridOptions">
              </kendo-grid>
            </div>

          </div>
        </div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope, $compile){

        $scope.mainGridOptions = {
          dataSource: {
            type: "odata",
            transport: {
              read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
          },
          sortable: true,
          pageable: true,
          dataBound: function() {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
          },
          columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
          },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
          },{ command: { text: "Add Tab", click: insertContent }, title: " ", width: "180px" }]
        };

        function insertContent(e) {
          e.preventDefault();
          var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
          $scope.tabstrip.insertAfter(
            { text: dataItem.FirstName + ' ' + dataItem.LastName + ' <button ng-click="removeTab($event)" class="k-button-icon"><span class="k-icon k-i-close"></span></button>',
             encoded: false,
             content: dataItem.Notes
            },
            $scope.tabstrip.tabGroup.children("li:last")
          );
          $compile($scope.tabstrip.tabGroup.children("li:last"))($scope);
        }
        $scope.removeTab = function(event){
          var item = $(event.currentTarget).closest(".k-item");
          $scope.tabstrip.remove(item.index());
        };
      })
    </script>
```

## See Also

Other articles on the Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Save Content Scroll Position]({% slug howto_savecontentscrollposition_tabstrip %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})

For more runnable examples on the Kendo UI TabStrip widget, browse its [**How To** documentation folder]({% slug howto_disablecontentscrolling_tabstrip %}).
