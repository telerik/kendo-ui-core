

namespace KendoUI.Mvc.Extensions.Tests
{
    using Xunit;

    public class HttpContextBaseExtensionsTests
    {
        [Fact]
        public void RequestContext_should_return_new_context()
        {
            TestHelper.RegisterDummyRoutes();

            Assert.NotNull(TestHelper.CreateMockedHttpContext().Object.RequestContext());
        }
    }
}