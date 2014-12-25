
package com.kendoui.taglib.treelist;


import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.json.Function;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ColumnsTag parent = (ColumnsTag)findParentWithClass(ColumnsTag.class);

        parent.addColumn(this);

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

    public static String tagName() {
        return "treeList-column";
    }

    public void setCommand(ColumnCommandTag value) {

        setProperty("command", value.command());

    }

    public void setFilterable(com.kendoui.taglib.treelist.ColumnFilterableTag value) {
        setProperty("filterable", value);
    }

    public void setSortable(com.kendoui.taglib.treelist.ColumnSortableTag value) {
        setProperty("sortable", value);
    }

    public void setEditor(ColumnEditorFunctionTag value) {
        setEvent("editor", value.getBody());
    }

    public void setFooterTemplate(ColumnFooterTemplateFunctionTag value) {
        setEvent("footerTemplate", value.getBody());
    }

    public void setHeaderTemplate(ColumnHeaderTemplateFunctionTag value) {
        setEvent("headerTemplate", value.getBody());
    }

    public void setTemplate(ColumnTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public java.lang.Object getAttributes() {
        return (java.lang.Object)getProperty("attributes");
    }

    public void setAttributes(java.lang.Object value) {
        setProperty("attributes", value);
    }

    public String getEditor() {
        Function property = ((Function)getProperty("editor"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setEditor(String value) {
        setProperty("editor", new Function(value));
    }

    public boolean getEncoded() {
        return (boolean)getProperty("encoded");
    }

    public void setEncoded(boolean value) {
        setProperty("encoded", value);
    }

    public boolean getExpandable() {
        return (boolean)getProperty("expandable");
    }

    public void setExpandable(boolean value) {
        setProperty("expandable", value);
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

    public boolean getFilterable() {
        return (boolean)getProperty("filterable");
    }

    public void setFilterable(boolean value) {
        setProperty("filterable", value);
    }

    public java.lang.String getFooterTemplate() {
        return (java.lang.String)getProperty("footerTemplate");
    }

    public void setFooterTemplate(java.lang.String value) {
        setProperty("footerTemplate", value);
    }

    public java.lang.String getFormat() {
        return (java.lang.String)getProperty("format");
    }

    public void setFormat(java.lang.String value) {
        setProperty("format", value);
    }

    public java.lang.Object getHeaderAttributes() {
        return (java.lang.Object)getProperty("headerAttributes");
    }

    public void setHeaderAttributes(java.lang.Object value) {
        setProperty("headerAttributes", value);
    }

    public java.lang.String getHeaderTemplate() {
        return (java.lang.String)getProperty("headerTemplate");
    }

    public void setHeaderTemplate(java.lang.String value) {
        setProperty("headerTemplate", value);
    }

    public boolean getSortable() {
        return (boolean)getProperty("sortable");
    }

    public void setSortable(boolean value) {
        setProperty("sortable", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

    public java.lang.Object getWidth() {
        return (java.lang.Object)getProperty("width");
    }

    public void setWidth(java.lang.Object value) {
        setProperty("width", value);
    }

//<< Attributes

}
