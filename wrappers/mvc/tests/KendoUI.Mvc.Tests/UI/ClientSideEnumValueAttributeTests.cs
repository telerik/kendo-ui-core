

namespace KendoUI.Mvc.UI.Tests
{
    using Xunit;

    public class ClientSideEnumValueAttributeTests
    {
        private readonly ClientSideEnumValueAttribute _attribute;

        public ClientSideEnumValueAttributeTests()
        {
            _attribute = new ClientSideEnumValueAttribute("foo");
        }

        [Fact]
        public void Value_should_be_same_which_is_passed_in_constructor()
        {
            Assert.Equal("foo", _attribute.Value);
        }
    }
}