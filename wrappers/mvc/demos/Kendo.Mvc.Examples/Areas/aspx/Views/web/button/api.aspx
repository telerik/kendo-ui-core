<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="configuration k-widget k-header">
    <span class="configHead">Button API Functions</span>
    <ul class="options">
        <li>
            <button class="k-button" id="enableButton" type="button">Enable</button> or <button class="k-button" id="disableButton" type="button">Disable</button>
        </li>
    </ul>
</div>

<br /><br />

<%= Html.Kendo().Button()
    .Name("iconTextButton")
    .Icon("ungroup")
    .HtmlAttributes( new {type = "button"} )
    .Content("Kendo UI Button") %>

<script>

    $(document).ready(function () {
        var buttonObject = $("#iconTextButton").data("kendoButton");

        $("#enableButton").click(function () {
            buttonObject.enable(true);
        });

        $("#disableButton").click(function () {
            buttonObject.enable(false);
        });
    });

</script>

</asp:Content>