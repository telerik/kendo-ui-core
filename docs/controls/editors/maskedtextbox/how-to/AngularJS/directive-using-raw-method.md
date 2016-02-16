---
title: Use Custom Directive to Set Model Value
page_title: Use Custom Directive to Set Model Value | Kendo UI MaskedTextBox
description: "Learn how to use raw methods to set the model values of the Kendo UI MaskedTextBox widget in AngularJS."
slug: howto_use_raw_methodtoset_modelvalue_angularjs_maskedtextbox
---

# Use Custom Directive to Set Model Value

The example below demonstrates how to implement [a custom AngularJS directive](https://docs.angularjs.org/guide/directive) to get MaskedTextBox unmasked value.

###### Example

```html
<div id="example" ng-app="KendoDemos">
    <div class="demo-section k-content" ng-controller="MyCtrl">
      <form>
        <ul class="textboxes">
          <li>
            <label>Phone number:</label>
              <input kendo-masked-text-box
                     raw-mask="phone"
                     k-unmask-on-post="true"
                     k-mask="'(999) 000-0000'" />
            {{phone}}
          </li>
          <li>
            <label>Credit Card number:</label>
              <input kendo-masked-text-box
                     raw-mask="cc"
                     k-mask="'0000 0000 0000 0000'" />
            {{cc}}
          </li>
          <li>
            <label>Social security number:</label>
              <input kendo-masked-text-box
                     raw-mask="ssn"
                     k-mask="'000-00-0000'" />
            {{ssn}}
          </li>
          <li>
            <label>UK postcode:</label>
              <input kendo-masked-text-box
                     raw-mask="post"
                     k-mask="'L0L 0LL'" />
            {{post}}
          </li>
        </ul>
        <button id="btn" name="btn" ng-click="save()">Post</button>
      </form>
    </div>
    <style>
        .demo-section {
            width: 500px;
        }

        .textboxes {
            margin:0;
            padding:0;
        }

        .textboxes li {
            list-style:none;
            padding:10px 0;
        }

        .textboxes label {
            display: inline-block;
            width: 150px;
            margin-right: 5px;
            text-align: right;
        }
    </style>
</div>

<script>
  angular.module("KendoDemos", [ "kendo.directives" ])
      .controller("MyCtrl", function($scope){
          $scope.phone = "555 123 4567";
          $scope.cc = "1234 1234 1234 1234"
          $scope.ssn = "003-12-3456";
          $scope.post = "W1N 1AC";

            $scope.save = function () {
            event.preventDefault();
            alert($scope.phone);
          }
      })
      .directive('rawMask', function() {
          function link(scope, element, attrs) {
            var field = attrs.rawMask;

            setTimeout(function() {
              var widget = element.data("kendoMaskedTextBox");

              widget.value(scope[field]);
              widget.bind("change", function() {
                scope.$apply(function() {
                  scope[field] = widget.raw();
                });
              });

              scope.$watch(field, function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  widget.value(newValue);
                }
              });
            }, 10);
         }

        return {
          restrict: 'A',
          link: link
        };
      });
</script>
```

## See Also

Other articles on Kendo UI MaskedTextBox:

* [MaskedTextBox JavaScript API Reference](/api/javascript/ui/maskedtextbox)
* [How to Customize Masks through MVVM Binding]({% slug howto_customize_masks_through_mvvmbinding_mvvm_maskedtextbox %})
* [How to Show Custom Placeholder on Blur]({% slug howto_show_custom_placeholderon_blur_maskedtextbox %})
* [How to Use Custom MVVM Binding to Set Model Value]({% slug howto_use_custommvvm_bindingto_setmodel_value_maskedtextbox %})
