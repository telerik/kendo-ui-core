
package com.kendoui.taglib.radialgauge;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LabelsBorderTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ScaleLabelsTag parent = (ScaleLabelsTag)findParentWithClass(ScaleLabelsTag.class);


        parent.setBorder(this);

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
        return "radialGauge-scale-labels-border";
    }

    public String getColor() {
        return (String)getProperty("color");
    }

    public void setColor(String value) {
        setProperty("color", value);
    }

    public String getDashType() {
        return (String)getProperty("dashType");
    }

    public void setDashType(String value) {
        setProperty("dashType", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
