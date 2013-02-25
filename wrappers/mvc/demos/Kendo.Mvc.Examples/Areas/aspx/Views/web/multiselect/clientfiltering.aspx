<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h3 class="title">Select Products</h3>
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
              .ServerFiltering(false);
          })
    %>
</div>
<style scoped>
    .demo-section {
        width: 450px;
        margin-top: 40px;
    }
</style>
</asp:Content>
