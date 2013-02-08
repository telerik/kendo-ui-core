package com.kendoui.spring.controllers.multiselect;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("multiselect-home-controller")
@RequestMapping(value="/web/multiselect/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        
        model.addAttribute("sizes", new String[] {
            "X-Small",
            "Small",
            "Medium",
            "Large",
            "X-Large",
            "2X-Large"
        });
        
        return "web/multiselect/index";
    }    
}