<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h2>Products</h2>
    <%= Html.Kendo().MultiSelect()
          .Name("products")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .Filter("contains")
          .DataSource(source => {
              source.Read(read =>
              {
                  read.Action("GetProducts", "Home");
              })
              .ServerFiltering(true);
          })
    %>
</div>
<style scoped>
    .demo-section {
        width: 300px;
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
