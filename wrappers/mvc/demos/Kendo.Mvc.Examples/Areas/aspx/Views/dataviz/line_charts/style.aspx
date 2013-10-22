<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
          .Name("chart")
          .Title("A digital signal")
          .Legend(false)
          .Series(series => {
              series.Line(new double[] { 20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19, 1, 20, 2, 18, 5, 12, 7, 10, 8 })
                    .Style(ChartLineStyle.Normal)
                    .Markers(x => x.Visible(false));
          })
          .CategoryAxis(axis => axis
              .Title("time")
              .MajorGridLines(lines => lines.Visible(false))
              .MajorTicks(lines => lines.Visible(false))
          )
          .ValueAxis(axis => axis.Numeric()
              .Max(22)
              .Title("voltage")
              .MajorGridLines(lines => lines.Visible(false))
              .Visible(false)
          )
    %> 
</div>

<div class="configuration-horizontal">
    <div class="config-section">
        <span class="configHead">Style</span>
        <ul class="options">
            <li>
                <%= Html.Kendo().DropDownList()
                        .Name("style")
                        .Items(items =>
                        {
                            items.Add().Text("Normal").Value("normal");
                            items.Add().Text("Step").Value("step");
                            items.Add().Text("Smooth").Value("smooth");
                        })
                        .DataTextField("Text")
                        .DataValueField("Value")
                        .Events(events=> events.Change("onStyleChange"))
                 %>
            </li>
        </ul>
    </div>
</div>

<script>
    function onStyleChange() {
        var chart = $("#chart").data("kendoChart");
        chart.options.series[0].style = this.value();
        chart.redraw();
    }
</script>

<style scoped>
    .chart-wrapper, .chart-wrapper .k-chart {
        height: 300px;
    }
</style>
</asp:Content>
