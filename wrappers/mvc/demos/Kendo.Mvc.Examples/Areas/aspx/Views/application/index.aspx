<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("view")    
        .Name("music")    
        .Content(() =>
        {
            %>
            
            <div class="head">&nbsp;</div>
            <h2>Welcome to "My Music" App</h2>
            <p>A native-looking web based mobile application.</p>
            <%: Html.Kendo().MobileListView()
                    .Style("inset")
                    .Type("group")
                    .Items(items => {
                        items.Add().Text("I want to:").Items(childs =>
                        {
                            childs.AddLink().Icon("play").Text("Play Music").Url("PlayMusic", "Application");
                            childs.AddLink().Icon("cart").Text("Buy Music").Url("MusicStore", "Application");
                        });
                    })
            %>            
            <%
        })
        .Render();
%>

<style scoped>
    #music .head {
	    display: block;
	    margin: 1em;
	    height: 110px;
	    background: url(<%= Url.Content("~/content/mobile/shared/mymusic.jpg") %>) no-repeat center center;
        -webkit-background-size: 100% auto;
        background-size: 100% auto;
    }
    .km-ios #music .head {
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
</style>

</asp:Content>
