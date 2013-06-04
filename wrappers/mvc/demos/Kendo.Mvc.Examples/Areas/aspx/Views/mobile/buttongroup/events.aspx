<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("buttongroup-events")
        .Layout("examples")
        .Title("Player")
        .Content(() =>
        {
            %>
            <%: Html.Kendo().MobileButtonGroup()
                .Index(3)
                .Items(items =>
                {
                    items.Add().Icon("rewind");
                    items.Add().Icon("play");
                    items.Add().Icon("pause");
                    items.Add().Icon("stop");
                    items.Add().Icon("fastforward");
                })
                .Events(events => events.Select("selectButton"))
            %>
            <div class="console"></div>
            <%
        })
        .Render();
%>

<script>
    function selectButton() {
        kendoConsole.log("Selected button: " + this.current().index());
    }
</script>

<style scoped>
    #buttongroup-events .km-button:not(.km-back) {
        padding-left: 1em;
        padding-right: 1em;
    }
    #buttongroup-events .photo {
        width: 277px;
        margin: 1em auto;
        height: 120px;
        background: url("../../content/mobile/shared/player.jpg") no-repeat center center;
        -webkit-background-size: auto 100%;
        background-size: auto 100%;
    }
    #button-group {
        margin: 1em auto;
    }
    .km-root .console {
        background-color: transparent;
        border: 0;
        margin: 1.4em 1em;
        overflow: hidden;
        height: auto;
    }
</style>

</asp:Content>
