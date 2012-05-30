<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header" style="z-index:10000">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            The pane index: <input id="index" type="text" value="0" class="k-textbox" style="margin-top: -5px;" />
        </li>
        <li>Functions:</li>
        <li>
                <button id="toggle" class="k-button">Expand/Collapse</button>
        </li>
        <li>
            <input id="size" type="text" value="100px" class="k-textbox" /> <button id="setSize" class="k-button">Set size</button>
        </li>
        <li>
            <input id="min" type="text" value="50px" class="k-textbox" /> <button id="setMinSize" class="k-button">Set minimum size</button>
        </li>
        <li>
            <input id="max" type="text" value="150px" class="k-textbox" /> <button id="setMaxSize" class="k-button">Set maximum size</button>
        </li>
    </ul>
</div>

<% Html.Kendo().Splitter()
      .Name("splitter")
      .HtmlAttributes(new { style = "height: 300px; width: 72%;" })
      .Panes(panes =>
      {
          panes.Add()
              .HtmlAttributes(new { id = "top_pane" })
              .Size("100px")
              .Collapsible(true)
              .Content(() => { %>
                        <p>
                            Left pane
                        </p>
              <% });
    
          panes.Add()
              .HtmlAttributes(new { id = "ajax_pane" })
              .LoadContentFrom(Url.Content("~/Content/web/splitter/ajax/ajaxContent1.html"));
    
          panes.Add()
              .HtmlAttributes(new { id = "bottom_pane" })
              .Collapsible(true)
              .Size("20%")
              .Content(() => { %>
                        <p>
                            Right pane
                        </p>
              <% });
      })
      .Render();
  %>

<script>
    var panes = $("#splitter").children(),
        getPane = function (index) {
            index = Number(index);

            if(!isNaN(index) && index < panes.length) {
                return panes[index];
            }
        },
        setSize = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var pane = getPane($("#index").val());

                if (!pane) return;

                $("#splitter").data("kendoSplitter").size(pane, $("#size").val());
            }
        },
        setMinSize = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var pane = getPane($("#index").val());

                if (!pane) return;

                $("#splitter").data("kendoSplitter").min(pane, $("#min").val());
            }
        },
        setMaxSize = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                var pane = getPane($("#index").val());

                if (!pane) return;

                $("#splitter").data("kendoSplitter").max(pane, $("#max").val());
            }
        };

    $("#toggle").click( function (e) {
        var pane = getPane($("#index").val());
        if (!pane) return;

        $("#splitter").data("kendoSplitter").toggle(pane, $(pane).width() <= 0);
    });

    $("#setSize").click(setSize);
    $("#size").keypress(setSize);

    $("#setMinSize").click(setMinSize);
    $("#min").keypress(setMinSize);

    $("#setMaxSize").click(setMaxSize);
    $("#max").keypress(setMaxSize);
</script>

<style scoped>
    .configuration .options input
    {
        width: 40px;
    }
</style>
</asp:Content>