
package com.kendoui.taglib.menu;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.kendoui.taglib.BaseItemTag;
import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Li;
import com.kendoui.taglib.html.Ul;
import com.kendoui.taglib.menu.ItemsTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ItemTag extends BaseItemTag /* interfaces */implements Items/* interfaces */ {
    
    @Override
    public void setItems(ItemsTag value) {
        items = value.items();
    }
    
    @Override
    protected List<?> items() {
        return items;
    }
    
    @Override
    protected void appendContent(Element<?> element, String html){
        Ul ul = new Ul();
        
        if (items.size() > 0) {
            ul.html(html);
        } else {
            Li li = new Li();
            
            li.html(html);
            
            ul.append(li);
        }
        
        element.append(ul);
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Item parent = (Item)findParentWithClass(Item.class);

        parent.addItem(this);

//<< doEndTag

        return super.doEndTag();
    }
    
    private List<Map<String, Object>> items;
    
    @Override
    public void initialize() {
//>> initialize
//<< initialize
        items = new ArrayList<Map<String, Object>>();
        
        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy
        items = null;
        
        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "menu-item";
    }

    public String getText() {
        return (String)getProperty("text");
    }

    public void setText(String value) {
        setProperty("text", value);
    }

//<< Attributes

}
