package com.kendoui.spring.controllers.dropdownlist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("dropdownlist-home-controller")
@RequestMapping(value="/dropdownlist/")
public class IndexController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("colors", new DropDownListItem[] {
                new DropDownListItem("Black", "1"),
                new DropDownListItem("Orange", "2"),
                new DropDownListItem("Grey", "3")
        });
        
        model.addAttribute("sizes", new String[] {
            "S - 6 3/4\"",
            "M - 7 1/4\"",
            "L - 7 1/8\"",
            "XL - 7 5/8\""
        });
        
        return "dropdownlist/index";
    }    
}