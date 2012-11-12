
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.StockChartTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValueAxisTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        StockChartTag parent = (StockChartTag)findParentWithClass(StockChartTag.class);


        parent.setValueAxis(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        valueAxis = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        valueAxis = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> valueAxis;

    public List<Map<String, Object>> valueAxis() {
        return valueAxis;
    }

    public static String tagName() {
        return "stockChart-valueAxis";
    }

    public void addValueAxisItem(ValueAxisItemTag value) {
        valueAxis.add(value.properties());
    }

//<< Attributes

}
