<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/treemap/index/read" var="readUrl" />

<demo:header />
<div class="configuration k-widget k-header" style="width:170px;">
    <h4>TreeMap rendering types</h4>
    <ul class="options">
        <li>
            <input id="typeSquarified" name="type"
                        type="radio" value="squarified" checked="checked" autocomplete="off" />
            <label for="typeSquarified">Squarified</label>
        </li>
        <li>
            <input id="typeVertical" name="type"
                        type="radio" value="vertical" autocomplete="off" />
            <label for="typeVertical">Vertical(Slice and Dice)</label>
        </li>
        <li>
            <input id="typeHorizontal" name="type"
                        type="radio" value="horizontal" autocomplete="off" />
            <label for="typeHorizontal">Horizontal(Slice and Dice)</label>
        </li>
    </ul>
</div>

<kendo:treeMap name="treeMap" textField="Name" valueField="Value">
     <kendo:dataSource>
         <kendo:dataSource-transport>
             <kendo:dataSource-transport-read url="${readUrl}" type="POST"  contentType="application/json"/>     
         </kendo:dataSource-transport>
         <kendo:dataSource-schema>
             <kendo:dataSource-schema-hierarchical-model children="items" />
         </kendo:dataSource-schema>
     </kendo:dataSource>
</kendo:treeMap>

<script>
    $(document).ready(function() {
        $(".options").bind("change", refresh);
    });

    function refresh() {
        $("#treeMap").getKendoTreeMap().setOptions({
            type: $("input[name=type]:checked").val()
        });
    }
</script>
<demo:footer />