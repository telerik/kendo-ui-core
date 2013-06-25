<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.WindDataItem>()
        .Name("chart")
        .Title("Wind Rose")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Right)
            .Labels(labels => labels
                .Template("#= (series.data[0] || {}).Category # m/s")
            )
        )
        .DataSource(ds => ds
            .Read(read => read.Action("_WindData", "Radar_Charts"))
            .Group(group => group.Add(model => model.Category))
            .Sort(sort => sort.Add(model => model.Dir))
        )
        .SeriesColors("#1b79e4", "#3b6ad3", "#5d5ac2",
                      "#8348ae", "#a23a9d", "#c42a8c", "#e51a7a")
        .Series(series =>
        {
            series.RadarColumn(model => model.Frequency, categoryExpression: model => model.DirText)
                  .Stack(true);
        })
        .ValueAxis(axis => axis.Numeric()
            .Visible(false)
        )
        .Tooltip(tooltip => tooltip
            .Template("#= category # (#= dataItem.Category # m/s) #= value #%")
            .Visible(true)
        )
    %>
</div>
</asp:Content>
