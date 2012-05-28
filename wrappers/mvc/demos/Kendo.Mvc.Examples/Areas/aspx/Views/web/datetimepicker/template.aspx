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

<%
    var dates = new List<long>()
    {
        new DateTime(DateTime.Today.Year, DateTime.Today.Month, 11).Ticks,
        new DateTime(DateTime.Today.Year, DateTime.Today.Month + 1, 6).Ticks,
        new DateTime(DateTime.Today.Year, DateTime.Today.Month + 1, 27).Ticks,
        new DateTime(DateTime.Today.Year, DateTime.Today.Month - 1, 3).Ticks,
        new DateTime(DateTime.Today.Year, DateTime.Today.Month - 2, 22).Ticks
    };
%>

<div class="demo-section" style="width:155px">
<%= Html.Kendo().DateTimePicker()
      .Name("datetimepicker")
      .Value(DateTime.Today)
      .Footer("Today - #=kendo.toString(data, 'd') #")
      .MonthTemplate("# if ($.inArray(+data.date, " + new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(dates) + ") != -1) { #" +
                         "<div class=\"birthday\"></div>" +
                     "# } #" +
                     "#= data.value #")
%>
</div>

<script>
    $(document).ready(function() {
        $("#datetimepicker").data("kendoDateTimePicker")
                            .dateView.calendar.element
                            .width(300);
    });
</script>

<style scoped>
    .birthday {
        background: transparent url('@Url.Content("~/Content/web/calendar/cake.png")') no-repeat 0 50%;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
    }
</style>
</asp:Content>