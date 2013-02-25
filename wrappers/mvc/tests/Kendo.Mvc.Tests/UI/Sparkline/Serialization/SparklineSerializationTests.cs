namespace Kendo.Mvc.UI.Tests.Chart
{
    using Moq;
    using System.IO;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc;
    using Kendo.Mvc.UI;
    using Xunit;
    using Kendo.Mvc.Infrastructure;
    using System;

    public class SparklineSerializationTests
    {
        private readonly Sparkline<Object> sparkline;
        private readonly Mock<TextWriter> textWriter;
        private string output;

        public SparklineSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            var urlGeneratorMock = new Mock<IUrlGenerator>();
            urlGeneratorMock.Setup(g => g.Generate(It.IsAny<RequestContext>(), It.IsAny<INavigatable>()))
                .Returns<RequestContext, INavigatable>(
                    (context, navigatable) =>
                        navigatable.Url ?? navigatable.ControllerName + "/" + navigatable.ActionName
                );

            var viewContext = TestHelper.CreateViewContext();
            sparkline = new Sparkline<Object>(viewContext, new JavaScriptInitializer(), urlGeneratorMock.Object);
            sparkline.Name = "Sparkline";
        }

        [Fact]
        public void Default_configuration_outputs_empty_kendoSparkline_init()
        {
            sparkline.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Sparkline\").kendoSparkline({});");
        }

        [Fact]
        public void Type_is_serialized()
        {
            sparkline.Type = SparklineType.Bullet;
            sparkline.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("\"type\":\"bullet\"");
        }

        [Fact]
        public void Default_Type_is_not_serialized()
        {
            sparkline.WriteInitializationScript(textWriter.Object);

            output.ShouldNotContain("\"type\"");
        }

        [Fact]
        public void PointWidth_is_serialized()
        {
            sparkline.PointWidth = 4;
            sparkline.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("\"pointWidth\":4");
        }

        [Fact]
        public void Default_PointWidth_is_not_serialized()
        {
            sparkline.WriteInitializationScript(textWriter.Object);

            output.ShouldNotContain("\"pointWidth\"");
        }

        [Fact]
        public void Data_is_serialized()
        {
            sparkline.Data = new object[] { 1, 2 };
            sparkline.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("\"data\":[1,2]");
        }

        [Fact]
        public void Empty_Data_is_not_serialized()
        {
            sparkline.WriteInitializationScript(textWriter.Object);

            output.ShouldNotContain("\"data\"");
        }
    }
}
