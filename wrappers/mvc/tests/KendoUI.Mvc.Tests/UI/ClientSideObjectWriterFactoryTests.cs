

namespace KendoUI.Mvc.UI.Tests
{
    using System.IO;

    using Moq;
    using Xunit;

    public class ClientSideObjectWriterFactoryTests
    {
        [Fact]
        public void Create_should_return_correct_instance()
        {
            IClientSideObjectWriterFactory factory = new ClientSideObjectWriterFactory();
            IClientSideObjectWriter writer = factory.Create("foo", "bar", new Mock<TextWriter>().Object);

            Assert.NotNull(writer);
            Assert.IsType<ClientSideObjectWriter>(writer);
        }
    }
}