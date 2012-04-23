

namespace KendoUI.Mvc.UI.Tests
{
    using Xunit;

    public class ScriptWrapperTests
    {
        private readonly ScriptWrapper _wrapper;

        public ScriptWrapperTests()
        {
            _wrapper = new ScriptWrapper();
        }

        [Fact]
        public void OnPageLoadStart_should_be_not_blank()
        {
            Assert.NotNull(_wrapper.OnPageLoadStart);
            Assert.NotEqual(string.Empty, _wrapper.OnPageLoadStart);
        }

        [Fact]
        public void OnPageLoadEnd_should_not_be_blank()
        {
            Assert.NotNull(_wrapper.OnPageLoadEnd);
            Assert.NotEqual(string.Empty, _wrapper.OnPageLoadEnd);
        }

        [Fact]
        public void OnPageUnloadStart_should_not_be_blank()
        {
            Assert.NotNull(_wrapper.OnPageUnloadStart);
            Assert.NotEqual(string.Empty, _wrapper.OnPageUnloadStart);
        }

        [Fact]
        public void OnPageUnloadEnd_should_not_be_blank()
        {
            Assert.NotNull(_wrapper.OnPageUnloadEnd);
            Assert.NotEqual(string.Empty, _wrapper.OnPageUnloadEnd);
        }
    }
}