namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;

    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;

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

            Assert.IsType(typeof(ZoomAnimation), effects.Container[0]);
        }
	}
}