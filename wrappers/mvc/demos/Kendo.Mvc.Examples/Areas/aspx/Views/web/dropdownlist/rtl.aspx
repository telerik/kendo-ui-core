<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">
    <div class="demo-section">
        <%= Html.Kendo().DropDownList()
                .Name("dropdownlist")
                .DataTextField("Text")
                .DataValueField("Value")
                .BindTo(new List<SelectListItem>()
                {
                    new SelectListItem() {
                        Text = "Item1", Value = "1"  
                    },
                    new SelectListItem() {
                        Text = "Item2", Value = "2"  
                    },
                    new SelectListItem() {
                        Text = "Item3", Value = "3"  
                    }
                })
        %>
    </div>
</div>

</asp:Content>