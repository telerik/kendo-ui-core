package com.kendoui.spring.controllers.diagram;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kendoui.spring.models.OrgChartConnection;
import com.kendoui.spring.models.OrgChartConnectionDao;
import com.kendoui.spring.models.OrgChartShape;
import com.kendoui.spring.models.OrgChartShapeDao;

@Controller("dataviz-diagram-editing-controller")
@RequestMapping(value="/diagram/")
public class EditingController {
    @Autowired
    private OrgChartShapeDao orgShape;
    @Autowired
    private OrgChartConnectionDao orgConnection;

    @RequestMapping(value = "editing", method = RequestMethod.GET)
    public String index() {
        return "/diagram/editing";
    }

    @RequestMapping(value = "/editing/read", method = RequestMethod.POST)
    public @ResponseBody List<OrgChartShape> read() {
        return orgShape.getList();
    }

    @RequestMapping(value = "/editing/update", method = RequestMethod.POST)
    public @ResponseBody OrgChartShape update(@RequestBody Map<String, Object> model) {
        OrgChartShape target = new OrgChartShape();

        target.setId((int)model.get("id"));
        target.setFirstName((String)model.get("firstName"));
        target.setLastName((String)model.get("lastName"));
        target.setTitle((String)(model.get("title")));
        target.setImage((String)model.get("image"));
        target.setColorScheme((String)model.get("colorScheme"));

        orgShape.saveOrUpdate(target);

        return target;
    }

    @RequestMapping(value = "/editing/create", method = RequestMethod.POST)
    public @ResponseBody OrgChartShape create(@RequestBody Map<String, Object> model) {
        OrgChartShape target = new OrgChartShape();

        target.setFirstName((String)model.get("firstName"));
        target.setLastName((String)model.get("lastName"));
        target.setTitle((String)(model.get("title")));
        target.setImage((String)model.get("image"));
        target.setColorScheme((String)model.get("colorScheme"));

        orgShape.saveOrUpdate(target);

        return target;
    }

    @RequestMapping(value = "/editing/destroy", method = RequestMethod.POST)
    public @ResponseBody OrgChartShape destroy(@RequestBody Map<String, Object> model) {
        OrgChartShape target = new OrgChartShape();

        target.setId((int)model.get("id"));

        orgShape.delete(target);

        return target;
    }

    @RequestMapping(value = "/editing/readConnections", method = RequestMethod.POST)
    public @ResponseBody List<OrgChartConnection> readConnections() {
        return orgConnection.getList();
    }

    @RequestMapping(value = "/editing/updateConnection", method = RequestMethod.POST)
    public @ResponseBody OrgChartConnection updateConnection(@RequestBody Map<String, Object> model) {
        OrgChartConnection target = new OrgChartConnection();

        target.setId((int)model.get("id"));
        target.setFrom((Integer)model.get("from"));
        target.setTo((Integer)model.get("to"));
        target.setText((String)(model.get("text")));

        orgConnection.saveOrUpdate(target);

        return target;
    }

    @RequestMapping(value = "/editing/createConnection", method = RequestMethod.POST)
    public @ResponseBody OrgChartConnection createConnection(@RequestBody Map<String, Object> model) {
        OrgChartConnection target = new OrgChartConnection();

        target.setFrom((Integer)model.get("from"));
        target.setTo((Integer)model.get("to"));
        target.setText((String)(model.get("text")));

        orgConnection.saveOrUpdate(target);

        return target;
    }

    @RequestMapping(value = "/editing/destroyConnection", method = RequestMethod.POST)
    public @ResponseBody OrgChartConnection destroyConnection(@RequestBody Map<String, Object> model) {
        OrgChartConnection target = new OrgChartConnection();

        target.setId((int)model.get("id"));

        orgConnection.delete(target);

        return target;
    }
}
