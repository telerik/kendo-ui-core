<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<%@ Import Namespace="Kendo.Mvc.Examples.Models.Gantt" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-gantt {
            font-family: "DejaVu Sans", "Arial", sans-serif;
        }
    </style>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="<%= Url.Content("~/Scripts/pako.min.js") %>"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <%: Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound("title").Editable(true).Sortable(true);
            columns.Bound("start").Title("Start Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
            columns.Bound("end").Title("End Time").Format("{0:MM/dd/yyyy}").Width(100).Editable(true).Sortable(true);
        })
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
        })
        .Toolbar(tb =>
        {
            tb.Add().Name("append");
            tb.Add().Name("pdf");
        })
        .Pdf(pdf => pdf
            .FileName("Kendo UI Gantt Export.pdf")
            .ProxyURL(Url.Action("Pdf_Export_Save", "Gantt"))
        )
        .Height(400)
        .ShowWorkHours(false)
        .ShowWorkDays(false)
        .Snap(false)
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.OrderId(f => f.OrderId);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
            .Read("ReadTasks", "Gantt")
            .Create("CreateTask", "Gantt")
            .Destroy("DestroyTask", "Gantt")
            .Update("UpdateTask", "Gantt")
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
                m.Type(f => f.Type);
            })
            .Read("ReadDependencies", "Gantt")
            .Create("CreateDependency", "Gantt")
            .Destroy("DestroyDependency", "Gantt")
            .Update("UpdateDependency", "Gantt")
        )
        %>
</asp:Content>
