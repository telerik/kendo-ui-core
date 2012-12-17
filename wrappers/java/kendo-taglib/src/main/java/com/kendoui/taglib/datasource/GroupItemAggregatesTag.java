
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class GroupItemAggregatesTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GroupItemTag parent = (GroupItemTag)findParentWithClass(GroupItemTag.class);


        parent.setAggregates(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        aggregates = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        aggregates = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> aggregates;

    public List<Map<String, Object>> aggregates() {
        return aggregates;
    }

    public static String tagName() {
        return "dataSource-groupItem-aggregates";
    }

    public void addAggregate(GroupItemAggregateTag value) {
        aggregates.add(value.properties());
    }

//<< Attributes

}
