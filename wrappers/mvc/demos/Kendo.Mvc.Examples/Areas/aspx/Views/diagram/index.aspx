<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<script>
    function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        g.append(new dataviz.diagram.Rectangle({
            width: 210,
            height: 75,
            stroke: {
                width: 0
            },
            fill: dataItem.ColorScheme
        }));

        g.append(new dataviz.diagram.TextBlock({
            text: dataItem.FirstName + " " + dataItem.LastName,
            x: 85,
            y: 20,
            color: "#fff"
        }));

        g.append(new dataviz.diagram.TextBlock({
            text: dataItem.Title,
            x: 85,
            y: 40,
            color: "#fff"
        }));

        g.append(new dataviz.diagram.Image({
            source: "<%= Url.Content("~/content/dataviz/diagram/people/") %>" + dataItem.Image,
            x: 3,
            y: 3,
            width: 68,
            height: 68
        }));

        return g;
    }
</script>
<div class="diagram-wrapper" style="margin: auto;">
    <%= Html.Kendo().Diagram()
            .Name("diagram")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("_OrgChart", "Diagram")
                )
                .Model(m => m.Children("Items"))
            )
            .Layout(l => l.Type(DiagramLayoutType.Layered))
            .ShapeDefaults(sd => sd
                .Visual("visualTemplate")
            )
            .ConnectionDefaults(cd => cd
                .Stroke(s => s
                    .Color("#979797")
                    .Width(2)
                )
            )
    %>
</div>
</asp:Content>
