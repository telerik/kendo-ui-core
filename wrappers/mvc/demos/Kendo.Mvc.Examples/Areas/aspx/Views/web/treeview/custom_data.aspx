<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

    <div class="demo-section">
        <%= Html.Kendo().TreeView()
            .Name("treeview")
            .DataTextField("Name")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Users", "TreeView")
                )
            )
            .Events(events => events
                .Select("onSelect")
            )
        %>
    </div>

    <p id="result">No user selected</p>

    <script>
        function onSelect(e) {
            var dataItem = this.dataItem(e.node);

            $("#result").text("Username: " + dataItem.Username);
        }
    </script>

    <style scoped>
        .demo-section {
            width: 200px;
        }
    </style>
</asp:Content>