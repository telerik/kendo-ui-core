---
title: Declaratively Initialize ComboBox with Templates
page_title: Declaratively Initialize ComboBox with Templates | Kendo UI ComboBox
description: "Learn how to declaratively initialize Kendo UI ComboBox with templates."
slug: howto_declaratively_initialize_with_templates_combobox
---

# Declaratively Initialize ComboBox with Templates

The example below demonstrates how to declaratively initialize the ComboBox widget with templates.

###### Example

```html
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
          <img src="../content/web/Customers/#=data.CustomerID#.jpg" alt="#:data.CustomerID#" />
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
                dataType: "jsonp",
                url: "http://demos.telerik.com/kendo-ui/service/Customers"
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

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
