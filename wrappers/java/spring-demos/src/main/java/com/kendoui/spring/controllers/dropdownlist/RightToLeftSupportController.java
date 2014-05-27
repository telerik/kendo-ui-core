package com.kendoui.spring.controllers.dropdownlist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.DropDownListItem;

@Controller("dropdownlist-rtl-controller")
@RequestMapping(value="/dropdownlist/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = {"/right-to-left-support"}, method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("items", new DropDownListItem[] {
                new DropDownListItem("Item 1", "1"),
                new DropDownListItem("Item 2", "2"),
                new DropDownListItem("Item 3", "3")
        });       
        return "dropdownlist/right-to-left-support";
    }    
}