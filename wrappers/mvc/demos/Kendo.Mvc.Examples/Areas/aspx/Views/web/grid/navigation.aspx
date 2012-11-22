<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<%:Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(e => e.FirstName).Width(120).Title("First Name");
        columns.Bound(e => e.LastName).Width(120).Title("Last Name");
        columns.Bound(e => e.City).Width(120);
        columns.Bound(e => e.Address);
        columns.Bound(e => e.HomePhone).Width(80).Title("Home phone");
    })
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("CustomCommand_Read", "Grid"))
        .Group(grouping =>
        {
            grouping.Add(employee => employee.FirstName);
        })
        .PageSize(10)
     )
     .Scrollable(scroll => scroll.Height(300))
     .Selectable(select => select.Mode(GridSelectionMode.Multiple))
     .Navigatable()
     .Filterable()
     .Sortable()
     .Pageable()
%>

<script>
    $(document.body).keydown(function(e) {
        if (e.altKey && e.keyCode == 87) {
            $("#grid").data("kendoGrid").table.focus();
        }
    });
</script>

<ul class="keyboard-legend" style="padding-top: 25px">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Alt</span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<h4>Actions applied on Grid header</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button">Enter</span>
        </span>
        <span class="button-descr">
            sort by the column
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Alt</span>
            +
            <span class="key-button">Down</span>
        </span>
        <span class="button-descr">
            opens the filter menu
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Esc</span>
        </span>
        <span class="button-descr">
            closes the filter menu
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            navigates through the elements in the filter menu(default browser behavior)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Shift</span>
            +
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            same as Tab, but in reverse order
        </span>
    </li>
</ul>

<h4>Actions applied on Grid data table</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider">Arrow Keys</span>
        </span>
        <span class="button-descr">
            to navigate over the cells
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Enter</span>
        </span>
        <span class="button-descr">
            on group row will toggle expand/collapse
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider">Page Up</span>
        </span>
        <span class="button-descr">
            pages on previouse page
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider">Page Down</span>
        </span>
        <span class="button-descr">
            pages on next page
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Space</span>
        </span>
        <span class="button-descr">
            selects currently highlighted cell
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Ctrl</span>
            +
            <span class="key-button">Space</span>
        </span>
        <span class="button-descr">
            same as Space, but perists previously selected cells(only for selection mode "multiple")
        </span>
    </li>
</ul>

</asp:Content>