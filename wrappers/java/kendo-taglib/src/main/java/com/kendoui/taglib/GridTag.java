package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

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

    public Function getChange() {
        return (Function)getProperty("change");
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public Function getDataBinding() {
        return (Function)getProperty("dataBinding");
    }

    public void setDataBinding(String dataBinding) {
        setProperty("dataBinding", new Function(dataBinding));
    }

    public Function getDataBound() {
        return (Function)getProperty("dataBound");
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
    }

    public Function getDetailExpand() {
        return (Function)getProperty("detailExpand");
    }

    public void setDetailExpand(String detailExpand) {
        setProperty("detailExpand", new Function(detailExpand));
    }

    public Function getDetailCollapse() {
        return (Function)getProperty("detailCollapse");
    }

    public void setDetailCollapse(String detailCollapse) {
        setProperty("detailCollapse", new Function(detailCollapse));
    }

    public Function getDetailInit() {
        return (Function)getProperty("detailInit");
    }

    public void setDetailInit(String detailInit) {
        setProperty("detailInit", new Function(detailInit));
    }

    public Function getEdit() {
        return (Function)getProperty("edit");
    }

    public void setEdit(String edit) {
        setProperty("edit", new Function(edit));
    }

    public Function getSave() {
        return (Function)getProperty("save");
    }

    public void setSave(String save) {
        setProperty("save", new Function(save));
    }

    public Function getRemove() {
        return (Function)getProperty("remove");
    }

    public void setRemove(String remove) {
        setProperty("remove", new Function(remove));
    }

    public Function getSaveChanges() {
        return (Function)getProperty("saveChanges");
    }

    public void setSaveChanges(String saveChanges) {
        setProperty("saveChanges", new Function(saveChanges));
    }

    public Function getColumnResize() {
        return (Function)getProperty("columnResize");
    }

    public void setColumnResize(String columnResize) {
        setProperty("columnResize", new Function(columnResize));
    }

    public Function getColumnReorder() {
        return (Function)getProperty("columnReorder");
    }

    public void setColumnReorder(String columnReorder) {
        setProperty("columnReorder", new Function(columnReorder));
    }

    public Function getColumnShow() {
        return (Function)getProperty("columnShow");
    }

    public void setColumnShow(String columnShow) {
        setProperty("columnShow", new Function(columnShow));
    }

    public Function getColumnHide() {
        return (Function)getProperty("columnHide");
    }

    public void setColumnHide(String columnHide) {
        setProperty("columnHide", new Function(columnHide));
    }

    //<< Attributes
}