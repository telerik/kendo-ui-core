
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class YAxisItemPlotBandsTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        YAxisItemTag parent = (YAxisItemTag)findParentWithClass(YAxisItemTag.class);


        parent.setPlotBands(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        plotBands = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        plotBands = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> plotBands;

    public List<Map<String, Object>> plotBands() {
        return plotBands;
    }

    public static String tagName() {
        return "chart-yAxisItem-plotBands";
    }

    public void addPlotBand(PlotBandsPlotBandTag value) {
        plotBands.add(value.properties());
    }

//<< Attributes

}
