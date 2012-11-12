
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.StockChartTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        StockChartTag parent = (StockChartTag)findParentWithClass(StockChartTag.class);


        parent.setCategoryAxis(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        categoryAxis = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        categoryAxis = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> categoryAxis;

    public List<Map<String, Object>> categoryAxis() {
        return categoryAxis;
    }

    public static String tagName() {
        return "stockChart-categoryAxis";
    }

    public void addCategoryAxisItem(CategoryAxisItemTag value) {
        categoryAxis.add(value.properties());
    }

//<< Attributes

}
