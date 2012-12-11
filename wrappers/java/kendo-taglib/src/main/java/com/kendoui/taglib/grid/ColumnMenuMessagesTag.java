
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

    public String getColumns() {
        return (String)getProperty("columns");
    }

    public void setColumns(String value) {
        setProperty("columns", value);
    }

    public String getFilter() {
        return (String)getProperty("filter");
    }

    public void setFilter(String value) {
        setProperty("filter", value);
    }

    public String getSortAscending() {
        return (String)getProperty("sortAscending");
    }

    public void setSortAscending(String value) {
        setProperty("sortAscending", value);
    }

    public String getSortDescending() {
        return (String)getProperty("sortDescending");
    }

    public void setSortDescending(String value) {
        setProperty("sortDescending", value);
    }

//<< Attributes

}
