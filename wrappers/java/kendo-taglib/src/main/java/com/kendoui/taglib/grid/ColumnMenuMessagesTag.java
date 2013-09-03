
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnMenuMessagesTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColumnMenuTag parent = (ColumnMenuTag)findParentWithClass(ColumnMenuTag.class);


        parent.setMessages(this);

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
        return "grid-columnMenu-messages";
    }

    public java.lang.String getColumns() {
        return (java.lang.String)getProperty("columns");
    }

    public void setColumns(java.lang.String value) {
        setProperty("columns", value);
    }

    public java.lang.String getFilter() {
        return (java.lang.String)getProperty("filter");
    }

    public void setFilter(java.lang.String value) {
        setProperty("filter", value);
    }

    public java.lang.String getSortAscending() {
        return (java.lang.String)getProperty("sortAscending");
    }

    public void setSortAscending(java.lang.String value) {
        setProperty("sortAscending", value);
    }

    public java.lang.String getSortDescending() {
        return (java.lang.String)getProperty("sortDescending");
    }

    public void setSortDescending(java.lang.String value) {
        setProperty("sortDescending", value);
    }

//<< Attributes

}
