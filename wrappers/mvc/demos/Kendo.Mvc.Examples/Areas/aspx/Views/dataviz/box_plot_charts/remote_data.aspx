<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
         Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.OzoneConcentration>()
        .Name("chart")
        .Title("Ozone Concentration (ppm)")
        .Legend(legend => legend.Visible(false))
        .DataSource(source => source
            .Read("_OzoneConcentration", "Box_Plot_Charts")
            .Sort(sort => sort.Add(o => o.Year))    
        )
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
