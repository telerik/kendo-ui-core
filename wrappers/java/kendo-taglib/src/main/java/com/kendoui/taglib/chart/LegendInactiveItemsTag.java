
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LegendInactiveItemsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LegendTag parent = (LegendTag)findParentWithClass(LegendTag.class);


        parent.setInactiveItems(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
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

    public static String tagName() {
        return "chart-legend-inactiveItems";
    }

    public void setLabels(com.kendoui.taglib.chart.LegendInactiveItemsLabelsTag value) {
        setProperty("labels", value);
    }

//<< Attributes

}
