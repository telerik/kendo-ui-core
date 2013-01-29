
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterableTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


        parent.setFilterable(this);

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
        return "grid-filterable";
    }

    public void setMessages(com.kendoui.taglib.grid.FilterableMessagesTag value) {
        setProperty("messages", value);
    }

    public void setOperators(com.kendoui.taglib.grid.FilterableOperatorsTag value) {
        setProperty("operators", value);
    }

    public boolean getExtra() {
        return (boolean)getProperty("extra");
    }

    public void setExtra(boolean value) {
        setProperty("extra", value);
    }

//<< Attributes

}
