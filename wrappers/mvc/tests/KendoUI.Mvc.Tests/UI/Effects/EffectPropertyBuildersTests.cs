namespace Telerik.Web.Mvc.Tests.Effects
{

    using Telerik.Web.Mvc.UI;
    using Xunit;

	public class EffectPropertyBuildersTests
	{
        SlideAnimation slide;
		AnimationBuilder slideBuilder;
        

        PropertyAnimation property;
        AnimationBuilder propertyBuilder;

		public EffectPropertyBuildersTests()
		{
			slide = new SlideAnimation();
            slideBuilder = new AnimationBuilder(slide);

            property = new PropertyAnimation();
            propertyBuilder = new AnimationBuilder(property);
		}

		[Fact]
        public void OpenDuration_method_sets_OpenDuration_property_slide_animation()
		{
			slideBuilder
				.OpenDuration(AnimationDuration.Slow);

			Assert.Equal((int)AnimationDuration.Slow, slide.OpenDuration);
		}

		[Fact]
        public void CloseDuration_method_sets_CloseDuration_property_slide_animation()
		{
			slideBuilder
				.CloseDuration(AnimationDuration.Fast);

			Assert.Equal((int)AnimationDuration.Fast, slide.CloseDuration);
		}

		[Fact]
        public void OpenDuration_method_sets_OpenDuration_property_of_property_animation()
		{
			propertyBuilder
				.OpenDuration(AnimationDuration.Slow);

			Assert.Equal((int)AnimationDuration.Slow, property.OpenDuration);
		}

		[Fact]
        public void CloseDuration_method_sets_CloseDuration_property_of_property_animation()
		{
            propertyBuilder
				.CloseDuration(AnimationDuration.Fast);

            Assert.Equal((int)AnimationDuration.Fast, property.CloseDuration);
		}
	}
}