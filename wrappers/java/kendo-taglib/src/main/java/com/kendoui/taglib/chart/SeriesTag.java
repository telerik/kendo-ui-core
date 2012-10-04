
package com.kendoui.taglib.chart;

import com.kendoui.taglib.BaseTag;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces */implements SeriesItem/* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Series parent = (Series)findParentWithClass(Series.class);

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

        series = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> series;

    public List<Map<String, Object>> series() {
        return series;
    }

    @Override
    public void addSeriesItem(SeriesItemTag value) {
        series.add(value.properties());
    }

//<< Attributes

}
