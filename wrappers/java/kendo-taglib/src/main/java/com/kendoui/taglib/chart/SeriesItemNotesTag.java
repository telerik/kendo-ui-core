
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesItemNotesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SeriesItemTag parent = (SeriesItemTag)findParentWithClass(SeriesItemTag.class);


        parent.setNotes(this);

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
        return "chart-seriesItem-notes";
    }

    public void setIcon(com.kendoui.taglib.chart.SeriesItemNotesIconTag value) {
        setProperty("icon", value);
    }

    public void setLabel(com.kendoui.taglib.chart.SeriesItemNotesLabelTag value) {
        setProperty("label", value);
    }

    public void setLine(com.kendoui.taglib.chart.SeriesItemNotesLineTag value) {
        setProperty("line", value);
    }

//<< Attributes

}
