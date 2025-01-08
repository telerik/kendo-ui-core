---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Diagram for {{ site.framework }} in a RazorPages application."
slug: razorpages_diagramhelper_aspnetcore
position: 2
---

# Diagram in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Diagram for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Diagram component in a Razor Pages scenario.

For the complete project, refer to the [Diagram in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Diagram/DiagramEditing.cshtml).

## Getting Started

To enable CRUD operation in the Telerik UI Diagram within a `RazorPage`:

1. Setup CRUD URLs in the `DataSource` and `ConnectionsDataSource` along with a `Model.Id`. The URL in these methods must refer to the name of the method in the `PageModel`.

    ```HtmlHelper
        .DataSource(d => d
              .ShapeDataSource()
              .Model(m =>
              {
                  m.Id(s => s.Id);
                  m.Field(s => s.Id).Editable(false);
                  m.Field(s => s.JobTitle);
                  m.Field(s => s.Color);
              })
              .Read(r => r.Url("/Diagram/DiagramEditing?handler=ReadShapes").Data("forgeryToken"))
              .Create(r => r.Url("/Diagram/DiagramEditing?handler=CreateShape").Data("forgeryToken"))
              .Destroy(r => r.Url("/Diagram/DiagramEditing?handler=DestroyShape").Data("forgeryToken"))
              .Update(r => r.Url("/Diagram/DiagramEditing?handler=UpdateShape").Data("forgeryToken"))
          )
          .ConnectionsDataSource(d => d
              .Model(m =>
              {
                  m.Id(c => c.Id);
                  m.Field(c => c.Id).Editable(false);
                  m.From(c => c.FromShapeId);
                  m.To(c => c.ToShapeId);
              })
              .Read(r => r.Url("/Diagram/DiagramEditing?handler=ReadConnections").Data("forgeryToken"))
              .Create(r => r.Url("/Diagram/DiagramEditing?handler=CreateConnection").Data("forgeryToken"))
              .Destroy(r => r.Url("/Diagram/DiagramEditing?handler=DestroyConnection").Data("forgeryToken"))
              .Update(r => r.Url("/Diagram/DiagramEditing?handler=UpdateConnection").Data("forgeryToken"))
          )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-diagram name="diagram">
            <hierarchical-datasource server-operation="false" type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Page("DiagramData", "ReadShapes")" />
                    <create url="@Url.Page("DiagramData", "CreateShape")" />
                    <destroy url="@Url.Page("DiagramData", "DestroyShape")" />
                    <update url="@Url.Page("DiagramData", "UpdateShape")" />
                </transport>
                <schema>
                    <hierarchical-model id="Id">
                        <fields>
                            <field name="Id" editable="false" type="number"></field>
                            <field name="JobTitle" type="string"></field>
                            <field name="Color" type="string"></field>
                        </fields>
                    </hierarchical-model>
                </schema>
            </hierarchical-datasource>
            <connections-datasource server-operation="false" type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Page("DiagramData", "ReadShapes")" />
                    <create url="@Url.Page("DiagramData", "CreateShape")" />
                    <destroy url="@Url.Page("DiagramData", "DestroyShape")" />
                    <update url="@Url.Page("DiagramData", "UpdateShape")" />
                </transport>
                <schema>
                    <model id="id">
                        <fields>
                            <field name="id" editable="false" type="number"></field>
                            <field name="text" editable="false" type="string"></field>
                            <field name="from" from="FromShapeId" type="number"></field>
                            <field name="to" from="ToShapeId" type="number"></field>
                            <field name="fromX" from="FromPointX" type="number"></field>
                            <field name="fromY" from="FromPointY" type="number"></field>
                            <field name="toX" from="ToPointX" type="number"></field>
                            <field name="toY" from="ToPointY" type="number"></field>
                        </fields>
                    </model>
                </schema>
            </connections-datasource>

        </kendo-diagram>
    ```
    {% endif %}
1. Add an AntiForgeryToken on top of the `RazorPage`.

    ```cshtml
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the AntiForgeryToken with each POST request of the page. Additional paratemers can also be supplied.

    ```javascript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
1. Within the `.cs` file, introduce ActionMethod for each of the CRUD operations.


    ```csharp
        public JsonResult OnPostReadShapes([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(DiagramShapes.ToDataSourceResult(request));
        }

        public JsonResult OnPostCreateShape([DataSourceRequest] DataSourceRequest request, OrgDiagramShape shape)
        {
            shape.Id = DiagramShapes.Count + 2;
            DiagramShapes.Add(shape);

            return new JsonResult(new[] { shape }.ToDataSourceResult(request, ModelState));
        }
        
        public JsonResult OnPostUpdateShape([DataSourceRequest] DataSourceRequest request, OrgDiagramShape shape)
        {
            DiagramConnections.Where(x => x.Id == shape.Id).Select(x => shape);

            return new JsonResult(new[] { shape }.ToDataSourceResult(request, ModelState));
        }
        
        public JsonResult OnPostDestroyShape([DataSourceRequest] DataSourceRequest request, OrgDiagramShape shape)
        {
            DiagramShapes.Remove(DiagramShapes.FirstOrDefault(x => x.Id == shape.Id));

            return new JsonResult(new[] { shape }.ToDataSourceResult(request, ModelState));
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Diagram](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram)
* [Server-Side HtmlHelper API of the Diagram](/api/diagram)
* [Server-Side TagHelper API of the Diagram](/api/taghelpers/diagram)
* [Knowledge Base Section](/knowledge-base)
