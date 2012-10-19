
package com.kendoui.taglib.datasource;

import com.kendoui.taglib.BaseTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilterTag extends BaseTag /* interfaces */implements FilterItem/* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Filter parent = (Filter)findParentWithClass(Filter.class);

        parent.setFilter(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        filter = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        filter = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> filter;

    public List<Map<String, Object>> filter() {
        return filter;
    }

    public static String tagName() {
        return "dataSource-filter";
    }

    @Override
    public void addFilterItem(FilterItemTag value) {
        filter.add(value.properties());
    }

//<< Attributes

}
