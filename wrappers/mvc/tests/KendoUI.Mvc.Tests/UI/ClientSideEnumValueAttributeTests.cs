// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
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