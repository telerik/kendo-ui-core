package com.kendoui.spring.controllers.grid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.DataSourceRequest;
import com.kendoui.spring.models.DataSourceResult;
import com.kendoui.spring.models.OrderDao;

@Controller("grid-column-menu-controller")
@RequestMapping(value="/grid/")
public class ColumnMenuController {
    @Autowired 
    private OrderDao order;

    @RequestMapping(value = "/column-menu", method = RequestMethod.GET)
    public String index() {
        return "grid/column-menu";
    }
    
    @RequestMapping(value = "/column-menu/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        return order.getList(request);
    }
}