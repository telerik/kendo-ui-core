---
title: Cascade Lists Using `ng-repeat`
page_title: Cascade Lists Using `ng-repeat` | Kendo UI DropDownList
description: "Learn how to cascade Kendo UI DropDownList widgets with `ng-repeat` and using distinct values."
slug: howto_cascade_withngrepeat_distinct_values_dropdownlist
---

# Cascade Lists Using `ng-repeat`

The example below demonstrates how to use `ng-repeat` to add extra drop-down lists on a parent selection. Every new child is bound with distinct values.

> **Important**  
> Note that the use of `ng-repeat` has some limitations that need to be taken into account. For more information on this, refer to the [notes on `ng-repeat`](http://docs.telerik.com/kendo-ui/AngularJS/notes-on-ng-repeat) help article.

```html
    <script type="text/javascript">
      function getResource(val){
        return val;
      }
      angular.module("test", ["kendo.directives"]);

      angular.module("test").controller("testController", ["$scope", function($scope){
        $scope.hierarchyFieldIds = new kendo.data.ObservableArray([]);
        $scope.hierarchyFields = new kendo.data.ObservableArray([]);
        $scope.placeholder = [];    // needed so that ng-repeat does not conflict with k-ng-model and cause a $rootScope:inprog error.

        $scope.fields = [
          { Name: 'Root', FieldMappings: null, HierarchyOrdinal: null },
          { Name: 'Level 2', FieldMappings: null, HierarchyOrdinal: null },
          { Name: 'Level 3', FieldMappings: null, HierarchyOrdinal: null },
          { Name: 'Value', FieldMapipngs: null, HierarchyOrdinal: null },
          { Name: 'Value 2', FieldMapipngs: null, HierarchyOrdinal: null },
          { Name: 'Value 3', FieldMapipngs: null, HierarchyOrdinal: null }
        ];

        $scope.availableFields = function (curField) {
          return $.map($scope.fields, function (field, idx) {
            var match = $.map($scope.hierarchyFieldIds, function (hf) {
              if (String(hf.Id) === String(idx)) {
                return hf;
              }
            });

            if (!(match && match.length) || (curField && String(match[0].Id) === String(curField.Id))) {
              //return $.extend({ Id: idx }, field);
              var fieldId = field.Id;
              if (!fieldId) { fieldId = idx; }
              return { Id: fieldId, Name: field.Name };
            }
          });
        };

        $scope.hierarchyOptions = {
          change: function (ev) {
            var hierarchyLevel = this.element.attr("data-index");
            if (!hierarchyLevel) { return; }

            hierarchyLevel = Number(hierarchyLevel);
            if (isNaN(hierarchyLevel)) { return; }

            if (!this.value()) {
              $scope.hierarchyFields.splice(hierarchyLevel, 1);
              $scope.hierarchyFieldIds.splice(hierarchyLevel, 1);
            } else {
              $scope.hierarchyFieldIds[hierarchyLevel].Id = this.value();
            }

            for (var i = 0; i < $scope.hierarchyFields.length; i++) {
              $scope.hierarchyFields[i] = $scope.availableFields($scope.hierarchyFieldIds[i]);
            }
            // update data source for add row:
            $scope.remainingFields.data($scope.availableFields());
            $scope.$apply();
          }
        };

        $scope.remainingFields = new kendo.data.DataSource({ data: $scope.availableFields() });

        $scope.addHierarchyOptions = {
          dataSource: $scope.remainingFields,
          dataTextField: "Name",
          dataValueField: "Id",
          optionLabel: " ",
          change: function (ev) {
            if (this.value()) {
              var id = Number(this.value());
              if (isNaN(id)) { return; }

              var field = $.map(this.dataSource.data(), function (field) {
                if (field.Id === id) { return field; }
              });

              if (field && field.length) {
                field = field[0];

                $scope.hierarchyFieldIds.push({ Id: String(field.Id), Name: field.Name });
                $scope.hierarchyFields.push([]);

                for (var i = 0; i < $scope.hierarchyFields.length; i++) {
                  $scope.hierarchyFields[i] = $scope.availableFields($scope.hierarchyFieldIds[i]);
                }
              }
              // update list, so that the selected item cannot be selected again:
              $scope.remainingFields.data($scope.availableFields());

              // update placeholder used by ng-repeat.
              $scope.placeholder.push("");
              // clear selection
              this.value("");

              // refresh view.
              $scope.$apply();
            }
          }
        };
      }]);
    </script>
  <div ng-app="test" ng-controller="testController">
    {{hierarchyFieldIds}}
    <div ng-repeat="field in placeholder track by $index">
      <select kendo-dropdownlist
              data-index="{{$index}}"
              k-data-source="hierarchyFields[$index]"
              k-data-text-field="'Name'"
              k-data-value-field="'Id'"
              k-ng-model="hierarchyFieldIds[$index]"
              k-option-label="' '"
              k-options="hierarchyOptions"></select>
    </div>
    <div>
      <select kendo-dropdownlist
              k-options="addHierarchyOptions"></select>
    </div>
  </div>
```

## See Also

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Cascade from Multiple Parents]({% slug howto_cascade_multiple_parents_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
* [How to Detect Wrapper Blur Events]({% slug howto_detect_wrapper_blur_events_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Preselect Items]({% slug howto_preselect_items_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
