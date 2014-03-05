namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class DiagramShapeTests
    {
        private readonly DiagramShape shape;

        public DiagramShapeTests()
        {
            shape = new DiagramShape();
        }

        [Fact]
        public void Serializes_visual()
        {
            shape.Visual = new ClientHandlerDescriptor { HandlerName = "foo" };
            ((ClientHandlerDescriptor)shape.ToJson()["visual"]).HandlerName.ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_default_visual()
        {
            shape.ToJson().ContainsKey("visual").ShouldBeFalse();
        }
    }
}