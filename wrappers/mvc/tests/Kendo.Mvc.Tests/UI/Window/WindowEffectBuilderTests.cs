namespace Kendo.Mvc.UI.Tests
{
    using Xunit;

    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;

    public class WindowEffectBuilderTests
    {
        private IEffectContainer effects;

        private WindowEffectsBuilder builder;

        public WindowEffectBuilderTests()
        {
            effects = new Effects();

            builder = new WindowEffectsBuilder(effects);
        }

        [Fact]
        public void Zoom_method_should_add_zoom_effect_to_container() 
        {
            builder.Zoom();

            effects.Container[0].ShouldBeType(typeof(ZoomAnimation));
        }
    }
}