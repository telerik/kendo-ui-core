---
title: Integrate The ResponsivePanel With The Menu In AngularJS
page_title: Integrate The ResponsivePanel With The Menu In AngularJS | Kendo UI ResponsivePanel
description: "Learn how to integrate the ResponsivePanel with the Menu in AngularJS"
slug: howto_integrateresponsivepanelwithmenuinangularjs_responsivepanel
---

# Integrate the ResponsivePanel with the Menu

Check the example on how to have the Menu inside the ResponsivePanel.

###### Example

```html
<div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">    
        <button class="k-rpanel-toggle"><i class="k-icon k-i-hbars"></i></button>

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
