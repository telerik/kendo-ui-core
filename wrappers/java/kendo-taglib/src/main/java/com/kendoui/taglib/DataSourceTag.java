
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

    public void setSync(SyncFunctionTag value) {
        setEvent("sync", value.getBody());
    }

    public void setRequestStart(RequestStartFunctionTag value) {
        setEvent("requestStart", value.getBody());
    }

    public void setRequestEnd(RequestEndFunctionTag value) {
        setEvent("requestEnd", value.getBody());
    }

    public Object getAggregate() {
        return (Object)getProperty("aggregate");
    }

    public void setAggregate(Object value) {
        setProperty("aggregate", value);
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

    public Object getFilter() {
        return (Object)getProperty("filter");
    }

    public void setFilter(Object value) {
        setProperty("filter", value);
    }

    public Object getGroup() {
        return (Object)getProperty("group");
    }

    public void setGroup(Object value) {
        setProperty("group", value);
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

    public Object getSort() {
        return (Object)getProperty("sort");
    }

    public void setSort(Object value) {
        setProperty("sort", value);
    }

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String value) {
        setProperty("type", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
    }

    public String getSync() {
        return ((Function)getProperty("sync")).getBody();
    }

    public void setSync(String value) {
        setProperty("sync", new Function(value));
    }

    public String getRequestStart() {
        return ((Function)getProperty("requestStart")).getBody();
    }

    public void setRequestStart(String value) {
        setProperty("requestStart", new Function(value));
    }

    public String getRequestEnd() {
        return ((Function)getProperty("requestEnd")).getBody();
    }

    public void setRequestEnd(String value) {
        setProperty("requestEnd", new Function(value));
    }

//<< Attributes

}
