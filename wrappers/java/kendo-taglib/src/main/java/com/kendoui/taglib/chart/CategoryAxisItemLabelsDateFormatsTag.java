
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class CategoryAxisItemLabelsDateFormatsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        CategoryAxisItemLabelsTag parent = (CategoryAxisItemLabelsTag)findParentWithClass(CategoryAxisItemLabelsTag.class);


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
        return "chart-categoryAxisItem-labels-dateFormats";
    }

    public String getDays() {
        return (String)getProperty("days");
    }

    public void setDays(String value) {
        setProperty("days", value);
    }

    public String getHours() {
        return (String)getProperty("hours");
    }

    public void setHours(String value) {
        setProperty("hours", value);
    }

    public String getMonths() {
        return (String)getProperty("months");
    }

    public void setMonths(String value) {
        setProperty("months", value);
    }

    public String getWeeks() {
        return (String)getProperty("weeks");
    }

    public void setWeeks(String value) {
        setProperty("weeks", value);
    }

    public String getYears() {
        return (String)getProperty("years");
    }

    public void setYears(String value) {
        setProperty("years", value);
    }

//<< Attributes

}
