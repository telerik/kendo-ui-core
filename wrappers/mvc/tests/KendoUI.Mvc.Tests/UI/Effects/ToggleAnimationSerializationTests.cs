namespace Telerik.Web.Mvc.Tests.Effects
{

    using Telerik.Web.Mvc.UI;
    using Xunit;

	public class ToggleAnimationSerializationTests
	{
        private ToggleEffect toggle;

        public ToggleAnimationSerializationTests()
		{
            toggle = new ToggleEffect();
		}

        [Fact]
        public void Toggle_should_serialize_just_its_name() 
        {
            string serialized = toggle.Serialize();

            Assert.Equal("{name:'toggle'}", serialized);
        }
	}
}