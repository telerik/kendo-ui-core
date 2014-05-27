package com.kendoui.spring.controllers.menu;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("menu-direction-controller")
@RequestMapping(value="/menu/")
public class DirectionController {
    
    @RequestMapping(value = {"/direction"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("direction", "bottom");
        model.addAttribute("directions", getDirections());
               
        return "menu/direction";
    }
    
    @RequestMapping(value = {"/direction"}, method = RequestMethod.POST)
    public String direction(@RequestParam String direction, Model model) {
        
        if (direction == null) {
            direction = "bottom";
        }
        
        model.addAttribute("direction", direction);
        model.addAttribute("directions", getDirections());
               
        return "menu/direction";
    }
    
    private String[] getDirections() {
        return new String[] {
            "bottom",
            "left",
            "right",
            "top"
        };
    }
}