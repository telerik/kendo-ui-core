<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="box">
    <h4>Export diagram content</h4>
    <div class="box-col">
        <button class='export-pdf k-button'>Export as PDF</button>
    </div>
    <div class="box-col">
        <button class='export-img k-button'>Export as Image</button>
    </div>
    <div class="box-col">
        <button class='export-svg k-button'>Export as SVG</button>
    </div>
</div>

<script>
    $(".export-pdf").click(function () {
        var diagram = $("#diagram").getKendoDiagram();
        diagram.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "diagram.pdf",
                proxyURL: "<%= Url.Action("Export_Save", "Diagram") %>"
        });
    });
});

$(".export-img").click(function () {
    var diagram = $("#diagram").getKendoDiagram();
    diagram.exportImage().done(function (data) {
        kendo.saveAs({
            dataURI: data,
            fileName: "diagram.png",
            proxyURL: "<%= Url.Action("Export_Save", "Diagram") %>"
        });
    });
});

$(".export-svg").click(function () {
    var diagram = $("#diagram").getKendoDiagram();
    diagram.exportSVG().done(function (data) {
        kendo.saveAs({
            dataURI: data,
            fileName: "diagram.svg",
            proxyURL: "<%= Url.Action("Export_Save", "Diagram") %>"
        });
    });
});
</script>

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
                  .Action("Export_Read", "Diagram")
              )
              .Model(m => m.Children("Items"))
          )
          .Editable(false)
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