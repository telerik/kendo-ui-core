
package com.kendoui.taglib.tabstrip;

import com.kendoui.taglib.BaseTag;
import com.kendoui.taglib.html.Li;
import com.kendoui.taglib.html.Text;
import com.kendoui.taglib.html.Ul;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;

@SuppressWarnings("serial")
public class ItemsTag extends BaseTag /* interfaces */implements Item/* interfaces */ {
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Items parent = (Items)findParentWithClass(Items.class);

        parent.setItems(this);

//<< doEndTag

        Ul ul = new Ul();
        
        for (Map<String, Object> item : items) {
            Li li = new Li();
            
            li.append(new Text(item.get("text").toString()));
            
            ul.append(li);
        }
        
        try {
            JspWriter out = pageContext.getOut();
            
            ul.write(out);
            
            out.write(body());
            
        } catch (IOException exception) {
            throw new JspException(exception);
        }
        
        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        items = new ArrayList<Map<String, Object>>();

//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy

        items = null;

//<< destroy

        super.destroy();
    }

//>> Attributes

    private List<Map<String, Object>> items;

    public List<Map<String, Object>> items() {
        return items;
    }

    @Override
    public void addItem(ItemTag value) {
        items.add(value.properties());
    }

//<< Attributes

}
