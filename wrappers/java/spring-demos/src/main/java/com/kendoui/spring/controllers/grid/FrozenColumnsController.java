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

@Controller("grid-frozen-columns-controller")
@RequestMapping(value="/grid/")
public class FrozenColumnsController {
    @Autowired 
    private OrderDao order;

    @RequestMapping(value = "/frozen-columns", method = RequestMethod.GET)
    public String index() {
        return "grid/frozen-columns";
    }
    
    @RequestMapping(value = "/frozen-columns/read", method = RequestMethod.POST)
    public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {
        return order.getList(request);
    }
}