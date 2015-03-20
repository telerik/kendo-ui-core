---
title: AngularJS Integration
page_title: Kendo UI Mobile Application AngularJS Directive
position: 1
---

# AngularJS Integration

Since Q3 2014, Kendo UI includes AngularJS directives for the mobile application and the mobile view, SplitView, and ModalView components. In that
context, The mobile views support AngularJS controllers, directives and two way data binding expressions.

## Kendo UI Mobile Application directive

    <body kendo-mobile-application ng-app="foo">
        <kendo-mobile-view ng-controller="mine" k-title="'My Title'" k-layout="'default'">
            <kendo-mobile-header>
                <kendo-mobile-nav-bar>
                    <kendo-view-title></kendo-view-title>
                </kendo-mobile-nav-bar>
            </kendo-mobile-header>

            {{hello}}
        </kendo-mobile-view>

        <script>
            angular.module("foo", [ "kendo.directives" ])
                .controller("main", function($scope) {
                    $scope.hello = "Hello World!";
                }]);
        </script>
    </body>

By default, the `kendo-mobile-application` directive should be set to the `body` element with the `ng-app` one.

## Routing Integration

The mobile application instantiates and maintains its own routing mechanism based on the [router component](/framework/spa/router), which
automatically matches and instantiates views when navigating.
Unlike the [ng-route/ng-view](https://docs.angularjs.org/api/ngRoute) and the [ui-router](https://github.com/angular-ui/ui-router) implementations,
the mobile application **does not unload** the previous view when navigating to the new one. Note that AngularJS routing mechanisms are **not supported**.

## AngularJS Controllers Support

If an `ng-controller` directive is set to the `view` element, the controller definition will be executed each time the view is shown (matching the view `show`
event).

## Mobile Widget Directives

All directives may be used as elements or as attributes. If the directive is used as an element name, it **will be replaced** with a standard HTML
element once the directive is compiled. Each mobile widget features an AngularJS in the [Kendo UI demos web site](http://demos.telerik.com/kendo-ui/).

### ActionSheet

the widget is instantiated from the `kendo-mobile-action-sheet` directive. The item actions are assigned with the `k-action` attribute and are
resolved from the widget scope.

### Mobile Button

The widget is instantiated from the `kendo-mobile-button` directive.

### Mobile BackButton

The widget is instantiated from the `kendo-mobile-back-button` directive.

### Mobile DetailButton

The widget is instantiated from the `kendo-mobile-detail-button` directive.

### ButtonGroup

The widget is instantiated from the `kendo-mobile-button-group` directive.

### Drawer

The widget is instantiated from the `kendo-mobile-drawer` directive. Like the view, it calls the controller (if present) each time it is displayed.

### MobileListView

The widget is instantiated from the `kendo-mobile-list-view` directive.

### ModalView

The widget is instantiated from the `kendo-mobile-modal-view` directive. Like the view, it calls the controller (if present) each time it is displayed.

### NavBar

The widget is instantiated from the `kendo-mobile-nav-bar` directive. The element displaying the view title is instantiated from the
`kendo-view-title` directive.

### PopOver

The widget is instantiated from the `kendo-mobile-pop-over` directive. `ng-controller` directives may be set to the popover views.

### Scroller

The widget is instantiated from the `kendo-mobile-scroller` directive.

### ScrollView

The widget is instantiated from the `kendo-mobile-scroll-view` directive.

### Switch

The widget is instantiated from the `kendo-mobile-switch` directive. The directive should be used as an **attribute** of an input element if the
value should be submitted with a form.

### TabStrip

The widget is instantiated from the `kendo-mobile-tab-strip` directive.

### Application

The widget is instantiated from the `kendo-mobile-application` directive.

### Touch

The widget is instantiated from the `kendo-touch` directive.

### View

The widget is instantiated from the `kendo-view` directive. The header and footer elements may be instantiated from the `kendo-mobile-header` and
`kendo-mobile-footer` directives, respectively.

### SplitView

The widget is instantiated from the `kendo-mobile-split-view` directive. The panes are instantiated with the `kendo-mobile-pane` directive.

### Layout

The widget is instantiated from the `kendo-mobile-layout` directive. The header and footer elements may be instantiated from the `kendo-mobile-header` and
`kendo-mobile-footer` directives, respectively.

## Widget Directives Attributes

The mobile widgets may be configured via the `k-` prefixed attributes. More information about the attributes parsing is available in the [Using Kendo UI
with AngularJS](/AngularJS/introduction#widget-options-in-html) help topic.

