---
title: Cascade DropDownList widgets with ng-repeat using distinct values
page_title: Cascade DropDownList widgets with ng-repeat using distinct values
description: Cascade DropDownList widgets with ng-repeat using distinct values
---

# How to cascade DropDownList widgets with 'ng-repeat' using distinct values

Example that shows how to use 'ng-repeat' to add additional DropDownList on parent selection. Every new child
is bound with distinct values.

> Note that 'ng-repeat' usage has some limitations, which need to be taken into account. More details here:
[Notes on ng-repeat](http://docs.telerik.com/kendo-ui/AngularJS/notes-on-ng-repeat)

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
