namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using Xunit;
    
    public class CacheTests
    {
        private readonly Cache cache;
        private readonly Mock<ICacheProvider> provider;
        private const string Key = "key";
        private const string Value = "value";
        private const string Prefix = "prefix";

        public CacheTests()
        {
            provider = new Mock<ICacheProvider>();
            cache = new Cache(Prefix, provider.Object);
        }

        [Fact]
        public void Should_get_from_cache_provider()
        {
            provider.Setup(p => p.Get(cache.Prefix(Key))).Returns(Value);

            Assert.Equal(Value, cache.Get<string>(Key, null));
        }
        
        [Fact]
        public void Should_call_factory_if_provider_returns_null()
        {
            Assert.Equal(Value, cache.Get(Key, () => Value));
        }

        [Fact]
        public void Should_store_in_provider_value_returned_from_factory()
        {
            provider.Setup(p => p.Insert(cache.Prefix(Key), Value));

            cache.Get<string>(Key, () => Value);

            provider.VerifyAll();
        }

        [Fact]
        public void Insert_calls_underlying_provider()
        {
            provider.Setup(p => p.Insert(cache.Prefix(Key), Value));

            cache.Insert(Key, Value);

            provider.VerifyAll();
        }        
        
        [Fact]
        public void TryGetValue_returns_false_and_sets_result_to_default_if_provider_return_null()
        {
            string value;
            
            provider.Setup(p => p.Get(It.IsAny<string>())).Returns(null);

            var result = cache.TryGetValue("foo", out value);

            Assert.False(result);
            Assert.Null(value);
        }        
        
        [Fact]
        public void TryGetValue_returns_true_and_sets_result_to_whatever_the_provider_returns()
        {
            string value;
            
            provider.Setup(p => p.Get(cache.Prefix(Key))).Returns(Value);

            var result = cache.TryGetValue(Key, out value);

            Assert.True(result);
            Assert.Equal(Value, value);
        }
    }
}
