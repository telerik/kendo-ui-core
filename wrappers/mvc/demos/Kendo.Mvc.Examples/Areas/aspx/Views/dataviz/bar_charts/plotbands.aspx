<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
<style>
    #chart 
    {
        /* UPDATE */
        background: center no-repeat url('<%=Url.Content("~/Content/shared/world-map.png") %>');
        height: 430px;
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ElectricityProduction>()
        .Name("chart")
        .Title("Spain electricity production (GWh)")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Right)
        )
        .DataSource(ds => ds
            .Read(read => read.Action("_SpainElectricityProduction", "Bar_Charts"))
            .Sort(sort => sort.Add("Year").Ascending())
        )
        .Series(series =>
        {
            series.Column(model => model.Nuclear).Name("Nuclear");
            series.Column(model => model.Hydro).Name("Hydro");
            series.Column(model => model.Wind).Name("Wind");
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Year)
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels.Format("{0:N0}"))
            .MajorUnit(10000)
            .Max(70000)
            .Line(line => line.Visible(false))
            .PlotBands(bands =>
            {
                bands.Add().From(10000).To(30000).Color("#c00").Opacity(0.3);
                bands.Add().From(30000).To(30500).Color("#c00").Opacity(0.8);
            })
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0:N0}")
        )
    %>
</div>
</asp:Content>
