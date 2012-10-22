
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.ChartTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);

        parent.setSeries(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        series = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        series = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> series;

    public List<Map<String, Object>> series() {
        return series;
    }

    public static String tagName() {
        return "chart-series";
    }

    public void addSeriesItem(SeriesItemTag value) {
        series.add(value.properties());
    }

//<< Attributes

}
