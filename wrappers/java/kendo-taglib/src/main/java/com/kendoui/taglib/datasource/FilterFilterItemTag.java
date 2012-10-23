
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterFilterItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        FilterTag parent = (FilterTag)findParentWithClass(FilterTag.class);

        parent.addFilterItem(this);

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
        return "dataSource-filterItem";
    }

    public String getOperator() {
        return (String)getProperty("operator");
    }

    public void setOperator(String value) {
        setProperty("operator", value);
    }

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public Object getValue() {
        return (Object)getProperty("value");
    }

    public void setValue(Object value) {
        setProperty("value", value);
    }

//<< Attributes

}
