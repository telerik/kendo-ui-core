
package com.kendoui.taglib.sparkline;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SparklineTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
        SparklineTag parent = (SparklineTag)findParentWithClass(SparklineTag.class);


        parent.setSeries(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        series = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> series;

    public List<Map<String, Object>> series() {
        return series;
    }

    public static String tagName() {
        return "sparkline-series";
    }

    public void addSeriesItem(SeriesItemTag value) {
        series.add(value.properties());
    }

//<< Attributes

}
