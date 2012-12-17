
package com.kendoui.taglib;


import com.kendoui.taglib.datasource.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class DataSourceTag extends BaseTag /* interfaces *//* interfaces */ {

    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag
        
        DataBoundWidget widget = (DataBoundWidget)findParentWithClass(DataBoundWidget.class);
        
        widget.setDataSource(this);

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "dataSource";
    }

    public void setAggregate(AggregateTag value) {

        setProperty("aggregate", value.aggregate());

    }

    public void setFilter(FilterTag value) {

        setProperty("filter", value.filter());

    }

    public void setGroup(GroupTag value) {

        setProperty("group", value.group());

    }

    public void setSchema(SchemaTag value) {
        setProperty("schema", value);
    }

    public void setSort(SortTag value) {

        setProperty("sort", value.sort());

    }

    public void setTransport(TransportTag value) {
        setProperty("transport", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setError(ErrorFunctionTag value) {
        setEvent("error", value.getBody());
    }

    public void setRequestEnd(RequestEndFunctionTag value) {
        setEvent("requestEnd", value.getBody());
    }

    public void setRequestStart(RequestStartFunctionTag value) {
        setEvent("requestStart", value.getBody());
    }

    public void setSync(SyncFunctionTag value) {
        setEvent("sync", value.getBody());
    }

    public boolean getAutoSync() {
        return (boolean)getProperty("autoSync");
    }

    public void setAutoSync(boolean value) {
        setProperty("autoSync", value);
    }

    public boolean getBatch() {
        return (boolean)getProperty("batch");
    }

    public void setBatch(boolean value) {
        setProperty("batch", value);
    }

    public Object getData() {
        return (Object)getProperty("data");
    }

    public void setData(Object value) {
        setProperty("data", value);
    }

    public float getPage() {
        return (float)getProperty("page");
    }

    public void setPage(float value) {
        setProperty("page", value);
    }

    public float getPageSize() {
        return (float)getProperty("pageSize");
    }

    public void setPageSize(float value) {
        setProperty("pageSize", value);
    }

    public boolean getServerAggregates() {
        return (boolean)getProperty("serverAggregates");
    }

    public void setServerAggregates(boolean value) {
        setProperty("serverAggregates", value);
    }

    public boolean getServerFiltering() {
        return (boolean)getProperty("serverFiltering");
    }

    public void setServerFiltering(boolean value) {
        setProperty("serverFiltering", value);
    }

    public boolean getServerGrouping() {
        return (boolean)getProperty("serverGrouping");
    }

    public void setServerGrouping(boolean value) {
        setProperty("serverGrouping", value);
    }

    public boolean getServerPaging() {
        return (boolean)getProperty("serverPaging");
    }

    public void setServerPaging(boolean value) {
        setProperty("serverPaging", value);
    }

    public boolean getServerSorting() {
        return (boolean)getProperty("serverSorting");
    }

    public void setServerSorting(boolean value) {
        setProperty("serverSorting", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getError() {
        Function property = ((Function)getProperty("error"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getRequestEnd() {
        Function property = ((Function)getProperty("requestEnd"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRequestEnd(String value) {
        setProperty("requestEnd", new Function(value));
    }

    public String getRequestStart() {
        Function property = ((Function)getProperty("requestStart"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRequestStart(String value) {
        setProperty("requestStart", new Function(value));
    }

    public String getSync() {
        Function property = ((Function)getProperty("sync"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSync(String value) {
        setProperty("sync", new Function(value));
    }

//<< Attributes

}
