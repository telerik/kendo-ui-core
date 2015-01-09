<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div id="example">
    <div class="demo-section k-header">
        <div class="box-col">
	        <h4>Choose Extra Equipment</h4>
            <ul>
                <li>
                    <%= Html.Kendo().CheckBox().Name("eq1").Checked(true).Label("Rear side airbags") %>
                </li>
                <li>
                    <%= Html.Kendo().CheckBox().Name("eq2").Checked(true).Enable(false).Label("Leather trim") %>
                </li>
                <li>
                    <%= Html.Kendo().CheckBox().Name("eq3").Label("Luggage compartment cover") %>
                </li>
                <li>
                    <%= Html.Kendo().CheckBox().Name("eq4").Label("Heated front and rear seats") %>
                </li>
                <li>
                    <%= Html.Kendo().CheckBox().Name("eq5").Label("Dual-zone air conditioning") %>
                </li>
                <li>
                    <%= Html.Kendo().CheckBox().Name("eq6").Label("Rain sensor") %>
                </li>
                <li>
                    <%= Html.Kendo().CheckBox().Name("eeeeq4").Enable(false).Label("Towbar preparation") %>
                </li>
            </ul>
        </div>
    </div>
    <style scoped>
	.demo-section.k-header {
	    background-image: url('/Content/web/tabstrip/bmw.png');
	    background-repeat: no-repeat;
	    background-position: 55px 45px;
	    width: 250px;
	    padding-left: 515px;
	    padding-top: 80px;
	    height: 245px;
	}
    </style>        
</asp:Content>