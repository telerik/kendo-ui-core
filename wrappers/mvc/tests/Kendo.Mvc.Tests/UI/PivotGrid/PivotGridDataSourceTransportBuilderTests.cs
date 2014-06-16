namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotGridDataSourceTransportBuilderTests
    {
        private readonly PivotGridTransport transport;
        private readonly PivotGridDataSourceTransportBuilder builder;

        public PivotGridDataSourceTransportBuilderTests()
        {
            transport = new PivotGridTransport();
            builder = new PivotGridDataSourceTransportBuilder(transport, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Read_should_return_builder()
        {
            builder.Read(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_should_configure_read_options()
        {
            string url = "discoveryName";
            builder.Read(read => read.Url(url));
            transport.Read.Url.ShouldEqual(url);
        }

        [Fact]
        public void Connection_should_return_builder()
        {
            builder.Connection(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Connection_should_configure_connection_options()
        {
            string cubeName = "cubeName";
            builder.Connection(c => c.Cube(cubeName));
            transport.Connection.Cube.ShouldEqual(cubeName);
        }

        [Fact]
        public void Discovery_should_return_builder()
        {
            builder.Discovery(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Discovery_should_configure_discovery_options()
        {
            string discovery = "discoveryName";
            builder.Discovery(c => c.Url(discovery));
            transport.Discovery.Url.ShouldEqual(discovery);
        }
    }
}
