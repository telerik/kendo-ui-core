<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
         Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ScreenResolution>()
            .Name("chart")
            .Title("Screen resolution trends")
            .Legend(legend => legend
                .Position(ChartLegendPosition.Top)
            )
            .DataSource(ds => ds
                .Read(read => read.Action("_WorldScreenResolution", "Donut_Charts"))
                .Group(group => group.Add(item => item.Year))
                .Sort(sort => sort.Add(item=> item.OrderNumber)))
            .Series(series => {
                series.Donut("Share", "Resolution", visibleInLegendMemberName: "VisibleInLegend")
                      .Padding(10);
            })
            .Tooltip(tooltip => tooltip
                .Visible(true)
                .Template("#= dataItem.Resolution #: #= value #%")
            )
            .HtmlAttributes(new { @class = "combined-donuts" })
     %>   
    <div class="single-donuts">
        <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ScreenResolution>()
                .Name("chart2006")
                .Title("2006")
                .Legend(false)
                .DataSource(ds => ds
                    .Read(read => read.Action("_WorldScreenResolution", "Donut_Charts"))
                    .Filter(filter => filter.Add(item => item.Year).IsEqualTo("2006"))
                    .Sort(sort => sort.Add(item=> item.OrderNumber)))
                .Series(series => {
                    series.Donut("Share", "Resolution")
                          .Padding(0);
                })
                .Tooltip(tooltip => tooltip
                    .Visible(true)
                    .Template("#= dataItem.Resolution #: #= value #%")
                )
                .HtmlAttributes(new { @class = "donut" })
         %>  

        <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ScreenResolution>()
                .Name("chart2008")
                .Title("2008")
                .Legend(false)
                .DataSource(ds => ds
                    .Read(read => read.Action("_WorldScreenResolution", "Donut_Charts"))
                    .Filter(group => group.Add(item => item.Year).IsEqualTo("2008"))
                    .Sort(sort => sort.Add(item=> item.OrderNumber)))
                .Series(series => {
                    series.Donut("Share", "Resolution")
                          .Padding(0);
                })
                .Tooltip(tooltip => tooltip
                    .Visible(true)
                    .Template("#= dataItem.Resolution #: #= value #%")
                )
                .HtmlAttributes(new { @class = "donut" })
         %> 

        <%= Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ScreenResolution>()
               .Name("chart2010")
               .Title("2010")
               .Legend(false)
               .DataSource(ds => ds
                   .Read(read => read.Action("_WorldScreenResolution", "Donut_Charts"))
                   .Filter(group => group.Add(item => item.Year).IsEqualTo("2010"))
                   .Sort(sort => sort.Add(item=> item.OrderNumber)))
               .Series(series => {
                   series.Donut("Share", "Resolution")
                         .Padding(0);
               })
               .Tooltip(tooltip => tooltip
                   .Visible(true)
                   .Template("#= dataItem.Resolution #: #= value #%")
               )
               .HtmlAttributes(new { @class = "donut" })
         %>
    </div>
</div>

<style scoped>
    .chart-wrapper 
    {
    	text-align: center;
    	padding-top: 20px;
    	background-repeat: no-repeat;
    }
    .single-donuts
    {
    	width: 390px;
    	height: 150px;
    	margin: 0 auto;
    }
    .chart-wrapper .donut 
    {
    	float: left;
    	width: 130px;
    	height: 130px;
    	padding: 0;
    }
    .chart-wrapper .combined-donuts 
    {
    	width: 500px;
    	height: 280px;
    	margin: 0 auto;
    	padding: 0;
    }
</style>
</asp:Content>
