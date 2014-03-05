namespace Kendo.Mvc.UI.Tests.Map.Fluent
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;
    using System;

    public class DiagramShapeBuilderTests
    {
        private readonly DiagramShape shape;
        private readonly DiagramShapeBuilder builder;
        private readonly Func<object, object> nullFunc;

        public DiagramShapeBuilderTests()
        {
            shape = new DiagramShape();
            builder = new DiagramShapeBuilder(shape);
            nullFunc = (o) => null;
        }

        [Fact]
        public void Visual_should_set_visual()
        {
            builder.Visual("foo");
            shape.Visual.HandlerName.ShouldEqual("foo");
        }

        [Fact]
        public void Visual_should_return_builder()
        {
            builder.Visual("foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Visual_with_Func_should_set_InlineCodeBlock()
        {
            builder.Visual(nullFunc);
            shape.Visual.ShouldNotBeNull();
        }

        [Fact]
        public void Visual_with_Func_should_return_builder()
        {
            builder.Visual(nullFunc).ShouldBeSameAs(builder);
        }
    }
}