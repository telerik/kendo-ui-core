---
title: React
page_title: React - Kendo UI Third-Party Tools
description: "Learn how to use Kendo UI widgets in React applications."
previous_url: /React2
slug: reactsupport_integration_kendoui
---

# React

Kendo UI provides integration support for React.

To use any jQuery component in a React application, you need a trial of the [Kendo UI for jQuery](https://www.telerik.com/kendo-ui#jquery) library or a valid [Kendo UI license](https://www.telerik.com/purchase/kendo-ui).

## Kendo UI Wrappers for React

> Since **20 Dec 2021**, the Kendo UI Wrappers for React have been deprecated.

 Instead of using the Kendo UI Wrappers for React, you can use over 100 native and actively supported [KendoReact components](https://www.telerik.com/kendo-react-ui/components/). While you can still use the Kendo UI for jQuery components in React apps, we strongly recommend that you use the KendoReact UI component library, which is 100% React.

For the few React components still missing, we recommend [the approach below](#kendo-ui-for-jquery-in-react-applications) for using Kendo UI for jQuery components in React applications.

## KendoReact Suite

If you are looking for native React components (no jQuery dependency), please visit [KendoReact](https://www.telerik.com/kendo-react-ui/). KendoReact is a UI component library of 100+ native React components, from Data Grid, Scheduler and Charts to DatePickers, Menus and Buttons.

To access the native components, you need to sign up for a [KendoReact trial](https://www.telerik.com/download-login-v2-kendo-react-ui/) or purchase a [KendoReact](https://www.telerik.com/kendo-react-ui/pricing/) or [Kendo UI](https://www.telerik.com/purchase/kendo-ui) license.

Almost all Kendo UI for jQuery components can be found as native equivalents in KendoReact. The Spreadsheet is one exception and you can use the jQuery equivalent in your React applications following the instructions below.

The [KendoReact Roadmap](https://www.telerik.com/support/whats-new/kendo-react-ui/roadmap) page provides information about the development plans of the team with regard to new components and features.

## Kendo UI for jQuery in React Applications

The Kendo UI for jQuery widgets can be used inside a React application following the steps below. Please note, that our recommendation is to use the native React equivalents as they offer much better performance in React applications.

1. Import the Kendo UI files or a single file if only one or two widgets will be used in order to reduce the bundle size:

    ```
        import '@progress/kendo-ui' // import the entire Kendo UI
        //or
        import '@progress/kendo-ui/js/kendo.spreadsheet.js'
    ```

1. Add the DOM element that will be used to render the Kendo UI for jQuery widget.

    ```
        <div id="spreadsheet"></div>
    ```

1. On the `ComponentDidMount` event initialize the widget with its options.

    ```html
        componentDidMount(){
            this.kendoSpreadsheetInstance = $('#spreadsheet').kendoSpreadsheet({
                ...Add options
            }).data('kendoSpreadsheet')
        }
    ```

1. The jQuery widgets are not automatically controlled by the changes in the state or the props. If the component has to be changed, the public API methods of the component can be utilized on the `componentDidUpdate` lifecycle method.

    ```
        componentDidUpdate(){
            spreadsheet.fromJSON({
                sheets: [{
                    name: "Food Order",
                    mergedCells: [
                        "A1:G1"
                    ],
                    rows: [{
                        height: 70,
                        cells: [{
                            value: "My Company", fontSize: 32, textAlign: "center"
                        }]
                    }]
                }]
            });
        }
    ```

1. To prevent performance issues and memory leaks, destroy the widget on the `componentWillUnmount` lifecycle method.

    ```
        this.kendoSpreadsheetInstance.destroy()
        $('#spreadsheet').empty()
    ```


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
