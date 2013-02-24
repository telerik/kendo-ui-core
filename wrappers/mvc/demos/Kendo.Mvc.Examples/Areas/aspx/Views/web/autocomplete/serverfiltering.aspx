<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <label for="products">Select product:</label>

    <%= Html.Kendo().AutoComplete()
          .Name("products")
          .DataTextField("ProductName")
          .Filter("contains")
          .MinLength(3)
          .DataSource(source => {
              source.Read(read =>
              {
                  read.Action("GetProducts", "Home")
                      .Data("onAdditionalData");
              })
              .ServerFiltering(true);
          })
    %>
</div>
<script>
    function onAdditionalData() {
        return {
            text: $("#products").val() 
        };
    }
</script>
<style scoped>                
	.demo-section {
		width: 250px;
	}
</style>
</asp:Content>