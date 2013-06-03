<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("button-badge")
        .Layout("examples")
        .Title("Button Badges")
        .Content(() =>
        {
            %>
            <br />            
            <% Html.Kendo().MobileButton()
                    .Badge("9")
                    .Text("Mail")
                    .Events(events => events.Click("changeBadge"))
                    .Render();
            %>
            <br /><br />
            <% Html.Kendo().MobileButton()
                    .Badge("3")                                     
                    .Text("Twitter Mentions")
                    .Events(events => events.Click("changeBadge"))
                    .Render();
            %>
            <br /><br />
            <% Html.Kendo().MobileButton()
                    .Badge("33")
                    .Text("Facebook Page Likes")
                    .Events(events => events.Click("changeBadge"))
                    .Render();
            %>           
            <%
        })
        .Render();
%>

<style scoped>
    .button {
        margin: 0 0 0 .5em;
        text-align: center;
    }
    #button-home .head,
    #facility .head,
    #sports .head {
	    display: block;
	    margin: 1em;
	    height: 120px;
        -webkit-background-size: 100% auto;
        background-size: 100% auto;
    }
    .km-ios .head,
    .km-blackberry .head {
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
</style>

<script>
    function changeBadge() {
        this.badge(Math.floor(Math.random() * 150));
    }
</script>

</asp:Content>
