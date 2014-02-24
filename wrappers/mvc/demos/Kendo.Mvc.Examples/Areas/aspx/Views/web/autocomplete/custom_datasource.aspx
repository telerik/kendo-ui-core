<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h2>Products</h2>

    <%= Html.Kendo().AutoComplete()
          .Name("products")
          .DataTextField("ProductName")
          .Filter("contains")
          .MinLength(3)
          .HtmlAttributes(new { style = "width:250px" })
          .DataSource(source => source
              .Custom()
              .Type("odata")
              .ServerFiltering(true)
              .ServerPaging(true)
              .PageSize(20)
              .Transport(transport => transport
                  .Read(read => read.Url("http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"))
              )
          )
    %>
</div>

<style scoped>
    .demo-section {
        width: 250px;
        margin: 35px auto 50px;
        padding: 30px;
    }
    .demo-section h2 {
        text-transform: uppercase;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
</style>
</asp:Content>