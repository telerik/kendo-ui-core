
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColumnMenuTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


        parent.setColumnMenu(this);

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
        return "grid-columnMenu";
    }

    public void setMessages(com.kendoui.taglib.grid.ColumnMenuMessagesTag value) {
        setProperty("messages", value);
    }

    public boolean getColumns() {
        return (boolean)getProperty("columns");
    }

    public void setColumns(boolean value) {
        setProperty("columns", value);
    }

    public boolean getFilterable() {
        return (boolean)getProperty("filterable");
    }

    public void setFilterable(boolean value) {
        setProperty("filterable", value);
    }

    public boolean getSortable() {
        return (boolean)getProperty("sortable");
    }

    public void setSortable(boolean value) {
        setProperty("sortable", value);
    }

//<< Attributes

}
