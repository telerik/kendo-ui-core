---
title: Validate DropDownList using required attribute in AngularJS app
page_title: Validate DropDownList using required attribute in AngularJS app
description: Validate DropDownList using required attribute in AngularJS app
---

# Validate DropDownList using required attribute in AngularJS app

Example that shows how to use 'required' attribute along with `ng-model` to validate DropDownList.

```html
<div ng-app="inputExample">
    <script>
     angular.module('inputExample', [ "kendo.directives" ])
       .controller('ExampleController', ['$scope', function($scope) {
         $scope.user = {country: ''};
       }]);
    </script>

  <div ng-controller="ExampleController">
    <form name="myForm">
      <label>
          Country:
          <select kendo-drop-down-list
                  k-option-label="'Select...'"
                  ng-model="user.country"
                  name="country"
                  required>
            <option>Albania</option>
            <option>Andorra</option>
            <option>Armenia</option>
            <option>Austria</option>
            <option>Azerbaijan</option>
            <option>Vatican City</option>
          </select>
      </label>
      <div role="alert">
        <span class="error" ng-show="myForm.country.$error.required">
         Required!</span>
      </div>
    </form>
    <hr>
    <tt>user = {{user}}</tt><br/>
    <tt>myForm.country.$valid = {{myForm.country.$valid}}</tt><br/>
    <tt>myForm.country.$error = {{myForm.country.$error}}</tt><br/>
  </div>
</div>
```
