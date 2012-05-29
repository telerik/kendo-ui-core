<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="chart-wrapper">
    <%= Html.Kendo().Chart()
        .Name("chart")
        .Title("Price-Performance Ratio")
        .Legend(legend => legend
            .Visible(false)
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Scatter().Labels(labels => labels
                .Visible(true)
                .Template("#= series.name #")
                .Position(ChartPointLabelsPosition.Right)
            )
        )
        .Series(series => {
            series.Scatter(new int[][] { new [] { 120, 102 } })
                .Name("Pentium D 915");
            
            series.Scatter(new int[][] { new [] { 160, 118 } })
                .Name("Pentium D 950");
            
            series.Scatter(new int[][] { new [] { 1000, 137 } })
                .Name("Pentium XE 965")
                .Labels(labels => labels.Position(ChartPointLabelsPosition.Left));
            
            series.Scatter(new int[][] { new [] { 170, 125 } })
                .Name("Athlon 64 X2 4200+");
            
            series.Scatter(new int[][] { new [] { 205, 138 } })
                .Name("Athlon 64 X2 4600+");
            
            series.Scatter(new int[][] { new [] { 800, 147 } })
                .Name("Athlon 64 FX-62");
            
            series.Scatter(new int[][] { new [] { 170, 130 } })
                .Name("Core 2 Duo E6400");
            
            series.Scatter(new int[][] { new [] { 305, 163 } })
                .Name("Core 2 Duo E6600");
            
            series.Scatter(new int[][] { new [] { 530, 177 } })
                .Name("Core 2 Duo E6700");
            
            series.Scatter(new int[][] { new [] { 1000, 190 } })
                .Name("Core 2 Duo Extreme X6800")
                .Labels(labels => labels.Position(ChartPointLabelsPosition.Left));
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
            .Template("#= series.name #")
        )
    %>
</div>
</asp:Content>
