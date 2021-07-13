---
title: The Telerik UI Diagram in RazorPages
page_title: The Telerik UI Diagram in RazorPages
description: "Telerik UI Diagram for {{ site.framework }} in a RazorPages application."
slug: razorpages_diagramhelper_aspnetcore
position: 2
---

# Telerik UI Diagram in Razor Pages


Razor Pages are an alternative to the MVC pattern. Razor Pages make page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cs` file (generally, the two files have the same name). You can seamlessly integrate the Telerik UI Diagram for {{ site.framework }} in Razor Pages applications.

For a runnable example, refer to the [Diagram in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Diagram).

## Getting Started

To enable CRUD operation in the Telerik UI Diagram within a `RazorPage`:


1. Setup CRUD URLs in the `DataSource` and `ConnectionsDataSource` along with a `Model.Id`. The URL in these methods must refer to the name of the method in the `PageModel`.


    ```
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
1. Add an AntiForgeryToken on top of the `RazorPage`.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the AntiForgeryToken with each POST request of the page. Additional paratemers can also be supplied.

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
1. Within the `.cs` file, introduce ActionMethod for each of the CRUD operations.


    ```
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

* [Server-Side API](/api/diagram)
