
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.StockChartTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class XAxisTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        StockChartTag parent = (StockChartTag)findParentWithClass(StockChartTag.class);


        parent.setXAxis(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        xAxis = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        xAxis = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> xAxis;

    public List<Map<String, Object>> xAxis() {
        return xAxis;
    }

    public static String tagName() {
        return "stockChart-xAxis";
    }

    public void addXAxisItem(XAxisItemTag value) {
        xAxis.add(value.properties());
    }

//<< Attributes

}
