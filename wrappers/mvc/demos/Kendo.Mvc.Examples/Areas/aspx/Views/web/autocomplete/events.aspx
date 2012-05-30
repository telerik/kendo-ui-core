<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

The AutoComplete is bound to a collection of strings: "Item1", "Item2", "Item3".

<%= Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .BindTo(new string[]
        {
            "Item1",
            "Item2",
            "Item3"
        })
        .Events(e =>
        {
            e.Change("change").Select("select").Open("open").Close("close");
        })
%>

<script>
    function open() {
        kendoConsole.log("event: open");
    };

    function close() {
        kendoConsole.log("event: close");
    };

    function change() {
        kendoConsole.log("event: change");
    };

    function select(e) {
        if ("kendoConsole" in window) {
            var dataItem = this.dataItem(e.item.index());
            kendoConsole.log("event :: select (" + dataItem + ")" );
        }
    };
</script>
<div class="console"></div>
</asp:Content>