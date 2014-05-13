
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesDefaultsOverlayTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesDefaultsTag parent = (SeriesDefaultsTag)findParentWithClass(SeriesDefaultsTag.class);


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
        return "chart-seriesDefaults-overlay";
    }

    public java.lang.String getGradient() {
        return (java.lang.String)getProperty("gradient");
    }

    public void setGradient(java.lang.String value) {
        setProperty("gradient", value);
    }

//<< Attributes

}
