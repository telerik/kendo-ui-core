namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using Moq;

    public class MockViewEngine : IDisposable
    {
        List<IViewEngine> oldEngines;

        public MockViewEngine()
        {
            oldEngines = ViewEngines.Engines.ToList();

            View = new Mock<IView>();

            Engine = new Mock<IViewEngine>();
            Engine.Setup(e => e.FindPartialView(It.IsAny<ControllerContext>(), It.IsAny<string>(), It.IsAny<bool>()))
                  .Returns(new ViewEngineResult(new string[] { }));

            ViewEngines.Engines.Clear();
            ViewEngines.Engines.Add(Engine.Object);
        }

        public void Dispose()
        {
            ViewEngines.Engines.Clear();

            foreach (IViewEngine engine in oldEngines)
            {
                ViewEngines.Engines.Add(engine);
            }
        }

        public Mock<IViewEngine> Engine { get; set; }

        public Mock<IView> View { get; set; }
    }
}
