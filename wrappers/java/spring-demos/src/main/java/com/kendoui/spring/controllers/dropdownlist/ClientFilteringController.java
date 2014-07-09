package com.kendoui.spring.controllers.dropdownlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.ProductDao;

@Controller("dropdownlist-clientfiltering-controller")
@RequestMapping(value="/dropdownlist/")
public class ClientFilteringController {
    @Autowired 
    private ProductDao product;

    @RequestMapping(value = "/clientfiltering", method = RequestMethod.GET)
    public String index(Model model) {
        model.addAttribute("products", product.getList());
        return "dropdownlist/clientfiltering";
    }
}