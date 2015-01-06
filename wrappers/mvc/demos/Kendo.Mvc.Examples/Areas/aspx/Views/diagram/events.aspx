<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<%@ Import Namespace="Kendo.Mvc.Examples.Models" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<%= Html.Kendo().Diagram<OrgChartShape, OrgChartConnection>()
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
            .Read("ReadShapes", "Diagram")
            .Create("CreateShape", "Diagram")
            .Destroy("DestroyShape", "Diagram")
            .Update("UpdateShape", "Diagram")
        )
        .ConnectionsDataSource(d => d
            .Model(m =>
            {
                m.Id(c => c.Id);
                m.Field(c => c.Id).Editable(false);
                m.Field(c => c.Text).Editable(false);
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
        .Events(events => events
            .ItemRotate("onItemRotate")
            .Pan("onPan")
            .MouseEnter("onMouseEnter")
            .MouseLeave("onMouseLeave")
            .Select("onSelect")
            .ZoomStart("onZoomStart")
            .ZoomEnd("onZoomEnd")
            .Click("onClick")
            .DataBound("onDataBound")
            .Edit("onEdit")
            .Add("onAdd")
            .Remove("onRemove")
            .Cancel("onCancel")
        )
%>
<div class="box">
    <h4>Console log</h4>
    <div class="console"></div>
</div>

<script>
    function onDataBound(e) {
        kendoConsole.log("Diagram data bound");
    }

    function onEdit(e) {
        kendoConsole.log("Diagram edit");
    }

    function onAdd(e) {
        kendoConsole.log("Diagram add");
    }

    function onRemove(e) {
        kendoConsole.log("Diagram remove");
    }

    function onCancel(e) {
        kendoConsole.log("Diagram cancel");
    }

    function onItemRotate(e) {
        var rotation = e.item.rotate();
        kendoConsole.log("Rotate - angle: " + rotation.angle + " center: " + rotation.x + "," + rotation.y);
    }

    function onPan(e) {
        kendoConsole.log("Pan: " + e.pan.toString());
    }

    function onSelect(e) {
        var action;
        var items;
        if (e.selected.length) {
            action = "Selected";
            items = e.selected;
        } else if (e.deselected.length) {
            action = "Deselected";
            items = e.deselected;
        }

        kendoConsole.log(action + ": " + items.length);
    }

    function onZoomStart(e) {
        kendoConsole.log("Zoom start: " + e.zoom);
    }

    function onZoomEnd(e) {
        kendoConsole.log("Zoom end: " + e.zoom);
    }

    function onClick(e) {
        kendoConsole.log("Click: " + elementText(e.item));
    }

    function onMouseEnter(e) {
        kendoConsole.log("Mouse enter: " + elementText(e.item));
    }

    function onMouseLeave(e) {
        kendoConsole.log("Mouse leave: " + elementText(e.item));
    }

    var diagram = kendo.dataviz.diagram;
    var Shape = diagram.Shape;
    var Connection = diagram.Connection;
    var Point = diagram.Point;

    function elementText(element) {
        var text;
        if (element instanceof Shape) {
            text = element.dataItem.JobTitle;
        } else if (element instanceof Point) {
            text = "(" + element.x + "," + element.y + ")";
        } else if (element instanceof Connection) {
            var source = element.source();
            var target = element.target();
            var sourceElement = source.shape || source;
            var targetElement = target.shape || target;
            text = elementText(sourceElement) + " - " + elementText(targetElement);
        }
        return text;
    }

    function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        if (dataItem.JobTitle === "President") {
            g.append(new dataviz.diagram.Circle({
                radius: 60,
                stroke: {
                    width: 2,
                    color: dataItem.Color || "#586477"
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
</script>

</asp:Content>
