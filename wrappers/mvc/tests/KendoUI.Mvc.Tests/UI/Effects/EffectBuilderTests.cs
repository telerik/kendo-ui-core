namespace Telerik.Web.Mvc.Tests.Effects
{

    using Telerik.Web.Mvc.UI;
    using Xunit;

	public class EffectBuilderTests
	{
        private IEffectContainer effects;

		private EffectsBuilder builder;

        public EffectBuilderTests()
		{
            effects = new Effects();

            builder = new EffectsBuilder(effects);
		}

        [Fact]
        public void Slide_method_should_add_slide_effect_to_container() 
        {
            builder.Slide();

            Assert.IsType(typeof(SlideAnimation), effects.Container[0]);
        }

        [Fact]
        public void Opacity_method_should_add_Opacity_effect_to_container()
        {
            builder.Opacity();
            var property = effects.Container[0] as PropertyAnimation;

            Assert.NotNull(property);
            Assert.Equal("Opacity", property.AnimationType.ToString());
        }

        [Fact]
        public void Expand_method_should_add_Height_effect_to_container()
        {
            builder.Expand();
            var property = effects.Container[0] as PropertyAnimation;

            Assert.NotNull(property);
            Assert.Equal("Height", property.AnimationType.ToString());
        }

        [Fact]
        public void Toggle_method_should_add_Toggle_effect_to_container()
        {
            builder.Toggle();

            Assert.IsType(typeof(ToggleEffect), effects.Container[0]);
        }

        [Fact]
        public void Adding_effects_preserves_order_in_the_collection()
        {
            builder.Slide().Opacity().Toggle().Expand();

            Assert.True(effects.Container[0] is SlideAnimation);
            Assert.True(effects.Container[1] is PropertyAnimation);
            Assert.True(effects.Container[2] is ToggleEffect);
            Assert.True(effects.Container[3] is PropertyAnimation);
        }

        [Fact]
        public void OpenDuration_method_should_add_OpenDuration_effect_to_container()
        {
            builder.OpenDuration(AnimationDuration.Normal);

            Assert.Equal(effects.OpenDuration, (int)AnimationDuration.Normal);
        }

        [Fact]
        public void CloseDuration_method_should_add_CloseDuration_effect_to_container()
        {
            builder.CloseDuration(AnimationDuration.Normal);

            Assert.Equal(effects.CloseDuration, (int)AnimationDuration.Normal);
        }
	}
}