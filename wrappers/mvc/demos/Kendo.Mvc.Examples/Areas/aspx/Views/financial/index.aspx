<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%= Html.Kendo().StockChart<Kendo.Mvc.Examples.Models.StockDataPoint>()
        .Name("stockChart")
        .Title("The Boeing Company (NYSE:BA)")
        .DataSource(ds => ds.Read(read => read
            .Action("_BoeingStockData", "Financial")
        ))
        .DateField("Date")
        .Series(series => {
            series.Candlestick(s => s.Open, s => s.High, s => s.Low, s => s.Close);
        })
        .Navigator(nav => nav
            .Series(series => {
                series.Area(s => s.Close);
            })
            .Select(
                DateTime.Parse("2009/02/05"),
                DateTime.Parse("2011/10/07")
            )
        )
        .CategoryAxis(categoryAxis => categoryAxis.Date()
            .Notes(notes => notes
                .Data(item => {
                    item.Add().Value(DateTime.Parse("2001/01/01")).Label(label => label.Text("01"));
                    item.Add().Value(DateTime.Parse("2002/01/01")).Label(label => label.Text("02"));
                    item.Add().Value(DateTime.Parse("2003/01/01")).Label(label => label.Text("03"));
                    item.Add().Value(DateTime.Parse("2004/01/01")).Label(label => label.Text("04"));
                    item.Add().Value(DateTime.Parse("2005/01/01")).Label(label => label.Text("05"));
                    item.Add().Value(DateTime.Parse("2006/01/01")).Label(label => label.Text("06"));
                    item.Add().Value(DateTime.Parse("2007/01/01")).Label(label => label.Text("07"));
                    item.Add().Value(DateTime.Parse("2008/01/01")).Label(label => label.Text("08"));
                    item.Add().Value(DateTime.Parse("2009/01/01")).Label(label => label.Text("09"));
                    item.Add().Value(DateTime.Parse("2010/01/01")).Label(label => label.Text("10"));
                    item.Add().Value(DateTime.Parse("2011/01/01")).Label(label => label.Text("11"));
                    item.Add().Value(DateTime.Parse("2012/01/01")).Label(label => label.Text("12"));
                })
            )
        )
    %>
</asp:Content>