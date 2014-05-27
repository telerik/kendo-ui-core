package com.kendoui.spring.controllers.tooltip;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tooltip-ajax-controller")
@RequestMapping(value="/tooltip/")
public class AjaxController {    
    
    private Map<Integer, String> foods = new HashMap<Integer, String>() {{
        put(11, "Queso Cabrales");
        put(12, "Queso Manchego La Pastora");
        put(31, "Gorgonzola Telino");
        put(32, "Mascarpone Fabioli");
        put(33, "Mascarpone Fabioli");
        put(59, "Geitost");
        put(60, "Raclette Courdavault");
        put(69, "Camembert Pierrott");
        put(72, "Gudbrandsdalsost");
    }};
    
    @RequestMapping(value = {"/ajax"}, method = RequestMethod.GET)
    public String ajax() {
        return "tooltip/ajax";
    }
    
    @RequestMapping(value = {"/ajax/details"}, method = RequestMethod.GET)
    public String details(int id, Model model) {
        
        model.addAttribute("id", id);
        model.addAttribute("title", foods.get(id));
        
        return "/tooltip/ajaxContent";
    }
}

