---
title: Hybrid UI Integration
page_title: Hybrid UI Integration | Kendo UI Hybrid Components
description: "Use the AngularJS directives with hybrid mobile Kendo UI components."
previous_url: /controls/hybrid/angular/angular, /controls/hybrid/support/angular/angular, /AngularJS/angular-hybrid
slug: angularjssupport_hybridkendoui
position: 5
---

# Hybrid UI Integration

As of the Kendo UI Q3 2014 release, the suite includes AngularJS directives for some of its Hybrid UI components such as the Application, View, SplitView, and ModalView.

In this context, the mobile views support AngularJS controllers, directives, and two-way data binding expressions.

## Getting Started

The following example demonstrates how to use the Hybrid UI Application directive. By default, the `kendo-mobile-application` directive is set to the `body` element with `ng-app`.

    <body kendo-mobile-application ng-app="foo">
        <kendo-mobile-view ng-controller="MyCtrl" k-title="'My Title'" k-layout="'default'">
            <kendo-mobile-header>
                <kendo-mobile-nav-bar>
                    <kendo-view-title></kendo-view-title>
                </kendo-mobile-nav-bar>
            </kendo-mobile-header>

            {% raw %} {{hello}} {% endraw %}
        </kendo-mobile-view>

        <script>
            angular.module("foo", [ "kendo.directives" ])
                .controller("MyCtrl", function($scope) {
                    $scope.hello = "Hello World!";
                });
        </script>
    </body>

## Routing

The mobile application instantiates and maintains its own routing mechanism based on the [`router`]({% slug router_kendoui_singlepageapplication %}) component which automatically matches and instantiates views when navigating. Unlike the [`ng-route`, `ng-view`](https://docs.angularjs.org/api/ngRoute), and the [`ui-router`](https://github.com/angular-ui/ui-router) implementations, the mobile application does not unload the previous view when navigating to the new one. Also, AngularJS routing mechanisms are not supported.

## Controllers

If an `ng-controller` directive is set to the `view` element, the controller definition is executed each time the view is shown, matching the view `show`
event.

## Widgets

All directives may be used as elements or as attributes. If a directive is used as an element name, it is replaced with a standard HTML element once the directive is compiled. Each mobile widget features AngularJS on the [Kendo UI demos website](http://demos.telerik.com/kendo-ui/).

* ActionSheet&mdash;The widget is instantiated from the `kendo-mobile-action-sheet` directive. The item actions are assigned with the `k-action` attribute and are resolved from the widget scope.
* Button&mdash;The widget is instantiated from the `kendo-mobile-button` directive.
* BackButton&mdash;The widget is instantiated from the `kendo-mobile-back-button` directive.
* DetailButton&mdash;The widget is instantiated from the `kendo-mobile-detail-button` directive.
* ButtonGroup&mdash;The widget is instantiated from the `kendo-mobile-button-group` directive.
* Collapsible&mdash;The widget is instantiated from the `kendo-mobile-collapsible` directive. The inner markup follows the same convention as the non-Angular widget.
* Drawer&mdash;The widget is instantiated from the `kendo-mobile-drawer` directive. Like the view, it calls the controller (if present) each time it is displayed.
* MobileListView&mdash;The widget is instantiated from the `kendo-mobile-list-view` directive.
* ModalView&mdash;The widget is instantiated from the `kendo-mobile-modal-view` directive. Like the view, it calls the controller (if present) each time it is displayed.
* NavBar&mdash;The widget is instantiated from the `kendo-mobile-nav-bar` directive. The element displaying the view title is instantiated from the `kendo-view-title` directive.
* PopOver&mdash;The widget is instantiated from the `kendo-mobile-pop-over` directive. The `ng-controller` directives may be set to the popover views.
* Scroller&mdash;The widget is instantiated from the `kendo-mobile-scroller` directive.
* ScrollView&mdash;The widget is instantiated from the `kendo-mobile-scroll-view` directive.
* Switch&mdash;The widget is instantiated from the `kendo-mobile-switch` directive. The directive should be used as an attribute of an `input` element if the value should be submitted with a form.
* TabStrip&mdash;The widget is instantiated from the `kendo-mobile-tab-strip` directive.
* Application&mdash;The widget is instantiated from the `kendo-mobile-application` directive.
* Touch&mdash;The widget is instantiated from the `kendo-touch` directive.
* View&mdash;The widget is instantiated from the `kendo-view` directive. The header and footer elements may be instantiated from the `kendo-mobile-header` and `kendo-mobile-footer` directives, respectively.
* SplitView&mdash;The widget is instantiated from the `kendo-mobile-split-view` directive. The panes are instantiated with the `kendo-mobile-pane` directive.
* Layout&mdash;The widget is instantiated from the `kendo-mobile-layout` directive. The header and footer elements may be instantiated from the `kendo-mobile-header` and `kendo-mobile-footer` directives, respectively.

## Attributes

To configure the hybrid widgets, you can use the `k-` prefixed attributes. For more information on the parsing of attributes, refer to the [introductory article on AngularJS]({% slug angularjs_integration_directives %}).

## See Also

* [Integration with Kendo UI for the Web]({% slug integrationkendouiweb_hybridkendoui %})
* [MVVM Integration]({% slug mvvmintegration_hybridkendoui %})
* [Build Applications with AngularJS and the Hybrid UI]({% slug buildappswithangular_tutorial_hybridkendoui %})
* [Angular 2 Migration Guide](http://ngmigrate.telerik.com/)
