
package com.kendoui.taglib.sparkline;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemTargetLineTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemTargetTag parent = (SeriesItemTargetTag)findParentWithClass(SeriesItemTargetTag.class);


        parent.setLine(this);

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
        return "sparkline-seriesItem-target-line";
    }

    public void setWidth(SeriesItemTargetLineWidthFunctionTag value) {
        setEvent("width", value.getBody());
    }

    public java.lang.Object getWidth() {
        return (java.lang.Object)getProperty("width");
    }

    public void setWidth(java.lang.Object value) {
        setProperty("width", value);
    }

//<< Attributes

}
