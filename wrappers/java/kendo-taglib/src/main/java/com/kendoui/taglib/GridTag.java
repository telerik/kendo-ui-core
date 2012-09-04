package com.kendoui.taglib;

@SuppressWarnings("serial")
public class GridTag extends WidgetTag {
    public GridTag() {
        super("Grid");
    }

    //>> Attributes

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean autoBind) {
        setProperty("autoBind", autoBind);
    }

    public boolean getFilterable() {
        return (boolean)getProperty("filterable");
    }

    public void setFilterable(boolean filterable) {
        setProperty("filterable", filterable);
    }

    public boolean getScrollable() {
        return (boolean)getProperty("scrollable");
    }

    public void setScrollable(boolean scrollable) {
        setProperty("scrollable", scrollable);
    }

    public boolean getSortable() {
        return (boolean)getProperty("sortable");
    }

    public void setSortable(boolean sortable) {
        setProperty("sortable", sortable);
    }

    public boolean getSelectable() {
        return (boolean)getProperty("selectable");
    }

    public void setSelectable(boolean selectable) {
        setProperty("selectable", selectable);
    }

    public boolean getNavigatable() {
        return (boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean navigatable) {
        setProperty("navigatable", navigatable);
    }

    public boolean getPageable() {
        return (boolean)getProperty("pageable");
    }

    public void setPageable(boolean pageable) {
        setProperty("pageable", pageable);
    }

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean editable) {
        setProperty("editable", editable);
    }

    public boolean getGroupable() {
        return (boolean)getProperty("groupable");
    }

    public void setGroupable(boolean groupable) {
        setProperty("groupable", groupable);
    }

    public String getRowTemplate() {
        return (String)getProperty("rowTemplate");
    }

    public void setRowTemplate(String rowTemplate) {
        setProperty("rowTemplate", rowTemplate);
    }

    public String getAltRowTemplate() {
        return (String)getProperty("altRowTemplate");
    }

    public void setAltRowTemplate(String altRowTemplate) {
        setProperty("altRowTemplate", altRowTemplate);
    }

    public boolean getResizable() {
        return (boolean)getProperty("resizable");
    }

    public void setResizable(boolean resizable) {
        setProperty("resizable", resizable);
    }

    public boolean getReorderable() {
        return (boolean)getProperty("reorderable");
    }

    public void setReorderable(boolean reorderable) {
        setProperty("reorderable", reorderable);
    }

    public boolean getColumnMenu() {
        return (boolean)getProperty("columnMenu");
    }

    public void setColumnMenu(boolean columnMenu) {
        setProperty("columnMenu", columnMenu);
    }

    //<< Attributes
}