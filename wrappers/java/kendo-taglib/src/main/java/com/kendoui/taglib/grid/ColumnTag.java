
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
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
        return "grid-column";
    }

    public void setCommand(ColumnCommandTag value) {

        setProperty("command", value.command());

    }

    public void setEditor(EditorFunctionTag value) {
        setEvent("editor", value.getBody());
    }

    public Object getAttributes() {
        return (Object)getProperty("attributes");
    }

    public void setAttributes(Object value) {
        setProperty("attributes", value);
    }

    public String getCommand() {
        return (String)getProperty("command");
    }

    public void setCommand(String value) {
        setProperty("command", value);
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

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public boolean getFilterable() {
        return (boolean)getProperty("filterable");
    }

    public void setFilterable(boolean value) {
        setProperty("filterable", value);
    }

    public String getFormat() {
        return (String)getProperty("format");
    }

    public void setFormat(String value) {
        setProperty("format", value);
    }

    public Object getHeaderAttributes() {
        return (Object)getProperty("headerAttributes");
    }

    public void setHeaderAttributes(Object value) {
        setProperty("headerAttributes", value);
    }

    public String getHeaderTemplate() {
        return (String)getProperty("headerTemplate");
    }

    public void setHeaderTemplate(String value) {
        setProperty("headerTemplate", value);
    }

    public boolean getSortable() {
        return (boolean)getProperty("sortable");
    }

    public void setSortable(boolean value) {
        setProperty("sortable", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
        setProperty("template", value);
    }

    public Object getAggregates() {
        return (Object)getProperty("aggregates");
    }

    public void setAggregates(Object value) {
        setProperty("aggregates", value);
    }

    public String getGroupHeaderTemplate() {
        return (String)getProperty("groupHeaderTemplate");
    }

    public void setGroupHeaderTemplate(String value) {
        setProperty("groupHeaderTemplate", value);
    }

    public String getGroupFooterTemplate() {
        return (String)getProperty("groupFooterTemplate");
    }

    public void setGroupFooterTemplate(String value) {
        setProperty("groupFooterTemplate", value);
    }

    public String getFooterTemplate() {
        return (String)getProperty("footerTemplate");
    }

    public void setFooterTemplate(String value) {
        setProperty("footerTemplate", value);
    }

    public String getTitle() {
        return (String)getProperty("title");
    }

    public void setTitle(String value) {
        setProperty("title", value);
    }

    public String getWidth() {
        return (String)getProperty("width");
    }

    public void setWidth(String value) {
        setProperty("width", value);
    }

//<< Attributes
    
    public void setValues(ColumnValuesTag value) {
        setProperty("values", value.getValue());
    }
}
