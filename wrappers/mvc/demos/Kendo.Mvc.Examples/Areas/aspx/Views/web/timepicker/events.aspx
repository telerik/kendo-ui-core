<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section" style="width:250px;text-align:center;">            
    <h3 class="title">Select time
    </h3>
    <%= Html.Kendo().TimePicker()
            .Name("timepicker")
            .Events(e =>
            {
                e.Change("change").Open("open").Close("close");
            })
    %>
</div>

<div class="demo-section">
    <h3 class="title">Console log
    </h3>
    <div class="console"></div>
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

</asp:Content>