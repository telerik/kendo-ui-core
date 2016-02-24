---
title: Update Value on Spin
page_title: Update Value on Spin | Kendo UI NumericTextBox
description: "Learn how to update the value of the Kendo UI NumericTextBox widget on spin in AngularJS."
slug: howto_update_valueon_spin_angularjs_numerictextbox
---

# Update Value on Spin

The example below demonstrates how to update the NumericTextBox widget value on spin.

###### Example

```html
    <div id="example" ng-app="app">
        <div class="demo-section k-content" ng-controller="mainCtrl">
            <div>
                <h4>Set Value</h4>
                <p>
                  <input kendo-numeric-text-box="numeric"
                         k-min="0" k-max="100"
                         k-on-spin="updateValue()"
                         k-ng-model="value"/>
                </p>
            </div>
            <div>
                <h4>Result</h4>
                Value: {{value}}
            </div>
        </div>
        <script>
            angular.module('app', ["kendo.directives"])
            .controller("mainCtrl", ['$scope',  function ($scope) {
              $scope.value = 50;
              $scope.updateValue = function() {
                this.value = this.numeric.value();
              };
            }]);
        </script>
    </div>
```

## See Also

Other articles on Kendo UI NumericTextBox:

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Add Title Attribute]({% slug howto_add_title_attribute_numerictextbox %})
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Focus Widget on Label Click]({% slug howto_focus_widgeton_label_click_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Update Value on Keyup]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})
