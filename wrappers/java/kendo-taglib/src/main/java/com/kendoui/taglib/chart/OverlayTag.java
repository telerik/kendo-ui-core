
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OverlayTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemTag parent = (SeriesItemTag)findParentWithClass(SeriesItemTag.class);


        parent.setOverlay(this);

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
        return "chart-seriesItem-overlay";
    }

    public String getGradient() {
        return (String)getProperty("gradient");
    }

    public void setGradient(String value) {
        setProperty("gradient", value);
    }

//<< Attributes

}
