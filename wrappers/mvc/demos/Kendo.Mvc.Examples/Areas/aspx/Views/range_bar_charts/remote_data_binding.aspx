<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
         Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.DownloadSpeed>()
        .Name("chart")
        .Title("Transfer speed Mbit/s")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Top)
        )
        .DataSource(ds => ds.Read(read => read.Action("_DownloadSpeeds", "Range_Bar_Charts")))
        .Series(series => {
            series.RangeColumn(model => model.WiFiFrom, model => model.WiFiTo).Name("WiFi");
            series.RangeColumn(model => model.OpticalFrom, model => model.OpticalTo).Name("Optical");
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Day)
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= value.from # - #= value.to #")
        )
    %>
</div>
</asp:Content>
