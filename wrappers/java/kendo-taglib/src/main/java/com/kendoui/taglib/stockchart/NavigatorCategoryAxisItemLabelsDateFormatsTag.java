
package com.kendoui.taglib.stockchart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class NavigatorCategoryAxisItemLabelsDateFormatsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        NavigatorCategoryAxisItemLabelsTag parent = (NavigatorCategoryAxisItemLabelsTag)findParentWithClass(NavigatorCategoryAxisItemLabelsTag.class);


        parent.setDateFormats(this);

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
        return "stockChart-navigator-categoryAxisItem-labels-dateFormats";
    }

    public java.lang.String getDays() {
        return (java.lang.String)getProperty("days");
    }

    public void setDays(java.lang.String value) {
        setProperty("days", value);
    }

    public java.lang.String getHours() {
        return (java.lang.String)getProperty("hours");
    }

    public void setHours(java.lang.String value) {
        setProperty("hours", value);
    }

    public java.lang.String getMonths() {
        return (java.lang.String)getProperty("months");
    }

    public void setMonths(java.lang.String value) {
        setProperty("months", value);
    }

    public java.lang.String getWeeks() {
        return (java.lang.String)getProperty("weeks");
    }

    public void setWeeks(java.lang.String value) {
        setProperty("weeks", value);
    }

    public java.lang.String getYears() {
        return (java.lang.String)getProperty("years");
    }

    public void setYears(java.lang.String value) {
        setProperty("years", value);
    }

//<< Attributes

}
