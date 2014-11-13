<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<%@ Import Namespace="Kendo.Mvc.Examples.Models" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<script>
    function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;
        
        if (dataItem.JobTitle === "President") {
            g.append(new dataviz.diagram.Circle({
                radius: 60,
                stroke: {
                    width: 2,
                    color: "#586477"
                },
                fill: "#e8eff7"
            }));
        } else {
            g.append(new dataviz.diagram.Rectangle({
                width: 240,
                height: 67,
                stroke: {
                    width: 0
                },
                fill: "#e8eff7"
            }));

            g.append(new dataviz.diagram.Rectangle({
                width: 8,
                height: 67,
                fill: dataItem.Color,
                stroke: {
                    width: 0
                }
            }));
        }

        return g;
    }

    function onDataBound(e) {
        var that = this;
        setTimeout(function () {
            that.bringIntoView(that.shapes);
        }, 0);
    }
</script>
<div class="diagram-wrapper" style="margin: auto; height: 600px;">
    <%= Html.Kendo().Diagram<OrgChartShape, OrgChartConnection>()
            .Name("diagram")
            .DataSource(d => d
                .ShapeDataSource()
                .Model(m =>
                {
                    m.Id(s => s.Id);
                    m.Field(s => s.JobTitle);
                    m.Field(s => s.Color);
                })
                .Read("ReadShapes", "Diagram")
                .Create("CreateShape", "Diagram")
                .Destroy("DestroyShape", "Diagram")
                .Update("UpdateShape", "Diagram")
            )
            .ConnectionsDataSource(d => d
                .Model(m =>
                {
                    m.Id(c => c.Id);
                    m.From(c => c.FromShapeId);
                    m.To(c => c.ToShapeId);
                    m.FromX(c => c.FromPointX);
                    m.FromY(c => c.FromPointY);
                    m.ToX(c => c.ToPointX);
                    m.ToY(c => c.ToPointY);
                })
                .Read("ReadConnections", "Diagram")
                .Create("CreateConnection", "Diagram")
                .Destroy("DestroyConnection", "Diagram")
                .Update("UpdateConnection", "Diagram")
            )
            .Events(e => e.DataBound("onDataBound"))
            .Layout(l => l
                .Type(DiagramLayoutType.Tree)
                .Subtype(DiagramLayoutSubtype.Tipover)
                .UnderneathHorizontalOffset(140)
            )
            .ShapeDefaults(sd => sd
                .Visual("visualTemplate")
                .Content(c => c
                    .Template("#= dataItem.JobTitle #")
                    .FontSize(17)
                )
            )
            .ConnectionDefaults(cd => cd
                .Stroke(s => s
                    .Color("#586477")
                    .Width(2)
                )
            )
            .HtmlAttributes(new { style = "height: 600px;" } )
    %>
</div>
</asp:Content>
