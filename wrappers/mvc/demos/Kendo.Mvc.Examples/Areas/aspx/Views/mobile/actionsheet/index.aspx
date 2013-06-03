<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("actionsheet-view")
        .Layout("examples")
        .Title("Inbox")
        .Content(() =>
        {
            %>                       
            <h3 id="actionResult"></h3>
            <% 
            Html.Kendo().MobileListView(ViewBag.InboxData)
                .Name("inbox")
                .HtmlAttributes(new { @class = "inboxList" })
                .Template("inboxItem")
                .Render();
            %>
    
            <% 
            Html.Kendo().MobileActionSheet()
                .Name("inboxActions")
                .Popup(popup => popup.Direction(MobilePopupDirection.Left))
                .Title("Monday Meeting:")
                .Events(events => events.Open("onOpen"))
                .Items(items => {
                    items.Add().Text("Reply").Action("reply");
                    items.Add().Text("Reply All").Action("replyAll");
                    items.Add().Text("Archive").Action("archive");
                })
                .Render();
            %>   
            <%
        })
        .Render();
%>

<script type="script/x-kendo-template" id="inboxItem">
    <h3 class="time">#: Time#</h3><h3>#: From #</h3>

    <%= Html.Kendo().MobileButton()
        .Name("button")
        .Rel(MobileButtonRel.ActionSheet)
        .ActionsheetContext("#:ID#")
        .HtmlAttributes(new { @class = "replay" })
        .Text("Reply")
        .Href("\\#inboxActions")        
    %>    

    <h2>#: Subject#</h2>
    <p>#: Text#</p>
</script>

<script>    
    function onOpen(e) {
        this.element.find(".km-actionsheet-title").text(e.target.next().text());
    }

    function reply(e) {
        $("#actionResult").html("Replying to message #" + e.context);
    }

    function replyAll(e) {
        $("#actionResult").html("Replying to all in message #" + e.context);
    }

    function archive(e) {
        $("#actionResult").html("Archiving message #" + e.context);
    }
</script>

<style scoped>
    .reply {
        float: right;
    }

    .inboxList
    {
        font-size: .8em;
    }
    
    .km-ios #actionsheet-view .km-listview
    {
        background: url(../../content/shared/images/patterns/pattern8.png);
    }

    .inboxList p,
    .inboxList h2,
    .inboxList h3
    {
        margin: 5px 2px;
    }

    .inboxList p,
    .inboxList h3
    {
        color: #777;
    }

    .inboxList h3.time
    {
        color: #369;
        float: left;
        margin-right: 10px;
    }

    #actionResult
    {
        padding: 10px;
        background: rgba(127,127,127,.5);
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        margin: 0;
    }
    
    .km-ios #actionsheet-view .km-navbar
    {
        background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255, 255, 255, 0.5)), color-stop(0.06, rgba(255, 255, 255, 0.45)), color-stop(0.5, rgba(255, 255, 255, 0.2)), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(1, rgba(100, 100, 100, 0))), url(../../content/shared/images/patterns/pattern7.png);
        background: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.45) 6%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(100, 100, 100, 0)), url(../../content/shared/images/patterns/pattern7.png);
	}

    .km-ios #actionsheet-view .km-navbar .km-button
    {
        background-color: #4A88B5;
    }
	
	.km-ios #actionsheet-view .km-content .km-button {
        background: -webkit-gradient(linear, 50% 0, 50% 100%, color-stop(0, rgba(255, 255, 255, 0.5)), color-stop(0.06, rgba(255, 255, 255, 0.45)), color-stop(0.5, rgba(255, 255, 255, 0.2)), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(1, rgba(100, 100, 100, 0))), url(../../content/shared/images/patterns/pattern1.png);
        background: -moz-linear-gradient(center top , rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.45) 6%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(100, 100, 100, 0)), url(../../content/shared/images/patterns/pattern1.png);
	}
	.km-tablet .km-ios #actionsheet-view .km-view-title {
        color: #fff;
        text-shadow: 0 -1px rgba(0,0,0,.5);
    }
</style>

</asp:Content>
