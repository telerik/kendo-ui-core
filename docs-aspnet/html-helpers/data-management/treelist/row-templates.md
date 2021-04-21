---
title: Row Templates
page_title: Row Templates
description: "Get started with the {{ site.product_short }} TreeList by Kendo UI and learn how to place custom content into a treelist row with the help of row templates."
slug: row_templates_aspnetcore_treelist
position: 3
---

# Row Templates

The Kendo UI TreeList supports a row template that enables you to place custom content into a TreeList row.

For runnable example, refer to:
* [Demo on using the row template of the TreeList HtmlHelper for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/treelist/rowtemplate)

The following example demonstrates how to implement a row template by using its Id:

    .Columns(columns =>
    {
        columns.Add().Field(e => e.FirstName).Title("Employee").Width(280).TemplateId("photo-template").Width(180);
        columns.Add().Field(e => e.Country).Title("Country").Width(160).TemplateId("country-template");
        columns.Add().Field(e => e.HireDate).Title("Length of Service").Width(160).TemplateId("lengthOfService-template");
    })

The following scripts will generate the content for the templates:

 ```   
<script id="photo-template" type="text/x-kendo-template">
   <div class='employee-photo'
        style='background-image: url(@Url.Content("~/content/web/treelist/people")/#: EmployeeId #.jpg);'></div>
   <div class='employee-name'>#: FirstName # #: LastName # <span class = 'employee-position'>#: Position #</span></div>
</script>

<script id="country-template" type="text/x-kendo-template">
    <img class= "county-flag" src="../Content/web/country-flags/#: CountryFlag #.png" />
</script>

<script id="lengthOfService-template" type="text/x-kendo-template">
    <span id='badge_#=EmployeeId#' class='badgeTemplate'>#: Math.floor((kendo.date.today() - HireDate)/(365*24*60*60*1000)) #</span>
</script>
```

## See Also

* [Using Row Templates in the TreeList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/treelist/rowtemplate)
* [Server-Side API](/api/treelist)
