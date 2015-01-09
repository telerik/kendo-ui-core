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
                   <%= Html.Kendo().RadioButton().Name("engine1").Checked(true).HtmlAttributes(new{@name = "engine"}).Label("1.4 Petrol, 92kW") %>
              </li>
    	      <li>
                   <%= Html.Kendo().RadioButton().Name("engine2").HtmlAttributes(new{@name = "engine"}).Label("1.8 Petrol, 118kW") %>
              </li>
              <li>
                   <%= Html.Kendo().RadioButton().Name("engine3").HtmlAttributes(new{@name = "engine"}).Label("2.0 Petrol, 147kW") %>
              </li>
              <li>
                   <%= Html.Kendo().RadioButton().Name("engine4").Enable(false).HtmlAttributes(new{@name = "engine"}).Label("3.6 Petrol, 191kW") %>
              </li>
              <li>
                   <%= Html.Kendo().RadioButton().Name("engine5").HtmlAttributes(new{@name = "engine"}).Label("1.6 Diesel, 77kW") %>
              </li>
              <li>
                   <%= Html.Kendo().RadioButton().Name("engine6").HtmlAttributes(new{@name = "engine"}).Label("2.0 Diesel, 103kW") %>
              </li>
              <li>
                   <%= Html.Kendo().RadioButton().Name("engine7").Enable(false).HtmlAttributes(new{@name = "engine"}).Label("2.0 Diesel, 125kW") %>
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
  </div>           
</asp:Content>