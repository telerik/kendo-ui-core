namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;
    using Moq;

    public static class SchedulerEventControllerTestHelper
    {
        public static SchedulerEventController<SchedulerEvent> CreateController()
        {
            List<SchedulerEvent> data = new List<SchedulerEvent>() 
            { 
                new SchedulerEvent() 
                { 
                    Id = 1, 
                    Title = "Meeting",
                    Description = "Meeting with colegue",
                    AllDayEvent = true,
                    Start = new DateTime(2013, 1, 5), End = new DateTime(2013, 1, 5)
                },
                new SchedulerEvent() 
                {
                    Id = 2,
                    Title = "Trip",
                    Description = "Business trip to Germany",
                    AllDayEvent = true,
                    Start = new DateTime(2013, 1, 10),
                    End = new DateTime(2013, 1, 20)
                }
            };

            SchedulerEventController<SchedulerEvent> controller;

            controller = InitializeController(data);

            return controller;
        }

        public static SchedulerEventController<SchedulerEvent> CreateController(List<SchedulerEvent> data)
        {
            SchedulerEventController<SchedulerEvent> controller;

            controller = InitializeController(data);

            return controller;
        }

        private static SchedulerEventController<SchedulerEvent> InitializeController(List<SchedulerEvent> data)
        {
            SchedulerEventController<SchedulerEvent> controller;
            Mock<SchedulerEventController<SchedulerEvent>> controllerMock;
            SchedulerEventServiceDouble<SchedulerEvent> schedulerService;

            schedulerService = new SchedulerEventServiceDouble<SchedulerEvent>(data);

            controllerMock = new Mock<SchedulerEventController<SchedulerEvent>>(schedulerService) { CallBase = true };

            var server = new Mock<HttpServerUtilityBase>();
            server.Setup(s => s.MapPath(It.IsAny<string>())).Returns((string path) => path);

            var context = new Mock<ControllerContext>();
            context.SetupGet(c => c.HttpContext.Server).Returns(server.Object);

            controller = controllerMock.Object;
            controller.ControllerContext = context.Object;
            return controller;
        }
    }
}
