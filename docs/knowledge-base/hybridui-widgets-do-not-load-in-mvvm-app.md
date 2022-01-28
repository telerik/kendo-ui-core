---
title: Hybrid UI Widgets Do Not Load in MVVM Environment
description: Adding Hybrid UI widgets by using the data-role attributes in MVVM is not working.
type: troubleshooting
page_title: Hybrid UI Widgets Do Not Load When Initialized Declaratively in MVVM | Kendo Hybrid UI
slug: hybridui-widgets-do-not-load-in-mvvm-app
tags: hybrid-ui, mvvm, switch, splitview, scrollview
ticketid: 1157657
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo Hybrid UI/MVVM</td>
 </tr>
</table>

## Description

When I attempt to use a Hybrid UI widget by utilizing the `data-role="widgetName"` attribute in the regular Kendo UI MVVM framework, the approach does not work. How can I load a Hybrid UI widget in the Kendo UI MVVM environment?

## Cause

The Hybrid UI widgets and frameworks (with the `kendo.mobile.ui` namespace) are not included in the default list of initialized namespaces when you use `kendo.bind(element, viewModel)`. That is why the `data-role` values are not recognized and the Hybrid UI widgets are not initialized.

## Solution

To initialize Hybrid UI widgets in Kendo UI MVVM, use either of the following approaches:

* Explicitly add the `kendo.mobile.ui` namespace to the list of namespaces that are initialized by `kendo.bind` by running `kendo.bind(element, viewModel, kendo.mobile.ui);`.


    ```dojo
      <div id="example">
        Feature: <span data-bind="text: name"></span></br>
      Confirmed: <input data-role="switch" data-bind="value: switchedOn"/>
      </div>
      <script>
        $(document).ready(function() {
          var viewModel = kendo.observable({
            name: "Illumination",
            switchedOn: true
          });

          kendo.bind($("#example"), viewModel, kendo.mobile.ui);
        });
      </script>
    ```

* If you want to initialize a single Hybrid UI widget or to avoid ambiguity between mobile and web widgets with the same names, use the fully qualified widget name in the `data-role` attribute.

    ```dojo
      <div id="example">
        Feature: <span data-bind="text: name"></span></br>
        Confirmed: <input data-role="kendo.mobile.ui.Switch" data-bind="value: switchedOn"/>
      </div>
      <script>
        $(document).ready(function() {
          var viewModel = kendo.observable({
            name: "Illumination",
            switchedOn: true
          });

          kendo.bind($("#example"), viewModel);
        });
      </script>
    ```
