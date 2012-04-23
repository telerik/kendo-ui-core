namespace Telerik.Web.Mvc.Tests.Effects
{

    using Telerik.Web.Mvc.UI;
    using Xunit;

	public class SlideAnimationSerializationTests
	{
        private SlideAnimation slide;

        public SlideAnimationSerializationTests()
		{
            slide = new SlideAnimation();
		}

        [Fact]
        public void Slide_should_serialize_just_its_name() 
        {
            string serialized = slide.Serialize();

            Assert.Equal("{name:'slide'}", serialized);
        }
	}
}