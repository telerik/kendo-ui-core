
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DataSourceTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SortTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DataSourceTag parent = (DataSourceTag)findParentWithClass(DataSourceTag.class);


        parent.setSort(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        sort = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        sort = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> sort;

    public List<Map<String, Object>> sort() {
        return sort;
    }

    public static String tagName() {
        return "dataSource-sort";
    }

    public void addSortItem(SortItemTag value) {
        sort.add(value.properties());
    }

//<< Attributes

}
