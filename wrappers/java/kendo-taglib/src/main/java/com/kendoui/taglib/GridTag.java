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

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public String getDataBinding() {
        return ((Function)getProperty("dataBinding")).getBody();
    }

    public void setDataBinding(String dataBinding) {
        setProperty("dataBinding", new Function(dataBinding));
    }

    public String getDataBound() {
        return ((Function)getProperty("dataBound")).getBody();
    }

    public void setDataBound(String dataBound) {
        setProperty("dataBound", new Function(dataBound));
    }

    public String getDetailExpand() {
        return ((Function)getProperty("detailExpand")).getBody();
    }

    public void setDetailExpand(String detailExpand) {
        setProperty("detailExpand", new Function(detailExpand));
    }

    public String getDetailCollapse() {
        return ((Function)getProperty("detailCollapse")).getBody();
    }

    public void setDetailCollapse(String detailCollapse) {
        setProperty("detailCollapse", new Function(detailCollapse));
    }

    public String getDetailInit() {
        return ((Function)getProperty("detailInit")).getBody();
    }

    public void setDetailInit(String detailInit) {
        setProperty("detailInit", new Function(detailInit));
    }

    public String getEdit() {
        return ((Function)getProperty("edit")).getBody();
    }

    public void setEdit(String edit) {
        setProperty("edit", new Function(edit));
    }

    public String getSave() {
        return ((Function)getProperty("save")).getBody();
    }

    public void setSave(String save) {
        setProperty("save", new Function(save));
    }

    public String getRemove() {
        return ((Function)getProperty("remove")).getBody();
    }

    public void setRemove(String remove) {
        setProperty("remove", new Function(remove));
    }

    public String getSaveChanges() {
        return ((Function)getProperty("saveChanges")).getBody();
    }

    public void setSaveChanges(String saveChanges) {
        setProperty("saveChanges", new Function(saveChanges));
    }

    public String getColumnResize() {
        return ((Function)getProperty("columnResize")).getBody();
    }

    public void setColumnResize(String columnResize) {
        setProperty("columnResize", new Function(columnResize));
    }

    public String getColumnReorder() {
        return ((Function)getProperty("columnReorder")).getBody();
    }

    public void setColumnReorder(String columnReorder) {
        setProperty("columnReorder", new Function(columnReorder));
    }

    public String getColumnShow() {
        return ((Function)getProperty("columnShow")).getBody();
    }

    public void setColumnShow(String columnShow) {
        setProperty("columnShow", new Function(columnShow));
    }

    public String getColumnHide() {
        return ((Function)getProperty("columnHide")).getBody();
    }

    public void setColumnHide(String columnHide) {
        setProperty("columnHide", new Function(columnHide));
    }

    //<< Attributes
}