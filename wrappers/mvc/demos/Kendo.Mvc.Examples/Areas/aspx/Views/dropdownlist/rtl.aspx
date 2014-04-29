<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section">
    <div class="k-rtl">
        <h2>RTL DropDownList</h2>
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