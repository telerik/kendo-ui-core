
package com.kendoui.taglib.datasource;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DataSourceTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AggregateTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DataSourceTag parent = (DataSourceTag)findParentWithClass(DataSourceTag.class);


        parent.setAggregate(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        aggregate = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        aggregate = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> aggregate;

    public List<Map<String, Object>> aggregate() {
        return aggregate;
    }

    public static String tagName() {
        return "dataSource-aggregate";
    }

    public void addAggregateItem(AggregateAggregateItemTag value) {
        aggregate.add(value.properties());
    }

//<< Attributes

}
