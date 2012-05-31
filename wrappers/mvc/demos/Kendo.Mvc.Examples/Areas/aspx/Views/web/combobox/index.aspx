<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="tshirt-view" class="k-header">
	<h2>Customize your Kendo T-shirt</h2>
	<img id="tshirt" src='<%= Url.Content("~/Content/web/combobox/tShirt.png") %>' />
    <div id="options">
	<h3>T-shirt Fabric</h3>
    <%= Html.Kendo().ComboBox()
          .Name("fabric")
          .Filter("contains")
          .Placeholder("Select fabric...")
          .DataTextField("Text")
          .DataValueField("Value")
          .BindTo(new List<SelectListItem>() {
              new SelectListItem() {
                Text = "Cotton", Value = "1"   
              },
              new SelectListItem() {
                Text = "Polyester", Value = "2"   
              },
              new SelectListItem() {
                Text = "Cotton/Polyester", Value = "3"   
              },
              new SelectListItem() {
                Text = "Rib Knit", Value = "4"   
              }
          })
          .SelectedIndex(3)
          .Suggest(true)
    %>

    <h3>T-shirt Size</h3>
    <%= Html.Kendo().ComboBox()
          .Name("size")
          .Placeholder("Select size...")
          .BindTo(new List<string>() {
              "X-Small",
              "Small",
              "Medium",
              "Large",
              "X-Large",
              "2X-Large"
          })
          .SelectedIndex(3)
          .Suggest(true)
    %>

	<button class="k-button" id="get">Customize</button>
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
		background-position: 0 -255px;
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