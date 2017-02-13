---
title: Integrate ResponsivePanels with Menus in AngularJS
page_title: Integrate ResponsivePanels with Menus in AngularJS | Kendo UI ResponsivePanel
description: "Learn how to integrate the Kendo UI ResponsivePanel with the Kendo UI Menu in AngularJS."
slug: howto_integrateresponsivepanelwithmenuinangularjs_responsivepanel
---

# Integrate ResponsivePanels with Menus in AngularJS

When working in AngularJS applications, your project might require you to implement a Kendo UI Menu widget in a Kendo UI ResponsivePanel.

The following example demonstrates how to achieve this behavior.

###### Example

```html
<div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <button class="k-rpanel-toggle"><i class="k-icon k-i-menu"></i></button>

        <div kendo-responsive-panel style="overflow:visible">
          <ul kendo-menu >
            <li>
              Men's
              <ul>
                <li>Footwear
                  <ul>
                    <li>Leisure Trainers</li>
                    <li>Running Shoes</li>
                    <li>Outdoor Footwear</li>
                    <li>Sandals/Flip Flops</li>
                    <li>Footwear Accessories</li>
                  </ul>
                </li>
                <li>Leisure Clothing
                  <ul>
                    <li>T-Shirts</li>
                    <li>Hoodies &amp; Sweatshirts</li>
                    <li>Jackets</li>
                    <li>Pants</li>
                    <li>Shorts</li>
                  </ul>
                </li>
                <li>Sports Clothing
                  <ul>
                    <li>Football</li>
                    <li>Basketball</li>
                    <li>Golf</li>
                    <li>Tennis</li>
                    <li>Swimwear</li>
                  </ul>
                </li>
                <li>Accessories</li>
              </ul>
            </li>
            <li>
              Women's
              <ul>
                <li>Footwear
                  <ul>
                    <li>Leisure Trainers</li>
                    <li>Running Shoes</li>
                    <li>Outdoor Footwear</li>
                    <li>Sandals/Flip Flops</li>
                    <li>Footwear Accessories</li>
                  </ul>
                </li>
                <li>Leisure Clothing
                  <ul>
                    <li>T-Shirts</li>
                    <li>Jackets</li>
                  </ul>
                </li>
                <li>Sports Clothing
                  <ul>
                    <li>Basketball</li>
                    <li>Golf</li>
                    <li>Tennis</li>
                    <li>Swimwear</li>
                  </ul>
                </li>
                <li>Accessories</li>
              </ul>
            </li>
            <li>
              Boy's
              <ul>
                <li>Footwear
                  <ul>
                    <li>Leisure Trainers</li>
                    <li>Running Shoes</li>
                    <li>Outdoor Footwear</li>
                    <li>Sandals/Flip Flops</li>
                    <li>Footwear Accessories</li>
                  </ul>
                </li>
                <li>Leisure Clothing
                  <ul>
                    <li>T-Shirts</li>
                    <li>Hoodies &amp; Sweatshirts</li>
                    <li>Jackets</li>
                    <li>Pants</li>
                    <li>Shorts</li>
                  </ul>
                </li>
                <li>Sports Clothing
                  <ul>
                    <li>Football</li>
                    <li>Basketball</li>
                    <li>Rugby</li>
                    <li>Tennis</li>
                    <li>Swimwear</li>
                  </ul>
                </li>
                <li>Accessories</li>
              </ul>
            </li>
            <li>
              Girl's
              <ul>
                <li>Footwear
                  <ul>
                    <li>Leisure Trainers</li>
                    <li>Running Shoes</li>
                    <li>Fitness Trainers</li>
                    <li>Sandals/Flip Flops</li>
                    <li>Footwear Accessories</li>
                  </ul>
                </li>
                <li>Leisure Clothing
                  <ul>
                    <li>T-Shirts</li>
                    <li>Hoodies &amp; Sweatshirts</li>
                    <li>Jackets</li>
                    <li>Pants</li>
                    <li>Shorts</li>
                  </ul>
                </li>
                <li>Sports Clothing
                  <ul>
                    <li>Basketball</li>
                    <li>Tennis</li>
                    <li>Swimwear</li>
                  </ul>
                </li>
                <li>Accessories</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope){
      })
    </script>
```

## See Also

* [Overview of the ResponsivePanel]({% slug overview_kendoui_responsivepanel_widget %})
* [Overview of the Menu]({% slug overview_kendoui_menu_widget %})
