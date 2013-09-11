
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;




import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorCategoryAxisItemPlotBandsTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> plotBands;

    public List<Map<String, Object>> plotBands() {
        return plotBands;
    }

    public static String tagName() {
        return "stockChart-navigator-categoryAxisItem-plotBands";
    }

    public void addPlotBand(NavigatorCategoryAxisItemPlotBandTag value) {
        plotBands.add(value.properties());
    }

//<< Attributes

}
