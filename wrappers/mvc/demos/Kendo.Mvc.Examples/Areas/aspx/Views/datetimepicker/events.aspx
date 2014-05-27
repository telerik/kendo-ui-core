<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section" style="width: 185px;">
    <h3 class="title">Select date and time
    </h3>
    <%= Html.Kendo().DateTimePicker()
          .Name("datetimepicker")
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
    function open(e) {
        kendoConsole.log("Open :: " + e.view + "-view");
    }

    function close(e) {
        kendoConsole.log("Close :: " + e.view + "-view");
    }

    function change() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 'g'));
    }
</script>

</asp:Content>