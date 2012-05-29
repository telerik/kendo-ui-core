<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section" style="width: 250px;">
            
    <label for="timepicker">Pick time:</label>
    <%= Html.Kendo().TimePicker()
            .Name("timepicker")
            .Events(e =>
            {
                e.Change("change").Open("open").Close("close");
            })
    %>

</div>
<script>
    function open() {
        kendoConsole.log("Open");
    }

    function close() {
        kendoConsole.log("Close");
    }

    function change() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 't'));
    }
</script>
<div class="console"></div>
</asp:Content>