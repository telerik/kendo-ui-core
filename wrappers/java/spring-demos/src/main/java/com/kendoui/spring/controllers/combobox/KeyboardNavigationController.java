package com.kendoui.spring.controllers.combobox;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("combobox-navigation-controller")
@RequestMapping(value="/combobox/")
public class KeyboardNavigationController {
    
    @RequestMapping(value = {"/keyboard-navigation"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("sizes", new DropDownListItem[] {
                new DropDownListItem("X-Small", "1"),
                new DropDownListItem("Small", "2"),
                new DropDownListItem("Medium", "3"),
                new DropDownListItem("Large", "4"),
                new DropDownListItem("X-Large", "5"),
                new DropDownListItem("2X-Large", "6"),
        });
        return "combobox/keyboard-navigation";
    }    
}