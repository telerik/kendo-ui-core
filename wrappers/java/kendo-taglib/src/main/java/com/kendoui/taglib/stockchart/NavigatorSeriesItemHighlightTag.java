
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorSeriesItemHighlightTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        NavigatorSeriesItemTag parent = (NavigatorSeriesItemTag)findParentWithClass(NavigatorSeriesItemTag.class);


        parent.setHighlight(this);

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
        return "stockChart-navigator-seriesItem-highlight";
    }

    public void setBorder(com.kendoui.taglib.stockchart.NavigatorSeriesItemHighlightBorderTag value) {
        setProperty("border", value);
    }

    public void setLine(com.kendoui.taglib.stockchart.NavigatorSeriesItemHighlightLineTag value) {
        setProperty("line", value);
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public float getOpacity() {
        return (float)getProperty("opacity");
    }

    public void setOpacity(float value) {
        setProperty("opacity", value);
    }

//<< Attributes

}
