<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.PricePerformance>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Price-Performance Ratio")
        .Legend(legend => legend
            .Visible(false)
        )
        .Series(series =>
        {
            series.Scatter(model => model.Price, model => model.Performance);
        })
        .XAxis(x => x
            .Numeric()
            .Title(title => title.Text("Price"))
            .Labels(labels => labels.Format("${0}")).Max(1000)
        )
        .YAxis(y => y
            .Numeric()
            .Title(title => title.Text("Performance Ratio"))
            .Labels(labels => labels.Format("{0}%")).Min(80)
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Template("#= '<b>$' + value.x + ' / ' + dataItem.Family + ' ' + dataItem.Model + ': ' + value.y + '%</b>' #")
        )
    %>
</div>
</asp:Content>
