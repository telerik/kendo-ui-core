<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
         Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.DonutChartsRemoteDataViewModel>()
        .Name("chart")
        .Title("1024x768 screen resolution trends")
        .Legend(legend => legend
        .Position(ChartLegendPosition.Top)
        )
        .DataSource(ds => ds
        .Read(read => read.Action("_WorldScreenResolution", "Donut_Charts"))
        .Group(group => group.Add(item => item.Year))
        .Sort(sort => sort.Add(item => item.OrderNumber)))
        .Series(series =>
        {
        series.Donut("Share", "Resolution", "Color", visibleInLegendMemberName: "VisibleInLegend")
            .Padding(10)
            .StartAngle(270);
        })
        .Tooltip(tooltip => tooltip
        .Visible(true)
        .Template("#= dataItem.resolution #: #= value #% (#= dataItem.year #)")
        )
     %>   
</div>

<style scoped>
    .chart-wrapper 
    {
    	text-align: center;
    	padding-top: 20px;
    	background-repeat: no-repeat;
    }
</style>
</asp:Content>
