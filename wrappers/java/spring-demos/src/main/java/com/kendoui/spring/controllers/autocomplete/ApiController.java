package com.kendoui.spring.controllers.autocomplete;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("autocomplete-api-controller")
@RequestMapping(value="/autocomplete/")
public class ApiController {
    
    @RequestMapping(value = {"api"}, method = RequestMethod.GET)
    public String index(Model model) {
        String[] colors = {
            "Red-violet",
            "Red",
            "Red-orange",
            "Orange",
            "Yellow-orange",
            "Yellow",
            "Yellow-green",
            "Green",
            "Blue-green",
            "Blue",
            "Blue-violet",
            "Violet"
        };
        
        model.addAttribute("colors", colors);
        
        return "autocomplete/api";
    }
}