
package com.kendoui.taglib.datasource;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterItemTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
        FilterTag parent = (FilterTag)findParent(FilterTag.class);
        
        if (filters.size() > 0) {
            setProperty("filters", filters);
        }

        if (parent != null) {
            parent.addFilterItem(this);
        } else {
            FilterItemTag item = (FilterItemTag)findParent(FilterItemTag.class);
            if (item != null) {
                item.addFilterItem(this);
            }
        }

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize
        filters = new ArrayList<Map<String, Object>>();
        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        filters = null;
        
        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "dataSource-filterItem";
    }

    public java.lang.String getField() {
        return (java.lang.String)getProperty("field");
    }

    public void setField(java.lang.String value) {
        setProperty("field", value);
    }

    public java.lang.String getLogic() {
        return (java.lang.String)getProperty("logic");
    }

    public void setLogic(java.lang.String value) {
        setProperty("logic", value);
    }

    public java.lang.String getOperator() {
        return (java.lang.String)getProperty("operator");
    }

    public void setOperator(java.lang.String value) {
        setProperty("operator", value);
    }

    public java.lang.Object getValue() {
        return (java.lang.Object)getProperty("value");
    }

    public void setValue(java.lang.Object value) {
        setProperty("value", value);
    }

//<< Attributes
    
    private List<Map<String, Object>> filters;

    public List<Map<String, Object>> filters() {
        return filters;
    }

    public void addFilterItem(FilterItemTag value) {
        filters.add(value.properties());        
    }
}
