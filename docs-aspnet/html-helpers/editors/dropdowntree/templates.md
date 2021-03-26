---
title: Templates
page_title: Templates
description: "Use filtering in the Telerik UI DropDownTree HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_dropdowntree_templates_aspnetcore
position: 5
---

# Templates

The DropDownTree provides full control over the way a node, a selected value, a pop-up header, or footer is rendered through the Kendo UI for jQuery templates.

For more information on the capabilities and syntax of the templates, refer to this [documentation article](https://docs.telerik.com/kendo-ui/framework/templates/overview). For a runnable example, refer to the [dem on using templates in the DropDownTree](https://demos.telerik.com/{{ site.platform }}/dropdowntree/templates).

## Basic Usage

The following example demonstrates how to customize the DropDownTree by declaring an inline string.

```
    <!-- DropDownTree initialization -->
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Template("<span><h3>#: data.text #</h3></span>")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "DropDownTree"));
        })
    )
```

The following example demonstrates how to customize the DropDownTree by referencing a script tag by its `id`.

```
    <!-- Template -->
    <script id="dropdowntree-template" type="text/kendo-ui-template">
        #: item.text #
    </script>

    <!-- DropDownTree initialization -->
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .TemplateId("dropdowntree-template")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "DropDownTree"));
        })
    )
```

## Item Template

The item template manages the way the nodes in the DropDownTree are rendered.

The following example demonstrates how to define an item template and how to evaluate it against the `dataItem`.

```
    <!-- Template -->
    <script id="dropdowntree-template" type="text/kendo-ui-template">
        #: item.text #
    </script>

    <!-- DropDownTree initialization -->
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .TemplateId("dropdowntree-template")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "DropDownTree"));
        })
    )
```

## Value Template

The value template manages the way the selected items in the input area of the DropDownTree are rendered.

```
    <!-- Template -->
    <script id="dropdowntree-value-template" type="text/kendo-ui-template">
        <span class="k-sprite #: spriteCssClass #"></span>
        <span> #: data.text # </span>
    </script>

    <!-- DropDownTree initialization -->
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .ValueTemplateId("dropdowntree-value-template")
        .DataSpriteCssClassField("spriteCssClass")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "DropDownTree"));
        })
    )
```

## Header Template

The header template manages the way the pop-up header of a DropDownTree is rendered.

```
    <!-- Template -->
    <script id="dropdowntree-header-template" type="text/kendo-ui-template">
        <strong>Header</strong>
    </script>

    <!-- DropDownTree initialization -->
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .HeaderTemplateId("dropdowntree-header-template")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "DropDownTree"));
        })
    )
```

## Footer Template

The footer template manages the way the pop-up footer of a DropDownTree is rendered. The footer is re-rendered on every change of the Data Source. The context of the template is the widget itself.

```
    <!-- Template -->
    <script id="dropdowntree-footer-template" type="text/x-kendo-template">
        Total <strong>#: instance.dataSource.total() #</strong> items found
    </script>

    <!-- DropDownTree initialization -->
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .FooterTemplateId("dropdowntree-footer-template")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "DropDownTree"));
        })
    )
```

## No-Data Templates

The DropDownTree displays `noDataTemplate` in the popup when the data source is empty.

```
    <!-- Template -->
    <script id="dropdowntree-nodata-template" type="text/x-kendo-template">
        <strong>No Data!</strong>
    </script>

    <!-- DropDownTree initialization -->
    @(Html.Kendo().DropDownTree()
        .Name("dropdowntree")
        .Filter(FilterType.Contains)
	    .NoDataTemplateId("dropdowntree-nodata-template")
        .DataSource(source =>
        {
            source.Read(read => read.Action("Read_TemplateData", "DropDownTree"));
        })
    )
```
## See Also

* [Templates in the DropDownTree HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdowntree/templates)
* [Server-Side API](/api/dropdowntree)
