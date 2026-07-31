---
title: Select All
page_title: Select All
description: "Learn how to enable a Select All header in the Telerik UI MultiSelect component for {{ site.framework }} that allows users to select or deselect all items at once."
components: ["multiselect"]
slug: htmlhelpers_multiselect_selectall_aspnetcore
position: 6
---

# Select All

The Telerik UI MultiSelect for {{ site.framework }} provides a built-in Select All feature that renders a sticky header at the top of the dropdown list. Clicking the header selects or deselects all items. When combined with the [`Checkboxes`](/api/kendo.mvc.ui.fluent/multiselectbuilder#checkboxes) option, the header displays a checkbox that reflects the aggregate selection state&mdash;unchecked (none selected), indeterminate (some selected), or checked (all selected).

## Basic Configuration

To enable the Select All header, call the [`SelectAll()`](/api/kendo.mvc.ui.fluent/multiselectbuilder#selectall) method. The following example also enables checkboxes and filtering:

```HtmlHelper
    @(Html.Kendo().MultiSelect()
          .Name("products")
          .Placeholder("Select products...")
          .SelectAll()
          .Checkboxes()
          .Filter(FilterType.Contains)
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("SelectAll_GetProducts", "MultiSelect");
              });
          })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       placeholder="Select products..."
                       select-all="true"
                       checkboxes="true"
                       filter="FilterType.Contains"
                       datatextfield="ProductName"
                       datavaluefield="ProductID">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("SelectAll_GetProducts", "MultiSelect")" />
            </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}
okay no
## Select All with Filtering

When filtering is active, clicking the Select All header selects all items from the data source&mdash;not only the visible subset. After the selection completes, the filter is cleared.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
          .Name("products")
          .Placeholder("Filter and select all matching...")
          .SelectAll()
          .Checkboxes()
          .Filter(FilterType.Contains)
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("SelectAll_GetProducts", "MultiSelect");
              });
          })
          .Value(new[] { 1, 2, 3 })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       placeholder="Filter and select all matching..."
                       select-all="true"
                       checkboxes="true"
                       filter="FilterType.Contains"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       value='new int[] { 1, 2, 3 }'>
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("SelectAll_GetProducts", "MultiSelect")" />
            </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## Customizing the Select All Label

To change the text displayed in the sticky header, use the [`Messages.SelectAll`](/api/kendo.mvc.ui.fluent/multiselectmessagessettingsbuilder#selectallsystemstring) option.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
          .Name("products")
          .SelectAll()
          .Checkboxes()
          .Messages(m => m.SelectAll("Check All Items"))
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("SelectAll_GetProducts", "MultiSelect");
              });
          })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       select-all="true"
                       checkboxes="true"
                       datatextfield="ProductName"
                       datavaluefield="ProductID">
        <messages select-all="Check All Items" />
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("SelectAll_GetProducts", "MultiSelect")" />
            </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## Handling the SelectAllChange Event

The `SelectAllChange` event fires when the user clicks the Select All header. The event is preventable&mdash;calling `e.preventDefault()` cancels the built-in selection logic so you can implement custom behavior.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
          .Name("products")
          .SelectAll()
          .Checkboxes()
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("SelectAll_GetProducts", "MultiSelect");
              });
          })
          .Events(e => e.SelectAllChange("onSelectAllChange"))
    )

    <script>
        function onSelectAllChange(e) {
            if (e.checked) {
                console.log("Selecting all items");
            } else {
                console.log("Deselecting all items");
            }
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       select-all="true"
                       checkboxes="true"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       on-select-all-change="onSelectAllChange">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("SelectAll_GetProducts", "MultiSelect")" />
            </transport>
        </datasource>
    </kendo-multiselect>

    <script>
        function onSelectAllChange(e) {
            if (e.checked) {
                console.log("Selecting all items");
            } else {
                console.log("Deselecting all items");
            }
        }
    </script>
```
{% endif %}

## See Also

* [Select All in the MultiSelect (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/select-all)
* [Summary-Tag Mode]({% slug htmlhelpers_multiselect_tagmode_aspnetcore %})
* [Server-Side API Reference of the MultiSelect](/api/multiselect)
