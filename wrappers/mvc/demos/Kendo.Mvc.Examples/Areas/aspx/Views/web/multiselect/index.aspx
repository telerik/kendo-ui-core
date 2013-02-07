<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="tshirt-view" class="k-header">
	<h2>Customers:</h2>
    <div id="options">

    <%= Html.Kendo().MultiSelect()
          .Name("customers")
          .Placeholder("Choose customers...")
          .BindTo(new List<string>() {
              "Maria Anders",
              "Ana Trujillo",
              "Antonio Moreno",
              "Thomas Hardy",
              "Christina Berglund",
              "Hanna Moos",
              "Frédérique Citeaux",
              "Laurence Lebihan",
              "Elizabeth Lincoln"
          })
    %>
	</div>
</div>
<style scoped>
	#example h2 {
		font-weight: normal;
	}
	#tshirt-view {
		border-radius: 10px 10px 10px 10px;
		border-style: solid;
		border-width: 1px;
		overflow: hidden;
		width: 500px;
		margin: 30px auto;
		padding: 20px 20px 0 20px;
	}
	#tshirt {
		float: left;
		margin: 30px 40px 30px 20px;
	}
	#options {
		padding: 30px;
	}
	#options h3 {
		font-size: 1em;
		font-weight: bold;
		margin: 25px 0 8px 0;
	}
	#get {
		margin-top: 25px;
	}

    .k-readonly
    {
        color: gray;
    }
</style>

<script>
    $(document).ready(function() {
        var fabric = $("#fabric").data("kendoComboBox");
        var size = $("#size").data("kendoComboBox");

		$("#get").click(function() {
		    alert('Thank you! Your Choice is:\n\nFabric ID: ' + fabric.value() + ' and Size: ' + size.value());
        });
    });
</script>
</asp:Content>