
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PaneTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        PanesTag parent = (PanesTag)findParentWithClass(PanesTag.class);

        parent.addPane(this);

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
        return "stockChart-pane";
    }

    public void setBorder(PaneBorderTag value) {
        setProperty("border", value);
    }

    public void setTitle(PaneTitleTag value) {
        setProperty("title", value);
    }

    public String getName() {
        return (String)getProperty("name");
    }

    public void setName(String value) {
        setProperty("name", value);
    }

    public float getMargin() {
        return (float)getProperty("margin");
    }

    public void setMargin(float value) {
        setProperty("margin", value);
    }

    public float getPadding() {
        return (float)getProperty("padding");
    }

    public void setPadding(float value) {
        setProperty("padding", value);
    }

    public String getBackground() {
        return (String)getProperty("background");
    }

    public void setBackground(String value) {
        setProperty("background", value);
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public String getTitle() {
        return (String)getProperty("title");
    }

    public void setTitle(String value) {
        setProperty("title", value);
    }

//<< Attributes

}
