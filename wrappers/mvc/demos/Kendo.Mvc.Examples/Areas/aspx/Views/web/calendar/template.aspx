<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().Calendar()
        .Name("calendar")
        .Value(DateTime.Today)
        .HtmlAttributes(new { style = "width:330px" })
        .Footer("Today - #=kendo.toString(data, 'd') #")
            .MonthTemplate("# if ($.inArray(+data.date, events) != -1) { #" +
                            "'<div class=\"" +
                            "# if (data.value < 10) { #" +
                                    "exhibition" +
                                "# } else if ( data.value < 20 ) { #" +
                                    "party" +
                                "# } else { #" +
                                    "cocktail" +
                                "# } #" +
                            "\"></div>" +
                        "# } #" +
                        "#= data.value #")                     
%>

<script>
    var today = new Date(),
        events = [
            +new Date(today.getFullYear(), today.getMonth(), 8),
            +new Date(today.getFullYear(), today.getMonth(), 12),
            +new Date(today.getFullYear(), today.getMonth(), 24),
            +new Date(today.getFullYear(), today.getMonth() + 1, 6),
            +new Date(today.getFullYear(), today.getMonth() + 1, 7),
            +new Date(today.getFullYear(), today.getMonth() + 1, 25),
            +new Date(today.getFullYear(), today.getMonth() + 1, 27),
            +new Date(today.getFullYear(), today.getMonth() - 1, 3),
            +new Date(today.getFullYear(), today.getMonth() - 1, 5),
            +new Date(today.getFullYear(), today.getMonth() - 2, 22),
            +new Date(today.getFullYear(), today.getMonth() - 2, 27)
        ];
</script>
<style scoped="scoped">

    #calendar .k-content {
        height: 200px;
    }

    .exhibition {
        background: transparent url(<%= Url.Content("~/Content/web/calendar/exhibition.png")%>) no-repeat 0 50%;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
    }

    .party {
        background: transparent url(<%= Url.Content("~/Content/web/calendar/party.png")%>) no-repeat 0 50%;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
    }

    .cocktail {
        background: transparent url(<%= Url.Content("~/Content/web/calendar/cocktail.png")%>) no-repeat 0 50%;
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 3px;
    }

</style>
</asp:Content>