<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div class="demo-section list-wrapper">
        <h3 class="title">Reorder Items
        </h3>
        <ul id="sortable-left" style="min-height: 41px;">
            <li class="list-left">Item 1</li>
            <li class="list-left">Item 2</li>
            <li class="list-left">Item 3</li>
        </ul>

        <ul id="sortable-right" style="min-height: 41px;">
            <li class="list-right">Item 1</li>
            <li class="list-right">Item 2</li>
            <li class="list-right">Item 3</li>
        </ul>
    </div>

    <%:Html.Kendo().Sortable()
        .For("#sortable-left")
        .ConnectWith("#sortable-right")
        .HintHandler("hint")
        .PlaceholderHandler("placeholder")
        .Cursor("url('" + Url.Content("~/content/web/sortable/grabbing.cur") + "'), default")
        .Events(events => events.Start("onStart").Move("onMove").End("onEnd").Change("onChange").Cancel("onCancel"))
    %>

    <%:Html.Kendo().Sortable()
        .For("#sortable-right")
        .ConnectWith("#sortable-left")
        .HintHandler("hint")
        .PlaceholderHandler("placeholder")
        .Cursor("url('" + Url.Content("~/content/web/sortable/grabbing.cur") + "'), default")
        .Events(events => events.Start("onStart").Move("onMove").End("onEnd").Change("onChange").Cancel("onCancel"))
    %>
            
    <div class="demo-section">                
        <h3 class="title">Console log
        </h3>
        <div class="console"></div>
    </div>

    <script>

        function hint(element) {
            return element.clone().addClass("hint");
        }

        function placeholder(element) {
            return element.clone().addClass("placeholder");
        }

        function onStart(e) {
            var id = e.sender.element.attr("id");
            kendoConsole.log(id + " start: " + e.item.text());
        }

        function onMove(e) {
            var id = e.sender.element.attr("id"),
                placeholder = e.list.placeholder;

            kendoConsole.log(id + " move to index: " + this.indexOf(placeholder));
        }

        function onEnd(e) {
            var id = e.sender.element.attr("id"),
                text = e.item.text(),
                oldIndex = e.oldIndex,
                newIndex = e.newIndex;

            kendoConsole.log(id + " end: " + text + " oldIndex: " + oldIndex + " newIndex: " + newIndex + " action: " + e.action);
        }

        function onChange(e) {
            var id = e.sender.element.attr("id"),
                text = e.item.text(),
                newIndex = e.newIndex,
                oldIndex = e.oldIndex;

            kendoConsole.log(id + " change: " + text + " newIndex: " + newIndex + " oldIndex: " + oldIndex + " action: " + e.action);
        }

        function onCancel(e) {
            kendoConsole.log("cancel");
        }

    </script>

    <style>
        .demo-section {
            width: 600px;
            text-align: center;
        }

        .console {
            margin: 0;
        }

        #example {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .list-wrapper {
            overflow: hidden;
        }

        #sortable-left, #sortable-right {
            width: 200px;
            margin-left: 70px;
            padding: 0;
            float: left;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .list-right, .list-left {
            list-style-type: none;
            margin: 5px;
            width: 168px;
            padding: 8px 10px;
            text-align: center;
            color: #ffffff;
            border: 1px solid transparent;
            border-radius: 4px;
            cursor: url('<%=Url.Content("~/content/web/sortable/grab.cur")%>'), default;
        }

        .list-left {
            background-color: #52aef7;
        }

        .list-right {
            background-color: #e62757;
        }

        .placeholder {
            border: 1px dashed #ccc;
            background-color: #fff;
            color: #333;
        }

        .hint {
            opacity: 0.4;
        }
    </style>
</asp:Content>