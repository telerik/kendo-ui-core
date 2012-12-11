
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemHighlightLineTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemHighlightTag parent = (SeriesItemHighlightTag)findParentWithClass(SeriesItemHighlightTag.class);


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
        return "stockChart-seriesItem-highlight-line";
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

//<< Attributes

}
