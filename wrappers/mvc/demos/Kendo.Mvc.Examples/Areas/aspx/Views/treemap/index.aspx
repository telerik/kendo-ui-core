<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

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
            .Colors(new string[] {
                "#0c81c5","#3aa2de",
                "#449000", "#76b800",
                "#ffae00", "#ef4c00",
                "#9e0a61"
            })
            .HtmlAttributes(new { style = "height:600px" })
    %>
</div>
</asp:Content>
