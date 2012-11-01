
package com.kendoui.taglib;


import com.kendoui.taglib.grid.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GridTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

    public GridTag() {
        super("Grid");
    }

    
    @Override
    public int doEndTag() throws JspException {
        String template;
//>> doEndTag
//<< doEndTag        
        
        if (isSet("detailTemplate")) {
            template = "kendo.template($(\"#" + getDetailTemplate() + "\").html())";
            setProperty("detailTemplate", new Function(template));
        }
        
        if (isSet("rowTemplate")) {
            template = "kendo.template($(\"#" + getRowTemplate() + "\").html())";
            setProperty("rowTemplate", new Function(template));
        }
        
        if (isSet("altRowTemplate")) {
            template = "kendo.template($(\"#" + getAltRowTemplate() + "\").html())";
            setProperty("altRowTemplate", new Function(template));
        }
        
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
        return "grid";
    }

    public void setColumns(ColumnsTag value) {

        setProperty("columns", value.columns());

    }

    public void setEditable(EditableTag value) {
        setProperty("editable", value);
    }

    public void setGroupable(GroupableTag value) {
        setProperty("groupable", value);
    }

    public void setPageable(PageableTag value) {
        setProperty("pageable", value);
    }

    public void setScrollable(ScrollableTag value) {
        setProperty("scrollable", value);
    }

    public void setSortable(SortableTag value) {
        setProperty("sortable", value);
    }

    public void setToolbar(ToolbarTag value) {

        setProperty("toolbar", value.toolbar());

    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setColumnResize(ColumnResizeFunctionTag value) {
        setEvent("columnResize", value.getBody());
    }

    public void setDataBound(DataBoundFunctionTag value) {
        setEvent("dataBound", value.getBody());
    }

    public void setDataBinding(DataBindingFunctionTag value) {
        setEvent("dataBinding", value.getBody());
    }

    public void setDetailCollapse(DetailCollapseFunctionTag value) {
        setEvent("detailCollapse", value.getBody());
    }

    public void setDetailExpand(DetailExpandFunctionTag value) {
        setEvent("detailExpand", value.getBody());
    }

    public void setDetailInit(DetailInitFunctionTag value) {
        setEvent("detailInit", value.getBody());
    }

    public void setEdit(EditFunctionTag value) {
        setEvent("edit", value.getBody());
    }

    public void setRemove(RemoveFunctionTag value) {
        setEvent("remove", value.getBody());
    }

    public void setSave(SaveFunctionTag value) {
        setEvent("save", value.getBody());
    }

    public void setSaveChanges(SaveChangesFunctionTag value) {
        setEvent("saveChanges", value.getBody());
    }

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

    public boolean getEditable() {
        return (boolean)getProperty("editable");
    }

    public void setEditable(boolean value) {
        setProperty("editable", value);
    }

    public boolean getFilterable() {
        return (boolean)getProperty("filterable");
    }

    public void setFilterable(boolean value) {
        setProperty("filterable", value);
    }

    public boolean getReorderable() {
        return (boolean)getProperty("reorderable");
    }

    public void setReorderable(boolean value) {
        setProperty("reorderable", value);
    }

    public boolean getResizable() {
        return (boolean)getProperty("resizable");
    }

    public void setResizable(boolean value) {
        setProperty("resizable", value);
    }

    public boolean getGroupable() {
        return (boolean)getProperty("groupable");
    }

    public void setGroupable(boolean value) {
        setProperty("groupable", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
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

    public String getDetailTemplate() {
        return (String)getProperty("detailTemplate");
    }

    public void setDetailTemplate(String value) {
        setProperty("detailTemplate", value);
    }

    public String getRowTemplate() {
        return (String)getProperty("rowTemplate");
    }

    public void setRowTemplate(String value) {
        setProperty("rowTemplate", value);
    }

    public String getAltRowTemplate() {
        return (String)getProperty("altRowTemplate");
    }

    public void setAltRowTemplate(String value) {
        setProperty("altRowTemplate", value);
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

    public String getColumnResize() {
        Function property = ((Function)getProperty("columnResize"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setColumnResize(String value) {
        setProperty("columnResize", new Function(value));
    }

    public String getDataBound() {
        Function property = ((Function)getProperty("dataBound"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBound(String value) {
        setProperty("dataBound", new Function(value));
    }

    public String getDataBinding() {
        Function property = ((Function)getProperty("dataBinding"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDataBinding(String value) {
        setProperty("dataBinding", new Function(value));
    }

    public String getDetailCollapse() {
        Function property = ((Function)getProperty("detailCollapse"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDetailCollapse(String value) {
        setProperty("detailCollapse", new Function(value));
    }

    public String getDetailExpand() {
        Function property = ((Function)getProperty("detailExpand"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDetailExpand(String value) {
        setProperty("detailExpand", new Function(value));
    }

    public String getDetailInit() {
        Function property = ((Function)getProperty("detailInit"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setDetailInit(String value) {
        setProperty("detailInit", new Function(value));
    }

    public String getEdit() {
        Function property = ((Function)getProperty("edit"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setEdit(String value) {
        setProperty("edit", new Function(value));
    }

    public String getRemove() {
        Function property = ((Function)getProperty("remove"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

    public String getSave() {
        Function property = ((Function)getProperty("save"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSave(String value) {
        setProperty("save", new Function(value));
    }

    public String getSaveChanges() {
        Function property = ((Function)getProperty("saveChanges"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSaveChanges(String value) {
        setProperty("saveChanges", new Function(value));
    }

//<< Attributes

    public void setToolbarTemplate(ToolbarTemplateFunctionTag value) {        
        setProperty("toolbar", value.getBody());
    }
    
    public String getToolbarTemplate() {
        Function property = ((Function)getProperty("toolbar"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }
}
