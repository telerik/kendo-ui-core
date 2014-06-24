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
            .ValueField("value")
            .TextField("text")
            .HtmlAttributes(new { style = "height:600px" })
    %>
</div>
</asp:Content>
