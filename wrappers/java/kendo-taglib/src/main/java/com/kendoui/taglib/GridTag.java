
package com.kendoui.taglib;


import com.kendoui.taglib.grid.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GridTag extends WidgetTag /* interfaces */implements Columns, Editable, Groupable, Pageable, Sortable, Toolbar, DataBoundWidget/* interfaces */ {

    public GridTag() {
        super("Grid");
    }

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

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

    @Override
    public void setColumns(ColumnsTag value) {

        setProperty("columns", value.columns());

    }

    @Override
    public void setEditable(EditableTag value) {
        setProperty("editable", value.properties());
    }

    @Override
    public void setGroupable(GroupableTag value) {
        setProperty("groupable", value.properties());
    }

    @Override
    public void setPageable(PageableTag value) {
        setProperty("pageable", value.properties());
    }

    @Override
    public void setSortable(SortableTag value) {
        setProperty("sortable", value.properties());
    }

    @Override
    public void setToolbar(ToolbarTag value) {

        setProperty("toolbar", value.toolbar());

    }

    public boolean getAutoBind() {
        return (boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
    }

    @Override
    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource.properties());
    }

    public boolean getGroupable() {
        return (boolean)getProperty("groupable");
    }

    public void setGroupable(boolean value) {
        setProperty("groupable", value);
    }

    public boolean getNavigatable() {
        return (boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean value) {
        setProperty("navigatable", value);
    }

    public boolean getPageable() {
        return (boolean)getProperty("pageable");
    }

    public void setPageable(boolean value) {
        setProperty("pageable", value);
    }

    public boolean getScrollable() {
        return (boolean)getProperty("scrollable");
    }

    public void setScrollable(boolean value) {
        setProperty("scrollable", value);
    }

    public String getSelectable() {
        return (String)getProperty("selectable");
    }

    public void setSelectable(String value) {
        setProperty("selectable", value);
    }

    public boolean getSortable() {
        return (boolean)getProperty("sortable");
    }

    public void setSortable(boolean value) {
        setProperty("sortable", value);
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
