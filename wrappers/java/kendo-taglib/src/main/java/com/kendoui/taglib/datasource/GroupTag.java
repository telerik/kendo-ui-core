
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DataSourceTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GroupTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DataSourceTag parent = (DataSourceTag)findParentWithClass(DataSourceTag.class);


        parent.setGroup(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        group = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        group = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> group;

    public List<Map<String, Object>> group() {
        return group;
    }

    public static String tagName() {
        return "dataSource-group";
    }

    public void addGroupItem(GroupItemTag value) {
        group.add(value.properties());
    }

//<< Attributes

}
