<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="box">
    <div class="box-col">
    <h4>Selection</h4>
    <ul class="options">
        <li>
            <input type="text" value="0" id="selectRow" class="k-textbox"/>
            <button class="selectRow k-button">Select row</button>
        </li>
        <li>
            <button class="clearSelection k-button">Clear selected rows</button>
        </li>
    </ul>
    </div>
    <div class="box-col">
    <h4>Expand / Collapse</h4>
    <ul class="options">
        <li>
            <input type="text" value="0" id="groupRow" class="k-textbox"/>
            <button class="toggleGroup k-button">Collapse/Expand group</button>
        </li>
    </ul>
    </div>
</div>

<%:Html.Kendo().TreeList<Kendo.Mvc.Examples.Models.TreeList.EmployeeDirectoryModel>()
    .Name("treelist")
    .Columns(columns =>
    {
        columns.Add().Field(e => e.FirstName).Width(250);
        columns.Add().Field(e => e.LastName).Width(160);
        columns.Add().Field(e => e.HireDate).Width(200).Format("{0:MMMM d, yyyy}");
        columns.Add().Field(e => e.Extension).Width(140);
    })
    .Selectable(true)    
    .DataSource(dataSource => dataSource
        .Read(read => read.Action("All", "EmployeeDirectory"))
        .Model(m => {
            m.Id(f => f.EmployeeId);
            m.ParentId(f => f.ReportsTo);
            m.Field(f => f.FirstName);
            m.Field(f => f.LastName);
            m.Field(f => f.ReportsTo);
        })
    )
    .Height(540)
%>

<script>
    $(document).ready(function () {
        $(".clearSelection").click(function () {
            $("#treelist").data("kendoTreeList").clearSelection();
        });

        var selectRow = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var treelist = $("#treelist").data("kendoTreeList"),
                    rowIndex = $("#selectRow").val(),
                    row = treelist.content.find("tr:visible").eq(rowIndex);

                treelist.select(row);
            }
        };

        var toggleGroup = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var treelist = $("#treelist").data("kendoTreeList"),
                    rowIndex = $("#groupRow").val(),
                    row = treelist.content.find("tr:visible").eq(rowIndex);

                if (row.has(".k-i-collapse").length) {
                    treelist.collapse(row);
                } else {
                    treelist.expand(row);
                }
            }
        };


        $(".selectRow").click(selectRow);
        $("#selectRow").keypress(selectRow);

        $(".toggleGroup").click(toggleGroup);
        $("#groupRow").keypress(toggleGroup);
    });
</script>
</asp:Content>
