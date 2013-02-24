<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section" style="width: 250px;">
    <label for="products">Select product:</label>

    <%= Html.Kendo().ComboBox()
          .Name("products")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .Filter("contains")
          .MinLength(3)
          .AutoBind(false)
          .DataSource(source => {
              source.Read(read =>
              {
                  read.Action("GetProducts", "Home");
              })
              .ServerFiltering(true);
          })
    %>
</div>
</asp:Content>