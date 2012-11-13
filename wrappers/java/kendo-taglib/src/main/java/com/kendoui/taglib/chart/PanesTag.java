
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ChartTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PanesTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ChartTag parent = (ChartTag)findParentWithClass(ChartTag.class);


        parent.setPanes(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        panes = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        panes = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> panes;

    public List<Map<String, Object>> panes() {
        return panes;
    }

    public static String tagName() {
        return "chart-panes";
    }

    public void addPane(PaneTag value) {
        panes.add(value.properties());
    }

//<< Attributes

}
