---
title: AngularJS for Hybrid UI
page_title: AngularJS for Hybrid UI | Kendo UI Hybrid Components
description: "Use the AngularJS directives with hybrid mobile Kendo UI components."
previous_url: /controls/hybrid/angular/angular, /controls/hybrid/support/angular/angular
slug: angularjssupport_hybridkendoui
position: 5
---

# AngularJS for Hybrid UI

As of the Kendo UI Q3 2014 release, Kendo UI includes AngularJS directives for some of its Hybrid UI components, such as the hybrid mobile Application and View, the SplitView, and the ModalView. In this context, the mobile views support AngularJS controllers, directives and tw- way data binding expressions.

## Getting Started

### Use the Hybrid UI Application Directive

###### Example

    <body kendo-mobile-application ng-app="foo">
        <kendo-mobile-view ng-controller="MyCtrl" k-title="'My Title'" k-layout="'default'">
            <kendo-mobile-header>
                <kendo-mobile-nav-bar>
                    <kendo-view-title></kendo-view-title>
                </kendo-mobile-nav-bar>
            </kendo-mobile-header>

            {{hello}}
        </kendo-mobile-view>

        <script>
            angular.module("foo", [ "kendo.directives" ])
                .controller("MyCtrl", function($scope) {
                    $scope.hello = "Hello World!";
                });
        </script>
    </body>

By default, the `kendo-mobile-application` directive should be set to the `body` element with the `ng-app` one.

## Routing

The mobile application instantiates and maintains its own routing mechanism based on the [`router` component]({% slug router_kendoui_singlepageapplication %}), which automatically matches and instantiates views when navigating.

Note that unlike the [`ng-route`, `ng-view`](https://docs.angularjs.org/api/ngRoute) and the [`ui-router`](https://github.com/angular-ui/ui-router) implementations, the mobile application does not unload the previous view when navigating to the new one. Also, AngularJS routing mechanisms are not supported.

## Controllers

If an `ng-controller` directive is set to the `view` element, the controller definition is executed each time the view is shown, matching the view `show`
event.

## Hybrid UI Widget Directives

All directives may be used as elements or as attributes. If a directive is used as an element name, it is replaced with a standard HTML element once the directive is compiled. Each mobile widget features AngularJS on the [Kendo UI demos web site](http://demos.telerik.com/kendo-ui/).

### ActionSheet

The widget is instantiated from the `kendo-mobile-action-sheet` directive. The item actions are assigned with the `k-action` attribute and are resolved from the widget scope.

### Button

The widget is instantiated from the `kendo-mobile-button` directive.

### BackButton

The widget is instantiated from the `kendo-mobile-back-button` directive.

### DetailButton

The widget is instantiated from the `kendo-mobile-detail-button` directive.

### ButtonGroup

The widget is instantiated from the `kendo-mobile-button-group` directive.

### Collapsible

The widget is instantiated from the `kendo-mobile-collapsible` directive. The inner markup follows the same convention as the non-Angular widget.

### Drawer

The widget is instantiated from the `kendo-mobile-drawer` directive. Like the view, it calls the controller (if present) each time it is displayed.

### MobileListView

The widget is instantiated from the `kendo-mobile-list-view` directive.

### ModalView

The widget is instantiated from the `kendo-mobile-modal-view` directive. Like the view, it calls the controller (if present) each time it is displayed.

### NavBar

The widget is instantiated from the `kendo-mobile-nav-bar` directive. The element displaying the view title is instantiated from the `kendo-view-title` directive.

### PopOver

The widget is instantiated from the `kendo-mobile-pop-over` directive. The `ng-controller` directives may be set to the popover views.

### Scroller

The widget is instantiated from the `kendo-mobile-scroller` directive.

### ScrollView

The widget is instantiated from the `kendo-mobile-scroll-view` directive.

### Switch

The widget is instantiated from the `kendo-mobile-switch` directive. The directive should be used as an attribute of an `input` element if the value should be submitted with a form.

### TabStrip

The widget is instantiated from the `kendo-mobile-tab-strip` directive.

### Application

The widget is instantiated from the `kendo-mobile-application` directive.

### Touch

The widget is instantiated from the `kendo-touch` directive.

### View

The widget is instantiated from the `kendo-view` directive. The header and footer elements may be instantiated from the `kendo-mobile-header` and `kendo-mobile-footer` directives, respectively.

### SplitView

The widget is instantiated from the `kendo-mobile-split-view` directive. The panes are instantiated with the `kendo-mobile-pane` directive.

### Layout

The widget is instantiated from the `kendo-mobile-layout` directive. The header and footer elements may be instantiated from the `kendo-mobile-header` and `kendo-mobile-footer` directives, respectively.

## Widget Directives Attributes

The hybrid mobile widgets may be configured via the `k-` prefixed attributes. More information about the attributes parsing is available in the [introductory article on AngularJS]({% slug angularjs_integration_directives %}).

## See also

Other articles on the integration of Kendo UI hybrid components:

* [Integration with Kendo UI for the Web]({% slug integrationkendouiweb_hybridkendoui %})
* [MVVM Integration]({% slug mvvmintegration_hybridkendoui %})
* [Build Applications with AngularJS and the Hybrid UI]({% slug buildappswithangular_tutorial_hybridkendoui %})
