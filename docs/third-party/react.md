---
title: React
page_title: React | Kendo UI Third-Party Tools
description: "Learn how to use Kendo UI widgets in React applications."
previous_url: /React2
slug: reactsupport_integration_kendoui
---

# React

Kendo UI provides integration support for React.

To use any jQuery component in a React application, you need a trial of the [Kendo UI for jQuery](https://www.telerik.com/kendo-ui#jquery) library or a valid [Kendo UI license](https://www.telerik.com/purchase/kendo-ui).

## KendoReact Suite

If you are looking for native React components (no jQuery dependency), please visit [KendoReact](https://www.telerik.com/kendo-react-ui/).
KendoReact a separate suite of 85+ native React components, from Grid and Charts to TimePicker, DatePicker and Menus.

To access the native components, you need to sign up for a [KendoReact trial](https://www.telerik.com/download-login-v2-kendo-react-ui/) or purchase a [KendoReact license](https://www.telerik.com/kendo-react-ui/pricing/).

At this time, most of the components in Kendo UI for jQuery can be found as native equivalents in KendoReact. However, there are still some that are not yet available and in those cases, you can utilize the jQuery equivalent in your React applications following the instructions below.

The [KendoReact Roadmap](https://www.telerik.com/kendo-react-ui/roadmap/) page provides information about the development plans of the team with regard to new components and features.

## Kendo UI for jQuery in React Applications

The KendoReact suite is still growing and some of the components will be available in a later state of the product life cycle. The Kendo UI for jQuery widgets can be used inside a React application.

1. Import the Kendo UI files or a single file if only one or two widgets will be used in order to reduce the bundle size:

    ```
        import '@progress/kendo-ui' // import the entire Kendo UI
        //or
        import '@progress/kendo-ui/js/kendo.scheduler.js'
    ```

1. Add the DOM element that will be used to render the Kendo UI for jQuery widget.

    ```
        <div id="scheduler"></div>
    ```

1. On the `ComponentDidMount` event initialize the widget with its options.

    ```html
        componentDidMount(){
            this.kendoSchedulerInstance = $('#scheduler').kendoScheduler({
                ...Add options
            }).data('kendoScheduler')
        }
    ```

1. The jQuery widgets are not automatically controlled by the changes in the state or the props. If the component has to be changed, the public API methods of the component can be utilized on the `componentDidUpdate` lifecycle method.

    ```
        componentDidUpdate(){
            let event = this.kendoSchedulerInstance.data()[0];
            this.kendoSchedulerInstance.select([event.uid]);
        }
    ```

1. To prevent performance issues and memory leaks, destroy the widget on the `componentWillUnmount` lifecycle method.

    ```
        this.kendoSchedulerInstance.destroy()
        $('#scheduler').empty()
    ```

## Kendo UI Wrappers for React

For convenience, we created example wrapper packages of some of the components that can be used while we are developing a native React equivalent. These packages will handle the creation, updating and destroying of the widgets and will provide a declarative approach of creating the components:

1. [Spreadsheet](#spreadsheet)
1. [PivotGrid](#pivotgrid)

### Spreadsheet

The following example demonstrates how to use the Spreadsheet wrapper.

<iframe src="https://stackblitz.com/edit/kendo-react-spreadsheet?embed=1&file=app/main.js&hideNavigation=1&view=preview" frameborder="0" width="100%" height="800"></iframe>

### PivotGrid

The following example demonstrates how to use the PivotGrid wrapper.

<iframe src="https://stackblitz.com/edit/kendo-react-pivot-grid?embed=1&file=app/main.js&hideNavigation=1&view=preview" frameborder="0" width="100%" height="800"></iframe>

## See Also

* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
