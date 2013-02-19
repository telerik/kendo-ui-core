<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
<style>
    #chart {
        background: center no-repeat url('<%= Url.Content("~/Content/shared/world-map.png") %>')
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
                .Title(title => title
                    .Text("Share of Internet Population Growth, 2007 - 2012")
                    .Position(ChartTitlePosition.Bottom))
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series =>
        {
            series.Pie(new dynamic[] {
        new {category="Asia",value=53.8,color="#9de219"},
        new {category="Europe",value=16.1,color="#90cc38"},
        new {category="LatinAmerica",value=11.3,color="#068c35"},
        new {category="Africa",value=9.6,color="#006634"},
        new {category="MiddleEast",value=5.2,color="#004d38"},
        new {category="NorthAmerica",value=3.6,color="#033939"}           
    })
            .Labels(labels => labels
                .Template("#= category #: #= value#%")
                .Background("transparent")
                .Visible(true)
            )
            .StartAngle(150);
        })
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Format("{0}%")
        )
    %>
</div>
</asp:Content>
