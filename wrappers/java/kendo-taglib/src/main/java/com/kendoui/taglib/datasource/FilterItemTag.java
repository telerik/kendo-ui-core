
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

    public String getField() {
        return (String)getProperty("field");
    }

    public void setField(String value) {
        setProperty("field", value);
    }

    public String getLogic() {
        return (String)getProperty("logic");
    }

    public void setLogic(String value) {
        setProperty("logic", value);
    }

    public String getOperator() {
        return (String)getProperty("operator");
    }

    public void setOperator(String value) {
        setProperty("operator", value);
    }

    public Object getValue() {
        return (Object)getProperty("value");
    }

    public void setValue(Object value) {
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
