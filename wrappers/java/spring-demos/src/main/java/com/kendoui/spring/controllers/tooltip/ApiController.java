package com.kendoui.spring.controllers.tooltip;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("tooltip-api-controller")
@RequestMapping(value="/tooltip/")
public class ApiController {    
    
    @SuppressWarnings("serial")
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String api(Model model) {
        
        model.addAttribute("targets", new ArrayList<HashMap<String, Object>>() {{
                add(new HashMap<String, Object>() {{                    
                    put("id", 1);
                    put("text", "Target 1");
                }});
                add(new HashMap<String, Object>() {{                    
                    put("id", 2);
                    put("text", "Target 2");
                }});
        }});
        
        return "tooltip/api";
    }
}

