<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section k-rtl">
    <h3 class="title">Select Continents</h3>
    <%= Html.Kendo().MultiSelect()
            .Name("multiselect")
            .DataTextField("Text")
            .DataValueField("Value")
            .BindTo(new List<SelectListItem>()
            {
                new SelectListItem() {
                    Text = "Africa", Value = "1"
                },
                new SelectListItem() {
                    Text = "Europe", Value = "2"
                },
                new SelectListItem() {
                    Text = "Asia", Value = "3"
                },
                new SelectListItem() {
                    Text = "North America", Value = "4"
                },
                new SelectListItem() {
                    Text = "South America", Value = "5"
                },
                new SelectListItem() {
                    Text = "Antarctica", Value = "6"
                },
                new SelectListItem() {
                    Text = "Australia", Value = "7"
                }
            })
    %>

    <style scoped="scoped">
        .demo-section {
            width: 406px;
            margin-top: 40px;
        }
    </style>
</div>
</asp:Content>
