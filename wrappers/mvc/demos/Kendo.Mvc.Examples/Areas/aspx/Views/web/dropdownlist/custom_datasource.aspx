<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section" style="width: 250px;">
    <h2>Products</h2>
    <%= Html.Kendo().DropDownList()
          .Name("products")
          .HtmlAttributes(new { style = "width: 250px" })
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .DataSource(source => source
              .Custom()
              .Transport(transport => transport
                    .Read(read =>
                    {
                        read.Url("http://demos.telerik.com/kendo-ui/service/Products")
                            .DataType("jsonp");
                    })
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