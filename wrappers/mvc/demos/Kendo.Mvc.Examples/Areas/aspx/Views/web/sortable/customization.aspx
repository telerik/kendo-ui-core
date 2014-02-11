<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
    <div id="sortable-customization">
        <div class="item">Item1</div>
        <div class="item">Item2</div>
        <div class="item">Item3</div>
        <div class="item">Item4</div>
        <div class="item">Item5</div>
        <div class="item">Item6</div>
        <div class="item">Item7</div>
        <div class="item">Item8</div>
    </div>

    <%:Html.Kendo().Sortable()
        .For("#sortable-customization")
        .PlaceholderHandler("placeholder")
        .HintHandler("hint")
    %>

    <script>
        function placeholder(element) {
            return element.clone().addClass("placeholder").text("Drop here");
        }

        function hint(element) {
            return element.clone().addClass("hint");
        }
    </script>

    <style>
        #example {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .item {
            padding: 7px;
            margin: 5px;
            border: 1px solid black;
            background-color: #2DB245;
            color: #FFFFFF;
            width: 200px;
            text-align: center;
            border-radius: 3px;
        }

        .placeholder {
            background-color: yellow;
            border-color: orange;
            color: #000000;
        }

        .hint {
            opacity: 0.8;
        }

    </style>
</asp:Content>