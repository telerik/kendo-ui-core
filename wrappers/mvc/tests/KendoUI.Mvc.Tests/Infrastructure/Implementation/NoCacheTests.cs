namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Xunit;
    
    public class NoCacheTests
    {
        private readonly NoCache cache;
        
        public NoCacheTests()
        {
            cache = new NoCache();
        }

        [Fact]
        public void Should_return_value_from_factory_method()
        {
            var value = cache.Get("key", () => "foo");
            Assert.Equal("foo", value);
        }

        [Fact]
        public void TryGetValue_should_always_return_false_and_set_null()
        {
            string value;
            
            var result = cache.TryGetValue("foo", out value);

            Assert.False(result);
            Assert.Null(value);
        }
    }
}
