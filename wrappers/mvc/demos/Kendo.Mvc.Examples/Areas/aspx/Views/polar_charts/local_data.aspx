<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.Chart.SunPositionItem>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title(title => title
            .Text("Sun position at equinox")
        )
        .Series(series =>
        {
            series.PolarLine(
                model => model.Azimuth,
                model => model.Altitude
            )
            .Labels(labels => labels
                .Template("#= dataItem.Time.substring(0,2) #h")
                .Position(ChartPointLabelsPosition.Below)
                .Visible(true)
            );
        })
        .XAxis(axis => axis
            .Numeric()
            .StartAngle(-90)
            .MajorUnit(30)
        )
        .YAxis(axis => axis
            .Numeric()
            .Labels(labels => labels
                .Visible(false)
            )
        )
    %>
</div>
</asp:Content>
