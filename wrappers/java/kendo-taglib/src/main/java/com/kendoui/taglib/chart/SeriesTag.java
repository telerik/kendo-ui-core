
package com.kendoui.taglib.chart;

import java.util.ArrayList;
import java.util.List;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class SeriesTag extends BaseTag /* interfaces */implements SeriesItem/* interfaces */ {

//>> Attributes

    private List<SeriesItemTag> series = new ArrayList<SeriesItemTag>();

    public List<SeriesItemTag> series () {
        return series;
    }

    @Override
    public int doEndTag() throws JspException {
        Series parent = (Series)findParentWithClass(Series.class);

        parent.setSeries(this);

        return EVAL_PAGE;
    }

    @Override
    public void addSeriesItem(SeriesItemTag value) {
        series.add(value);
    }

//<< Attributes
}
