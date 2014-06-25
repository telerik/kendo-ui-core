<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
<style>
    .k-leaf {
        color: #fff;
    }

    .k-leaf:hover {
        border: 0;
        color: #fff;
        padding: .7em;
    }
    
    .k-tile-inverse,
    .k-tile-inverse:hover {
        color: #000;
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="treeMap-wrapper" style="margin: auto;">
    <%= Html.Kendo().TreeMap()
            .Name("treeMap")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("_PopulationUSA", "TreeMap")
                )
                .Model(m => m.Children("Items"))
            )
            .ValueField("Value")
            .TextField("Name")
            .Colors(c =>
            {
                c.AddRange("#0c81c5", "#c5dceb"); c.AddRange("#3aa2de", "#d8ecf8");
                c.AddRange("#449000", "#dae9cc"); c.AddRange("#76b800", "#dae7c3");
                c.AddRange("#ffae00", "#f5e5c3"); c.AddRange("#ef4c00", "#f1b092");
                c.AddRange("#9e0a61", "#eccedf");
            })
            .HtmlAttributes(new { style = "height:600px" })
    %>
</div>
</asp:Content>
