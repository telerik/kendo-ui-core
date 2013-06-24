namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;
    using Moq;

    //public static class SchedulerEventControllerTestHelper
    //{
    //    public static SchedulerEventController<SchedulerEventDouble> CreateController()
    //    {
    //        List<SchedulerEventDouble> data = new List<SchedulerEventDouble>() 
    //        { 
    //            new SchedulerEventDouble() 
    //            { 
    //                Id = 1, 
    //                Title = "Meeting",
    //                Description = "Meeting with colegue",
    //                IsAllDay = true,
    //                Start = new DateTime(2013, 1, 5), End = new DateTime(2013, 1, 5)
    //            },
    //            new SchedulerEventDouble() 
    //            {
    //                Id = 2,
    //                Title = "Trip",
    //                Description = "Business trip to Germany",
    //                IsAllDay = true,
    //                Start = new DateTime(2013, 1, 10),
    //                End = new DateTime(2013, 1, 20)
    //            }
    //        };

    //        SchedulerEventController<SchedulerEventDouble> controller;

    //        controller = InitializeController(data);

    //        return controller;
    //    }

    //    public static SchedulerEventController<SchedulerEventDouble> CreateController(List<SchedulerEventDouble> data)
    //    {
    //        SchedulerEventController<SchedulerEventDouble> controller;

    //        controller = InitializeController(data);

    //        return controller;
    //    }

    //    private static SchedulerEventController<SchedulerEventDouble> InitializeController(List<SchedulerEventDouble> data)
    //    {
    //        SchedulerEventController<SchedulerEventDouble> controller;
    //        Mock<SchedulerEventController<SchedulerEventDouble>> controllerMock;
    //        SchedulerEventServiceDouble<SchedulerEventDouble> schedulerService;

    //        schedulerService = new SchedulerEventServiceDouble<SchedulerEventDouble>(data);

    //        controllerMock = new Mock<SchedulerEventController<SchedulerEventDouble>>(schedulerService) { CallBase = true };

    //        var server = new Mock<HttpServerUtilityBase>();
    //        server.Setup(s => s.MapPath(It.IsAny<string>())).Returns((string path) => path);

    //        var context = new Mock<ControllerContext>();
    //        context.SetupGet(c => c.HttpContext.Server).Returns(server.Object);

    //        controller = controllerMock.Object;
    //        controller.ControllerContext = context.Object;
    //        return controller;
    //    }
    //}
}
