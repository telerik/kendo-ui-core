package com.kendoui.taglib;

import javax.servlet.jsp.JspException;

import com.kendoui.taglib.datasource.TransportTag;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class DataSourceTag extends BaseTag {

    @Override
    public int doEndTag() throws JspException {
        DataBoundWidget widget = (DataBoundWidget)findParentWithClass(DataBoundWidget.class, "tag which supports data binding");

        widget.setDataSource(this);

        return EVAL_PAGE;
    }

    public void setTransport(TransportTag transport) {
        setProperty("transport", transport);
    }

//>> Attributes

    public String getType() {
        return (String)getProperty("type");
    }

    public void setType(String type) {
        setProperty("type", type);
    }

    public boolean getServerFiltering() {
        return (boolean)getProperty("serverFiltering");
    }

    public void setServerFiltering(boolean serverFiltering) {
        setProperty("serverFiltering", serverFiltering);
    }

    public boolean getServerPaging() {
        return (boolean)getProperty("serverPaging");
    }

    public void setServerPaging(boolean serverPaging) {
        setProperty("serverPaging", serverPaging);
    }

    public boolean getServerSorting() {
        return (boolean)getProperty("serverSorting");
    }

    public void setServerSorting(boolean serverSorting) {
        setProperty("serverSorting", serverSorting);
    }

    public boolean getServerGrouping() {
        return (boolean)getProperty("serverGrouping");
    }

    public void setServerGrouping(boolean serverGrouping) {
        setProperty("serverGrouping", serverGrouping);
    }

    public int getPageSize() {
        return (int)getProperty("pageSize");
    }

    public void setPageSize(int pageSize) {
        setProperty("pageSize", pageSize);
    }

    public boolean getBatch() {
        return (boolean)getProperty("batch");
    }

    public void setBatch(boolean batch) {
        setProperty("batch", batch);
    }

    public boolean getSendAllFields() {
        return (boolean)getProperty("sendAllFields");
    }

    public void setSendAllFields(boolean sendAllFields) {
        setProperty("sendAllFields", sendAllFields);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public String getSync() {
        return ((Function)getProperty("sync")).getBody();
    }

    public void setSync(String sync) {
        setProperty("sync", new Function(sync));
    }

    public String getRequestStart() {
        return ((Function)getProperty("requestStart")).getBody();
    }

    public void setRequestStart(String requestStart) {
        setProperty("requestStart", new Function(requestStart));
    }

    public String getRequestEnd() {
        return ((Function)getProperty("requestEnd")).getBody();
    }

    public void setRequestEnd(String requestEnd) {
        setProperty("requestEnd", new Function(requestEnd));
    }

    //<< Attributes
}
