<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
       .Name("drawer-home")
       .Layout("drawer-layout")
       .Title("Inbox")
       .Content(() =>
       {
           Html.Kendo().MobileListView()
                .HtmlAttributes(new { @class = "inboxList" })
                .Items(items =>
                {
                    items.Add().Content(() =>
                    {
                        %>
                        <h3 class="time">07:56</h3><h3>John Doe</h3>
                        <h2>Monday meeting</h2>
                        <p>Hi Tom, Since Monday I'll be out of office, I'm rescheduling the meeting for Tuesday.</p>
                        <%
                    });

                    items.Add().Content(() =>
                    {
                        %>
                        <h3 class="time">08:21</h3><h3>Joe Harper</h3>
                        <h2>I'm sorry, Tom</h2>
                        <p>Hi Tom, my aunt comes for a visit this Saturday, so I can't come back to St. Pete...</p>
                        <%
                    });

                    items.Add().Content(() =>
                    {
                        %>
                        <h3 class="time">08:33</h3><h3>Sarah Connor</h3>
                        <h2>Regarding org chart changes</h2>
                        <p>Tom, I checked the new org chart last night and I have some reservations about it...</p>
                        <%
                    });

                    items.Add().Content(() =>
                    {
                        %>
                        <h3 class="time">08:40</h3><h3>John Doe</h3>
                        <h2>Re: Regarding org chart changes</h2>
                        <p>Agree with Sarah...</p>
                        <%
                    });

                    items.Add().Content(() =>
                    {
                        %>
                        <h3 class="time">09:16</h3><h3>Jane Parker</h3>
                        <h2>Your Costume is ready</h2>
                        <p>Hi mr. Sawyer, I'm sorry for the delay, your Halloween costume is ready. The bears...</p>
                        <%
                    });

                    items.Add().Content(() =>
                    {
                        %>
                        <h3 class="time">11:03</h3><h3>Becky Thatcher</h3>
                        <h2>Out tonight?</h2>
                        <p>Honey, wanna go out tonight to grab some chicken? My weekly vouchers for cooking...</p>
                        <%
                    });
                })
                .Render();
       })
        .Render();
%>

<%: Html.Kendo().MobileView()
       .Name("drawer-starred")
       .Layout("drawer-layout")
       .Title("Starred Items")
       .Content(obj =>
            Html.Kendo().MobileListView()
                .Items(items => 
                {
                    items.Add().Icon("star").Text("Monday meeting");
                    items.Add().Icon("star").Text("Regarding org chart changes");
                    items.Add().Icon("star").Text("Re: Regarding org chart changes");
                    items.Add().Icon("star").Text("Your Costume is ready");
                    items.Add().Icon("star").Text("Out tonight?");
                })
       )
%>

<%: Html.Kendo().MobileView()
       .Name("drawer-drafts")
       .Layout("drawer-layout")
        .Title("Drafts")
       .Content(obj =>
            Html.Kendo().MobileListView()
                .Items(items => 
                {
                    items.Add().Icon("compose").Text("Re: Monday meeting");
                    items.Add().Icon("compose").Text("Untitled message 1");
                    items.Add().Icon("compose").Text("Untitled message 2");
                    items.Add().Icon("compose").Text("Re: Regarding org chart changes");
                    items.Add().Icon("compose").Text("Re: Re: Regarding org chart changes");
                    items.Add().Icon("compose").Text("Re: Your Costume is ready");
                    items.Add().Icon("compose").Text("Re: Out tonight?");
                    items.Add().Icon("compose").Text("Untitled message 3");
                })
       )
%>

<%: Html.Kendo().MobileView()
       .Name("drawer-sent")
       .Layout("drawer-layout")
       .Title("Sent Items")
       .Content(obj =>
            Html.Kendo().MobileListView()
                .Items(items => 
                {
                    items.Add().Text("Build enterprise apps");
                    items.Add().Text("Fw: Regarding Multiline textbox");
                    items.Add().Text("Away next week");
                    items.Add().Text("Fw: Your Costume is ready");
                    items.Add().Text("Update completed");
                    items.Add().Text("Survey");
                    items.Add().Text("Problem with this account");
                    items.Add().Text("Advice For Designers");
                    items.Add().Text("Fw: Missing Book");
                    items.Add().Text("Fun & useful reading");
                })
       )
%>

<%: Html.Kendo().MobileView()
       .Name("drawer-deleted")
       .Layout("drawer-layout")
       .Title("Deleted Items")
       .Content(obj =>
            Html.Kendo().MobileListView()
                .Items(items => 
                {
                    items.Add().Icon("trash").Text("Untitled message 4");
                    items.Add().Icon("trash").Text("Untitled message 5");                    
                })
       )
