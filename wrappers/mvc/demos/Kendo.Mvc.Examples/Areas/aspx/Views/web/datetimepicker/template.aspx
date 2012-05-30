<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="configuration k-widget k-header">
    <span class="infoHead">Information</span>
    <p>
        Apply special style for the birthdays.
    </p>
</div>

<%= Html.Kendo().DateTimePicker()
      .Name("datetimepicker")
      .Value(DateTime.Today)
      .Footer("Today - #=kendo.toString(data, 'd') #")
      .MonthTemplate("# if ($.inArray(+data.date, birthdays) != -1) { #" +
                         "<div class=\"birthday\"></div>" +
                     "# } #" +
                     "#= data.value #")
%>

<script>
    var today = new Date(),
        birthdays = [
            +new Date(today.getFullYear(), today.getMonth(), 11),
            +new Date(today.getFullYear(), today.getMonth() + 1, 6),
            +new Date(today.getFullYear(), today.getMonth() + 1, 27),
            +new Date(today.getFullYear(), today.getMonth() - 1, 3),
            +new Date(today.getFullYear(), today.getMonth() - 2, 22)
        ];
</script>
<script>
    $(document).ready(function() {
        $("#datetimepicker").data("kendoDateTimePicker")
                            .dateView.calendar.element
                            .width(340);
    });
</script>

<style scoped="scoped">
    .birthday {
        background: transparent url('<%= Url.Content("~/Content/web/calendar/cake.png") %>') no-repeat 0 50%;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
    }
</style>
</asp:Content>