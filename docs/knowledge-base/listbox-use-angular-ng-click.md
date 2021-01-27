---
title: Use AngularJS ng-click in ListBox Template 
description: An example on how to use use AngularJS directive in the jQuery template of the Kendo UI ListBox items.
type: how-to
page_title: Use ng-click in jQuery template | Kendo UI ListBox for jQuery
slug: listbox-use-angular-ng-click
tags: listbox, angularjs, ng-click, angular, template, directive, jQuery, compile
ticketid: 1146854
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox</td>
 </tr>
 <tr>
  <td>Created with version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

Is it possible to use angularjs + `ng-click` inside of a listbox template if I construct the listbox using angular syntax? I'd like to be able to click one of the items in the listbox and have it call the same `ng-click` function that the button can (really I want any angular stuff in there to work, not just `ng-click`)

## Solution

Indeed the AngularJS templates do not include one which works out of the box for the Kendo UI ListBox.

It is possible to use AngularJS directive in the jQuery template if we compile it programmatically.

Here are the important steps:

1. Add an event handler to the [`dataBound`](/api/javascript/ui/listbox/events/databound) event of the first ListBox(the one which has a dataSource).
1. Add an event handler to both of the ListBoxes [`add`](/api/javascript/ui/listbox/events/add) events.
1. Pass the function to the handlers above using a `$timeout`  because the `add` event is triggered before the item is actually added in which the compilation occurs:

```
    $scope.compileTemplate = function(e){     
        var listbox = this;
        $timeout(function(){
            var rows = listbox.items();
            rows.each(function(index,row){
                if(!$(row).hasClass("ng-scope")){
                    $compile(row)($.extend($scope.$new(), listbox.dataItem(row)));
                }               
            });
        });           
    }
```

```dojo
    <div id="example" ng-app="KendoDemos">
      <h2>Compile AngularJS directives in jQuery template</h2>
      <p style="color: #fff;background-color: #ff4350;width:460px;font-size:20px;">Click the Image in the template to trigger "ng-Click"</p>
      <div class="demo-section k-content wide" ng-controller="MyCtrl">
        <select name="optional" id="optional" kendo-list-box k-options="selectOptions1"></select>
        <select name="selected" id="selected" kendo-list-box k-options="selectOptions2"></select>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", [ "kendo.directives" ])
        .controller("MyCtrl", function($scope, $compile, $timeout){

        var customerTemplate = '<span ng-click="clicked()" class="k-state-default" style="background-image: url(\'https://demos.telerik.com/kendo-ui/content/web/Customers/#:data.CustomerID#.jpg\')"></span>' +
            '<span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>';

        $scope.clicked = function(){
          alert("ng-clicked");  
        }
        
        $scope.compileTemplate = function(e){      
            var listbox = this;
            $timeout(function(){
              var rows = listbox.items();
              rows.each(function(index,row){
                if(!$(row).hasClass("ng-scope")){
                  $compile(row)($.extend($scope.$new(), listbox.dataItem(row)));
                }                
              });
            });            
          }

        $scope.customPlaceholder = function(draggedItem) {
          return draggedItem
            .clone()
            .addClass("custom-placeholder")
            .removeClass("k-ghost");
        }
        

        $scope.selectOptions1 = {
          dataBound: $scope.compileTemplate,
          add: $scope.compileTemplate,
          dataTextField: "ContactName",
          dataValueField: "CustomerID",
          template: customerTemplate,
          dataSource: {
            transport: {
              read: {
                dataType: "jsonp",
                url: "https://demos.telerik.com/kendo-ui/service/Customers",
              }
            }
          },
          draggable: { placeholder: $scope.customPlaceholder },
          dropSources: ["selected"],
          connectWith: "selected",
          toolbar: {
            position: "right",
            tools: ["moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove"]
          }
        };
        
        $scope.selectOptions2 = {
          dataTextField: "ContactName",
          dataValueField: "CustomerID",
          template: customerTemplate,
          dataSource:[],
          draggable: { placeholder: $scope.customPlaceholder },
          dropSources: ["optional"],
          connectWith: "optional",
          add: $scope.compileTemplate,
        };
      })
    </script>

    <style>
      #example .demo-section {
        max-width: none;
        width: 695px;
      }

      #example .k-listbox {
        width: 326px;
        height: 310px;
      }

      #example .k-listbox:first-child {
        width: 360px;
        margin-right: 1px;
      }

      .k-ghost {
        display:none!important;
      }

      .custom-placeholder {
        opacity: 0.4;
      }

      #example .k-item {
        line-height: 1em;
      }

      /* Material Theme padding adjustment*/

      .k-material #example .k-item,
      .k-material #example .k-item.k-state-hover,
      .k-materialblack #example .k-item,
      .k-materialblack #examplel .k-item.k-state-hover {
        padding-left: 5px;
        border-left: 0;
      }

      .k-item > span {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        margin: 20px 10px 10px 5px;
      }

      #example .k-item > span:first-child,
      .k-item.k-drag-clue > span:first-child {
        -moz-box-shadow: inset 0 0 30px rgba(0,0,0,.3);
        -webkit-box-shadow: inset 0 0 30px rgba(0,0,0,.3);
        box-shadow: inset 0 0 30px rgba(0,0,0,.3);
        margin: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-size: 100%;
        background-repeat: no-repeat;
      }

      #example h3,
      .k-item.k-drag-clue h3 {
        font-size: 1.2em;
        font-weight: normal;
        margin: 0 0 1px 0;
        padding: 0;
      }

      #example p {
        margin: 0;
        padding: 0;
        font-size: .8em;
      }
    </style>
```