%>

<% Html.Kendo().MobileView()
       .Name("drawer-spam")
       .Layout("drawer-layout")
       .Title("Spam")
       .Content(() =>
        {
            %>            
            <%Html.Kendo().MobileListView()
                .Items(items =>
                {
                    items.Add().Icon("trash").Text("90% Discount!");
                    items.Add().Icon("trash").Text("90% Discount!");
                    items.Add().Icon("trash").Text("One time offer!");
                })
                .Render();
            %>
            <%: Html.Kendo().MobileButton().Text("Delete Spam")
                    .HtmlAttributes(new { style = "background-color: darkred; display: block; margin: 2em; font-size: 1.4em;" })
            %>           
            <%
        })
       .Render();
%>

<%: Html.Kendo().MobileDrawer()
        .Name("my-drawer")
        .HtmlAttributes(new { style = "width: 270px" })
        .Views("drawer-home", "drawer-starred", "drawer-deleted", "drawer-spam", "drawer-drafts", "drawer-sent")
        .Content(obj =>
            Html.Kendo().MobileListView().Type("group")
                .Items(root => {
                    root.Add().Text("Mailbox").Items(items =>
                    {
                        items.AddLink().Icon("inbox").Url("#drawer-home").Text("Inbox");
                        items.AddLink().Icon("star").Url("#drawer-starred").Text("Starred Items");
                        items.AddLink().Icon("compose").Url("#drawer-drafts").Text("Drafts");
                        items.AddLink().Icon("sent").Url("#drawer-sent").Text("Sent Items");
                        items.AddLink().Icon("trash").Url("#drawer-deleted").Text("Deleted Items");
                        items.AddLink().Icon("spam").Url("#drawer-spam").Text("Spam");
                    });

                    root.Add().Text("Tasks").Items(items =>
                    {
                        items.Add().Text("To Do");
                        items.Add().Text("In Progress");
                        items.Add().Text("Done");
                        items.Add().Text("High Priority");
                        items.Add().Text("Low Priority");
                    });

                    root.Add().Text("Account").Items(items =>
                    {
                        items.Add().Icon("settings").Text("Settings");
                        items.Add().Icon("off").Text("Log Out");                   
                    });
                })
        )
%>
    
<% Html.Kendo().MobileLayout()
       .Name("drawer-layout")
       .Header(() =>
        {
            Html.Kendo().MobileNavBar()
                .Content(navbar =>
                {
                    %>

                    <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Left)
                            .Icon("drawer-button")
                            .Rel(MobileButtonRel.Drawer)
                            .Url("#my-drawer")
                    %> 

                    <%:navbar.ViewTitle("")%>

                    <%: Html.Kendo().MobileButton()
                            .Align(MobileButtonAlign.Right)
                            .Text("Index")
                            .HtmlAttributes(new { @class = "nav-button" })
                            .Url(Url.RouteUrl(new { controller = "suite" }))
                    %>

                    <%
                })
                .Render();
        })
        .Render();
%>

<style>
    .km-ios #my-drawer .km-content, .km-android #my-drawer .km-content, .km-blackberry #my-drawer .km-content,
    .km-ios #my-drawer .km-list > li, .km-android #my-drawer .km-list > li, .km-blackberry #my-drawer .km-list > li,
    .km-ios #my-drawer .km-listview-link > .km-icon, .km-android #my-drawer .km-listview-link > .km-icon, .km-blackberry #my-drawer .km-listview-link > .km-icon,
    .km-ios #my-drawer .km-list li > .km-icon, .km-android #my-drawer .km-list li > .km-icon, .km-blackberry #my-drawer .km-list li > .km-icon
    {
        background-color: #4e4e4e;
        color: #fff;
    }

    .km-ios #my-drawer .km-group-title,
    .km-blackberry #my-drawer .km-group-title
    {
        background-color: #6e6e6e;
        color: #fff;
    }

    .km-drawer-button:before, .km-drawer-button:after  { content: "\E077"; }
    .km-inbox:before, .km-inbox:after { content: "\E0B0"; }
    .km-sent:before, .km-sent:after { content: "\E0C6"; }
    .km-trash:before, .km-trash:after { content: "\E0C3"; }
    .km-spam:before, .km-spam:after { content: "\E0C5"; }
    .km-star:before, .km-star:after { content: "\E0D7"; }
    .km-settings:before, .km-settings:after { content: "\E0DA"; }
    .km-off:before, .km-off:after { content: "\E0B9"; }

    .inboxList
    {
        font-size: .8em;
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
</style>

</asp:Content>
