<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/web/grid/products/" var="transportReadUrl" />

<demo:header />
    <kendo:grid name="grid" pageable="true" sortable="true" height="400" rowTemplate="row-template">
        <kendo:grid-columns>
            <kendo:grid-column title="Picture" field="customerId" />
        </kendo:grid-columns>        
        <kendo:dataSource data="${customers}" pageSize="10" />        
    </kendo:grid>
    
    <script id="row-template" type="text/x-kendo-template">
         <tr>
           <td colspan="6">
            <div class="customer-details">
                <img src="<c:url value='/resources/web/Customers/' />#=customerId#.jpg" alt="#=contactName#" />
                <h3 class="k-widget">#=contactName#</h3> 
                <dl>
                   <dt>Name:</dt><dd>#=contactName#</dd>
                   <dt>Company:</dt><dd>#=companyName#</dd> 
                   <dt>Country:</dt><dd>#=country#</dd>
                </dl>
                <dl >
                    <dt>Address:</dt><dd>#=address#</dd>
                    <dt>Phone:</dt><dd>#=phone#</dd>
                </dl>
            </div>
           </td>
        </tr>
    </script>
    
    <style scoped="scoped">
        .customer-details
        {
            padding:.8em .6em;
            display:inline-block;
        }
        .customer-details
        {
            display:block;
        }
        
        .customer-details:after
        {
            content:"";
            display:block;
            clear:both;
        }
        
        .customer-details dl,
        .customer-details dt,
        .customer-details dd
        {
            margin:0;
            padding:0;
        }
        
        .customer-details img,
        .customer-details h3,
        .customer-details dl        
        {
            float:left;
            clear:none;
            margin:0 14px 0 0;
        }
        .customer-details h3,
        .customer-details dl
        {
            width:200px;
            min-height:115px;
            border-width:0 1px 0 0;
            background-color:transparent;
            color:inherit;
        }
        
        .customer-details h3
        {
            width:90px;
            padding:0;
            font-size:1.5em;
            padding-right:20px;
        }
        
        .customer-details dt
        {
            font-weight:bold;
        }  
    </style>
<demo:footer />