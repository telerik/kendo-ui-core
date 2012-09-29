package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class GridTag extends WidgetTag implements DataBoundWidget {
    public GridTag() {
        super("Grid");
    }

    //>> Attributes

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

    public String getDetailTemplate() {
        return ((Function)getProperty("detailTemplate")).getBody();
    }

    public void setDetailTemplate(String value) {
        setProperty("detailTemplate", new Function(value));
    }

    public String getGroupable() {
        return ((Function)getProperty("groupable")).getBody();
    }

    public void setGroupable(String value) {
        setProperty("groupable", new Function(value));
    }

    public boolean getNavigatable() {
        return (boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean value) {
        setProperty("navigatable", value);
    }

    public String getPageable() {
        return ((Function)getProperty("pageable")).getBody();
    }

    public void setPageable(String value) {
        setProperty("pageable", new Function(value));
    }

    public String getRowTemplate() {
        return ((Function)getProperty("rowTemplate")).getBody();
    }

    public void setRowTemplate(String value) {
        setProperty("rowTemplate", new Function(value));
    }

    public String getScrollable() {
        return ((Function)getProperty("scrollable")).getBody();
    }

    public void setScrollable(String value) {
        setProperty("scrollable", new Function(value));
    }

    public String getSelectable() {
        return (String)getProperty("selectable");
    }

    public void setSelectable(String value) {
        setProperty("selectable", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getColumnResize() {
        return ((Function)getProperty("columnResize")).getBody();
    }

    public void setColumnResize(String value) {
        setProperty("columnResize", new Function(value));
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getDetailCollapse() {
        return ((Function)getProperty("detailCollapse")).getBody();
    }

    public void setDetailCollapse(String value) {
        setProperty("detailCollapse", new Function(value));
    }

    public String getDetailExpand() {
        return ((Function)getProperty("detailExpand")).getBody();
    }

    public void setDetailExpand(String value) {
        setProperty("detailExpand", new Function(value));
    }

    public String getDetailInit() {
        return ((Function)getProperty("detailInit")).getBody();
    }

    public void setDetailInit(String value) {
        setProperty("detailInit", new Function(value));
    }

    public String getEdit() {
        return ((Function)getProperty("edit")).getBody();
    }

    public void setEdit(String value) {
        setProperty("edit", new Function(value));
    }

    public String getRemove() {
        return ((Function)getProperty("remove")).getBody();
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

    public String getSave() {
        return ((Function)getProperty("save")).getBody();
    }

    public void setSave(String value) {
        setProperty("save", new Function(value));
    }

    public String getSaveChanges() {
        return ((Function)getProperty("saveChanges")).getBody();
    }

    public void setSaveChanges(String value) {
        setProperty("saveChanges", new Function(value));
    }

//<< Attributes
}
