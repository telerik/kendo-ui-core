
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ChartTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class YAxisTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setYAxis(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        yAxis = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        yAxis = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> yAxis;

    public List<Map<String, Object>> yAxis() {
        return yAxis;
    }

    public static String tagName() {
        return "chart-yAxis";
    }

    public void addYAxisItem(YAxisItemTag value) {
        yAxis.add(value.properties());
    }

//<< Attributes

}
