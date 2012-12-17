
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterableOperatorsTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        FilterableTag parent = (FilterableTag)findParentWithClass(FilterableTag.class);


        parent.setOperators(this);

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
        return "grid-filterable-operators";
    }

    public void setDate(FilterableOperatorsDateTag value) {
        setProperty("date", value);
    }

    public void setEnums(FilterableOperatorsEnumsTag value) {
        setProperty("enums", value);
    }

    public void setNumber(FilterableOperatorsNumberTag value) {
        setProperty("number", value);
    }

    public void setString(FilterableOperatorsStringTag value) {
        setProperty("string", value);
    }

//<< Attributes

}
