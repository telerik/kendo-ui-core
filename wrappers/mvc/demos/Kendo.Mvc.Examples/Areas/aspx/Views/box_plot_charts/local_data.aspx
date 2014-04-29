<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.OzoneConcentration>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Ozone Concentration (ppm)")
        .Legend(legend => legend.Visible(false))
        .Series(series =>
        {
            series.BoxPlot(l => l.Lower, q1 => q1.Q1, median => median.Median, 
                q3 => q3.Q3, upper => upper.Upper, mean => mean.Mean, outliers => outliers.Outliers);                             
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Year)
            .MajorGridLines(lines => lines.Visible(false))
        )
    %>
</div>
</asp:Content>
