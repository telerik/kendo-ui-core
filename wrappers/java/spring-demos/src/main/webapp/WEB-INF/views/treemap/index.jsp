<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/treemap/index/read" var="readUrl" />

<demo:header />
<% 
	String[][] colors =  {
		{"#0c81c5", "#c5dceb"}, {"#3aa2de", "#d8ecf8"},
        {"#449000", "#dae9cc"}, {"#76b800", "#dae7c3"},
        {"#ffae00", "#f5e5c3"}, {"#ef4c00", "#f1b092"},
        {"#9e0a61", "#eccedf"}
 	};
%>

<kendo:treeMap name="treeMap" textField="Name" valueField="Value" colors="<%= colors %>">
     <kendo:dataSource>
         <kendo:dataSource-transport>
             <kendo:dataSource-transport-read url="${readUrl}" type="POST"  contentType="application/json"/>     
         </kendo:dataSource-transport>
         <kendo:dataSource-schema>
             <kendo:dataSource-schema-hierarchical-model children="items" />
         </kendo:dataSource-schema>
     </kendo:dataSource>
</kendo:treeMap>

<style scoped>
    .k-leaf {
        color: #fff;
    }
    .k-leaf:hover {
        border: 0;
        color: #fff;
        padding: .7em;
    }
    .k-tile-inverse,
    .k-tile-inverse:hover {
        color: #000;
    }
</style>

<demo:footer />