namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using Xunit;

    public class WebApiDataSourceBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly WebApiDataSourceBuilder<Customer> builder;

        public WebApiDataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new WebApiDataSourceBuilder<Customer>(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void AutoSync_should_return_builder()
        {
            builder.AutoSync(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AutoSync_should_set_autosync()
        {
            builder.AutoSync(true);
            dataSource.AutoSync.ShouldEqual(true);
        }

        [Fact]
        public void Update_should_configure_update_options()
        {
            builder.Update(read => read.Url("url"));
            dataSource.Transport.Update.Url.ShouldEqual("url");
        }

        [Fact]
        public void Update_string_overload_should_configure_update_options()
        {
            builder.Update("url");
            dataSource.Transport.Update.Url.ShouldEqual("url");
        }

        [Fact]
        public void Destroy_should_configure_destroy_options()
        {
            builder.Destroy(read => read.Url("url"));
            dataSource.Transport.Destroy.Url.ShouldEqual("url");
        }

        [Fact]
        public void Destroy_string_overload_should_configure_destroy_options()
        {
            builder.Destroy("url");
            dataSource.Transport.Destroy.Url.ShouldEqual("url");
        }

        [Fact]
        public void Create_should_configure_create_options()
        {
            builder.Create(read => read.Url("url"));
            dataSource.Transport.Create.Url.ShouldEqual("url");
        }

        [Fact]
        public void Create_string_overload_should_configure_create_options()
        {
            builder.Create("url");
            dataSource.Transport.Create.Url.ShouldEqual("url");
        }
    }
}
