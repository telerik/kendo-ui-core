package com.kendoui.spring.controllers.menu;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kendoui.spring.models.EmployeeDao;

@Controller("menu-context_menu-controller")
@RequestMapping(value="/menu/")
public class ContextMenuController {
    @Autowired
    private EmployeeDao user;

    @RequestMapping(value = {"/context-menu"}, method = RequestMethod.GET)
    public String index(Locale locale, Model model) {
        model.addAttribute("users", user.getList());

        return "/menu/context-menu";
    }
}
