package com.kendoui.spring.controllers.menu;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.kendoui.spring.models.DropDownListItem;

@Controller("menu-orientation-controller")
@RequestMapping(value="/menu/")
public class OrientationController {
    
    @RequestMapping(value = {"/orientation"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("orientation", "horizontal");
        model.addAttribute("orientations", getOrientations());
               
        return "menu/orientation";
    }
    
    @RequestMapping(value = {"/orientation"}, method = RequestMethod.POST)
    public String index(@RequestParam String orientation, Model model) {
        
        model.addAttribute("orientation", orientation);
        model.addAttribute("orientations", getOrientations());
               
        return "menu/orientation";
    }
    
    private DropDownListItem[] getOrientations() {
        return new DropDownListItem[] {
            new DropDownListItem("Horizontal", "horizontal"),
            new DropDownListItem("Vertical", "vertical")
        };
    }
}
