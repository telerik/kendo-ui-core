
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LegendInactiveItemsLabelsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LegendInactiveItemsTag parent = (LegendInactiveItemsTag)findParentWithClass(LegendInactiveItemsTag.class);


        parent.setLabels(this);

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
        return "chart-legend-inactiveItems-labels";
    }

    public void setTemplate(LegendInactiveItemsLabelsTemplateFunctionTag value) {
        setEvent("template", value.getBody());
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getFont() {
        return (String)getProperty("font");
    }

    public void setFont(String value) {
        setProperty("font", value);
    }

    public String getTemplate() {
        return (String)getProperty("template");
    }

    public void setTemplate(String value) {
        setProperty("template", value);
    }

//<< Attributes

}
