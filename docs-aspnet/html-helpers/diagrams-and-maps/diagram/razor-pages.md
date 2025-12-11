---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Diagram for {{ site.framework }} in a RazorPages application."
components: ["diagram"]
slug: razorpages_diagramhelper_aspnetcore
previous_url: /helpers/diagrams-and-maps/diagram/binding/razor-pages
position: 3
---

# Diagram in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Diagram for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_diagram_aspnetcore_binding %}) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To configure the CRUD operations of the Diagram within a Razor Pages application, follow the next steps:

1. Setup CRUD URLs in the `DataSource` and `ConnectionsDataSource` configurations along with a `Model.Id`. The URL in these methods must refer to the name of the method in the `PageModel`.

    ```HtmlHelper
        @page
        @model DiagramEditingModel

        @(Html.Kendo().Diagram<OrgDiagramShape, OrgDiagramConnection>()
          .Name("diagram")
            .DataSource(d => d
              .ShapeDataSource()
              .Model(m =>
              {
                  m.Id(s => s.Id);
                  m.Field(s => s.Id).Editable(false);
                  m.Field(s => s.JobTitle);
                  m.Field(s => s.Color);
              })
              .Read(r => r.Url(Url.Page("DiagramEditing", "ReadShapes")).Data("forgeryToken"))
              .Create(r => r.Url(Url.Page("DiagramEditing", "CreateShape")).Data("forgeryToken"))
              .Destroy(r => r.Url(Url.Page("DiagramEditing", "DestroyShape")).Data("forgeryToken"))
              .Update(r => r.Url(Url.Page("DiagramEditing", "UpdateShape")).Data("forgeryToken"))
          )
          .ConnectionsDataSource(d => d
              .Model(m =>
              {
                  m.Id(c => c.Id);
                  m.Field(c => c.Id).Editable(false);
                  m.From(c => c.FromShapeId);
                  m.To(c => c.ToShapeId);
              })
              .Read(r => r.Url(Url.Page("DiagramEditing", "ReadConnections")).Data("forgeryToken"))
              .Create(r => r.Url(Url.Page("DiagramEditing", "CreateConnection")).Data("forgeryToken"))
              .Destroy(r => r.Url(Url.Page("DiagramEditing", "DestroyConnection")).Data("forgeryToken"))
              .Update(r => r.Url(Url.Page("DiagramEditing", "UpdateConnection")).Data("forgeryToken"))
          )
          ... // Additional configuration options.
        )
    ```
    {% if site.core %}
    ```TagHelper
        @page
        @model DiagramEditingModel

        <kendo-diagram name="diagram">
            <hierarchical-datasource server-operation="false" type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Page("DiagramEditing", "ReadShapes")" data="forgeryToken"/>
                    <create url="@Url.Page("DiagramEditing", "CreateShape")" data="forgeryToken"/>
                    <destroy url="@Url.Page("DiagramEditing", "DestroyShape")" data="forgeryToken"/>
                    <update url="@Url.Page("DiagramEditing", "UpdateShape")" data="forgeryToken"/>
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
                    <read url="@Url.Page("DiagramEditing", "ReadShapes")" data="forgeryToken"/>
                    <create url="@Url.Page("DiagramEditing", "CreateShape")" data="forgeryToken"/>
                    <destroy url="@Url.Page("DiagramEditing", "DestroyShape")" data="forgeryToken"/>
                    <update url="@Url.Page("DiagramEditing", "UpdateShape")" data="forgeryToken"/>
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
            <!-- Additional configuration options. -->
        </kendo-diagram>
    ```
    {% endif %}

1. Add an AntiForgeryToken on top of the `RazorPage`.

    ```cshtml
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the AntiForgeryToken with each POST request of the page. Additional paratemers can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
1. Within the `.cs` file, introduce ActionMethod for each of the CRUD operations.

    ```C# DiagramEditing.cshtml.cs
    public class DiagramEditingModel : PageModel
    {
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
    }
    ```

For the complete project, refer to the [Diagram in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Diagram/DiagramEditing.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Diagram](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram)
* [Server-Side HtmlHelper API of the Diagram](/api/diagram)
* [Server-Side TagHelper API of the Diagram](/api/taghelpers/diagram)
* [Knowledge Base Section](/knowledge-base)
