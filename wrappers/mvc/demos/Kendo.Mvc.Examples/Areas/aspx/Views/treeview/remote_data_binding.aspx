<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">


<%=Html.Kendo().TreeView()
    .Name("treeview")
    .HtmlAttributes(new { @class = "demo-section" })
    .DataTextField("Name")
    .DataSource(dataSource => dataSource
        .Read(read => read
            .Action("Employees", "TreeView")
        )
    )
%>


<style scoped>
    #example {
        text-align: center;
    }
    .demo-section {
        display: inline-block;
        vertical-align: top;
        width: 320px;
        height: 300px;
        text-align: left;
        margin: 0 2em;
    }
</style>

</asp:Content>
