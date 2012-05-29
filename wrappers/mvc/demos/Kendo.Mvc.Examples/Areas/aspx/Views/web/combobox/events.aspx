<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().ComboBox()
        .Name("combobox")
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
            kendoConsole.log("event :: select (" + dataItem.Text + " : " + dataItem.Value + ")" );
        }
    };
</script>
<div class="console"></div>
</asp:Content>