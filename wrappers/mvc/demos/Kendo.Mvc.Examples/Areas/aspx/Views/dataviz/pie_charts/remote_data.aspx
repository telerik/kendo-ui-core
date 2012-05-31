<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
         Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Title("Spain electricity production (GWh)")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Top)
        )
        .DataSource(ds => ds.Read(read => read.Action("_SpainElectricityProduction", "Pie_Charts")))
        .Series(series => {
            series.Pie(model => model.Nuclear, model => model.Year);
        })
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0:N0}")
        )
    %>
</div>
</asp:Content>
