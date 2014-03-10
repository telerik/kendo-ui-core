<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<script src="<%= Url.Content("~/Scripts/jquery.signalR-2.0.2.min.js") %>"></script>
<script src="<%= Url.Content("~/signalr/hubs") %>"></script>

<script>
    var hub = $.connection.productHub;
    var hubStart = $.connection.hub.start();
</script>

<%: Html.Kendo().Notification()
      .Name("notification")
      .Width("100%")
      .Position(position => position.Top(0).Left(0))
%>

<%: Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductSignalR>()
    .Name("Grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice).Width(140);
        columns.Command(command =>
        {
            command.Destroy();
        }).Width(110);
    })
    .ToolBar(toolbar =>
    {
        toolbar.Create();
    })
    .Editable(editable => editable.Mode(GridEditMode.InCell))
    .Pageable()
    .Navigatable()
    .Sortable()
    .Scrollable()
    .DataSource(dataSource => dataSource
        .SignalR()
        .AutoSync(true)
        .Events(events => events.Push("grid_push"))
        .Sort(s => s.Add("CreatedAt").Descending())
        .Transport(tr => tr
            .Promise("hubStart")
            .Hub("hub")
            .Client(c => c
                .Read("read")
                .Create("create")
                .Update("update")
                .Destroy("destroy"))
            .Server(s => s
                .Read("read")
                .Create("create")
                .Update("update")
                .Destroy("destroy")))
        .Schema(schema => schema
            .Model(model =>
            {
                model.Id("ID");
                model.Field("ID", typeof(string)).Editable(false);
                model.Field("CreatedAt", typeof(DateTime));
                model.Field("UnitPrice", typeof(int));
            })
        )
    )
%>
<script>
    function grid_push(e) {
        var notification = $("#notification").data("kendoNotification");
        notification.success(e.type);
    }
</script>
<br />
<div class="configuration-horizontal">
    <span class="configHead">Information</span>
    <p>
    This demo demonstrates real-time push-notifications from <a href="http://signalr.net/">SignalR</a>.
    </p>
    <p>
        To see the real-time updates:
    </p>
    <ol>
        <li>Open this page in another browser window by clicking <a href="signalr" target="_new">here</a></li>
        <li>Create, update or destroy grid items.</li>
    </ol>
</div>

</asp:Content>