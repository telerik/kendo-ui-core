package com.kendoui.spring.controllers.dropdownlist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dropdownlist-navigation-controller")
@RequestMapping(value="/web/dropdownlist/")
public class NavigationController {
    
    @RequestMapping(value = {"/navigation"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("sizes", new String[] {
            "S - 6 3/4\"",
            "M - 7 1/4\"",
            "L - 7 1/8\"",
            "XL - 7 5/8\""
        });
        
        return "web/dropdownlist/navigation";
    }    
}