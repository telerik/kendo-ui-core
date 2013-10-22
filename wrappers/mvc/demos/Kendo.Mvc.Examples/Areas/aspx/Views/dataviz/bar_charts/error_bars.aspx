<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
            .Name("chart")
            .Title("Russian Federation Gross domestic product growth /GDP annual %/")
            .Legend(legend => legend.Visible(false))
            .Series(series =>                 
                series.Column(new double[] { 4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3 }).Name("Russian Federation")
                    .ErrorBars(errorBars => errorBars.Value("stderr"))                   
            )
            .ValueAxis(axis => axis
                .Numeric()
                    .Labels(labels => labels.Format("{0}%")) 
                    .Line(line => line.Visible(false))                               
                    .AxisCrossingValue(0, int.MinValue)
            )
            .CategoryAxis(axis => axis      
                .Line(line => line.Visible(false))
                .Labels(labels => labels.Padding(175, 0, 0, 0))
                .Categories("2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011")
            )
            .Tooltip(tooltip => tooltip
                .Visible(true)
                .Format("{0}%")
                .Template("#= series.name #: #= value #")
            )
    %>
</div>

</asp:Content>