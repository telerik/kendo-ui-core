<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/grid/pdf-export/read" var="transportReadUrl" />
<c:url value="/grid/pdf-export/save" var="saveUrl" />

<demo:header />

<style scoped>
    /*
        Use the DejaVu Sans font for display and embedding in the PDF file.
        The standard PDF fonts have no support for Unicode characters.
    */
    .k-grid {
        font-family: "DejaVu Sans", "Arial", sans-serif;
    }
</style>

<!-- Load Pako ZLIB library to enable PDF compression -->
<script src="../resources/shared/js/pako.min.js"></script>

    <kendo:grid name="grid" style="width:900px;" rowTemplate="row-template" altRowTemplate="alt-row-template">
        <kendo:grid-toolbar>
        	<kendo:grid-toolbarItem name="pdf" />
        </kendo:grid-toolbar>
        <kendo:grid-pdf proxyURL="${saveUrl}" fileName="Kendo UI Grid Export.pdf" />
        <kendo:grid-columns>
            <kendo:grid-column title="Picture" width="140px" />
            <kendo:grid-column title="Details" field="title" width="400px" />
            <kendo:grid-column title="Country" field="country" />
            <kendo:grid-column title="ID" field="employeeId" />
        </kendo:grid-columns>
        <kendo:dataSource serverPaging="true" serverSorting="true" serverFiltering="true">
            <kendo:dataSource-transport>            	
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>  
                <kendo:dataSource-transport-parameterMap>
                	function(options){return JSON.stringify(options);}
                </kendo:dataSource-transport-parameterMap>              
            </kendo:dataSource-transport>
            <kendo:dataSource-schema data="data" total="total" />
        </kendo:dataSource>        
    </kendo:grid>
    
    <script id="row-template" type="text/x-kendo-template">
        <tr data-uid="#: uid #">
            <td class="photo">
               <img src="<c:url value='/resources/web/Employees/' />#:employeeId#.jpg" alt="#: employeeId #" />
            </td>
            <td class="details">
               <span class="name">#: firstName# #: lastName# </span>
               <span class="title">Title: #: title #</span>
            </td>
			<td class="country">
			   #: country #
			</td>
            <td class="employeeID">
               #: employeeId #
            </td>
        </tr>
    </script>
    
    <script id="alt-row-template" type="text/x-kendo-template">
        <tr class="k-alt" data-uid="#: uid #">
            <td class="photo">
               <img src="<c:url value='/resources/web/Employees/' />#:employeeId#.jpg" alt="#:employeeId #" />
            </td>
            <td class="details">
               <span class="name">#: firstName# #: lastName# </span>
               <span class="title">Title: #: title #</span>
            </td>
			<td class="country">
			   #: country #
			</td>
            <td class="employeeID">
               #: employeeId #
            </td>
        </tr>
    </script>
    
<style scoped="scoped">
   .employeeID,
   .country {
       font-size: 42px;
       font-weight: bold;
       color: #898989;
   }
   .name {
       display: block;
       font-size: 1.6em;
   }
   .title {
       display: block;
       padding-top: 1.6em;
   }
   td.photo, .employeeID {
       text-align: center;
   }
   .k-grid-header .k-header {
       padding: 10px 20px;
   }
   .k-grid tr {
       background: -moz-linear-gradient(top,  rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
       background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
       background: -webkit-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
       background: -o-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
       background: -ms-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
       background: linear-gradient(to bottom,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
       padding: 20px;
   }
   .k-grid tr.k-alt {
       background: -moz-linear-gradient(top,  rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
       background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.2)), color-stop(100%,rgba(0,0,0,0.1)));
       background: -webkit-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
       background: -o-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
       background: -ms-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
       background: linear-gradient(to bottom,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
   }
</style>      
<demo:footer />
