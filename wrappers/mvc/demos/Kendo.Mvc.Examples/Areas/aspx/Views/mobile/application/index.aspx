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
            <ul data-role="listview" data-style="inset" data-type="group">
                <li>I want to:
                    <ul>
                        <li data-icon="play"><a href="<%=Url.Action("PlayMusic", "Application")%>">Play Music</a></li>
                        <li data-icon="cart"><a href="<%=Url.Action("MusicStore", "Application")%>">Buy Music</a></li>
                    </ul>
                </li>
            </ul>

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

        <%
        })
        .Render();
%>

</asp:Content>
