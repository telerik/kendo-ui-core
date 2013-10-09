<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<%= Html.Kendo().Button()
    .Name("textButton")
    .Content("Text button")
    .HtmlAttributes( new {type = "button"} )
    .Events(ev => ev.Click("onClick")) %>

<%= Html.Kendo().Button()
    .Name("refreshButton")
    .Icon("refresh")
    .Content("Refresh Button")
    .HtmlAttributes( new {type = "button"} )
    .Events(ev => ev.Click("onClick")) %>

<%= Html.Kendo().Button()
    .Name("disabledButton")
    .Enable(false)
    .Content("Disabled button")
    .HtmlAttributes( new {type = "button"} )
    .Events(ev => ev.Click("onClick")) %>

<p>(The disabled button will not fire click events)</p>

<div class="configuration k-widget k-header">
    <span class="configHead">Events log</span>
    <div class="console"></div>
</div>

<script>
    function onClick(e) {
        kendoConsole.log("event :: click (" + $(e.event.target).closest(".k-button").attr("id") + ")");
    }
</script>

</asp:Content>