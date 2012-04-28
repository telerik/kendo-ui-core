namespace KendoUI.Mvc.Infrastructure.Implementation.Tests
{
    using System.Configuration;

    using Xunit;

    public class ConfigurationManagerWrapperTests
    {
        private readonly ConfigurationManagerWrapper _configurationManagerWrapper;

        public ConfigurationManagerWrapperTests()
        {
            _configurationManagerWrapper = new ConfigurationManagerWrapper();
        }

        [Fact]
        public void GetSection_should_return_null_when_config_file_is_missing()
        {
            Assert.Null(_configurationManagerWrapper.GetSection<ConnectionStringsSection>("foo"));
        }
    }
}