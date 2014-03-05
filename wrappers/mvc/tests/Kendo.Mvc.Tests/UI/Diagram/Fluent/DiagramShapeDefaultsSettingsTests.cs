namespace Kendo.Mvc.UI.Tests.Map.Fluent
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;
    using System;

    public class DiagramShapeDefaultsSettingsBuilderTests
    {
        private readonly DiagramShapeDefaultsSettings settings;
        private readonly DiagramShapeDefaultsSettingsBuilder builder;
        private readonly Func<object, object> nullFunc;

        public DiagramShapeDefaultsSettingsBuilderTests()
        {
            settings = new DiagramShapeDefaultsSettings();
            builder = new DiagramShapeDefaultsSettingsBuilder(settings);
            nullFunc = (o) => null;
        }

        [Fact]
        public void Visual_should_set_visual()
        {
            builder.Visual("foo");
            settings.Visual.HandlerName.ShouldEqual("foo");
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
            settings.Visual.ShouldNotBeNull();
        }

        [Fact]
        public void Visual_with_Func_should_return_builder()
        {
            builder.Visual(nullFunc).ShouldBeSameAs(builder);
        }
    }
}