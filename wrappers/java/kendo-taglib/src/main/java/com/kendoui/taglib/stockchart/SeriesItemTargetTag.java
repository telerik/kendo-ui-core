
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemTargetTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemTag parent = (SeriesItemTag)findParentWithClass(SeriesItemTag.class);


        parent.setTarget(this);

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
        return "stockChart-seriesItem-target";
    }

    public void setBorder(com.kendoui.taglib.stockchart.SeriesItemTargetBorderTag value) {
        setProperty("border", value);
    }

    public void setLine(com.kendoui.taglib.stockchart.SeriesItemTargetLineTag value) {
        setProperty("line", value);
    }

//<< Attributes

}
