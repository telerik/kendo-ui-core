---
title: Initialize ComboBoxes with Templates Declaratively
page_title: Initialize ComboBoxes with Templates Declaratively
description: "Learn how to declaratively initialize a Kendo UI ComboBox with templates."
previous_url: /controls/editors/combobox/how-to/declarative-init-combo-with-templates, /controls/editors/combobox/how-to/mvvm/declarative-init-combo-with-templates
slug: howto_declaratively_initialize_with_templates_combobox
tags: telerik, kendo, jquery, combobox, initialize, with, templates, declaratively
component: combobox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I declaratively initialize a Kendo UI ComboBox with templates?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
  <div id="example">

    <div class="demo-section k-header">
      <h4>Customers</h4>
      <input id="comboBoxTest"
             data-role="combobox"
             data-filter="contains"
             data-value-field="CustomerID"
             data-text-field="ContactName"
             data-bind="source: customerSource"
             data-header-template="headerTemplate"
             data-template="template"
             style="width: 100%;"/>
    </div>

    <script type="text/x-kendo-tmpl" id="headerTemplate">
      <div class="dropdown-header">
        <span class="k-widget k-header">Photo</span>
        <span class="k-widget k-header">Contact info</span>
      </div>
    </script>

    <script type="text/x-kendo-tmpl" id="template">
      <span class="k-state-default">
          <img src="https://demos.telerik.com/kendo-ui/content/web/Customers/#=data.CustomerID#.jpg" alt="#:data.CustomerID#" />
      </span>
      <span class="k-state-default">
          <h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p>
      </span>
    </script>

    <script>
      $(document).ready(function() {
        var viewModel = {
          customerSource: new kendo.data.DataSource({
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/Customers"
              }
            }
          }),
          headerTemplate: kendo.template($("#headerTemplate").html()),
          template: kendo.template($("#template").html())
        };

        kendo.bind(document.documentElement, viewModel);
      });
    </script>
  </div>

  <style>
    .dropdown-header {
      font-size: 1.2em;
    }

    .dropdown-header > span {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      text-align: left;
      display: inline-block;
      border-style: solid;
      border-width: 0 0 1px 1px;
      padding: .3em .6em;
      width: 70%;
    }

    .dropdown-header > span:first-child {
      width: 29%;
      border-left-width: 0;
    }

    .demo-section {
      width: 600px;
    }

    #customers-list .k-item > span{
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: inline-block;
      border-style: solid;
      border-width: 0 0 1px 1px;
      vertical-align: top;
      min-height: 95px;
      width: 79%;
      padding: .6em 0 0 .6em;
    }

    #customers-list .k-item > span:first-child{
      width: 77px;
      border-left-width: 0;
      padding: .6em 0 0 0;
    }

    #customers-list img {
      -moz-box-shadow: 0 0 2px rgba(0,0,0,.4);
      -webkit-box-shadow: 0 0 2px rgba(0,0,0,.4);
      box-shadow: 0 0 2px rgba(0,0,0,.4);
      width: 70px;
      height: 77px;
    }

    #customers-list h3 {
      font-size: 1.6em;
      margin: 0;
      padding: 0;
    }

    #customers-list p {
      margin: 0;
      padding: 0;
    }
  </style>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
