<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.BarChartsLocalDataViewModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title(title => title
            .Text("Comments per day")
            .Align(ChartTextAlignment.Left)
        )
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series =>
        {
            series.Column(
                model => model.Value,
                model => model.UserColor
            )
            .Labels(labels => labels.Background("transparent").Visible(true));
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Day)
            .MajorGridLines(lines => lines.Visible(false))
            .Line(line => line.Visible(false))
        )
        .ValueAxis(axis => axis.Numeric()
            .Max(28)
            .MajorGridLines(lines => lines.Visible(false))
            .Visible(false)
        )
    %>
</div>
</asp:Content>
