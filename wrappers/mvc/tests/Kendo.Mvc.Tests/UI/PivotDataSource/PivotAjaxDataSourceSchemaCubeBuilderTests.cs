namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;
    using System.Linq;

    public class PivotAjaxDataSourceSchemaCubeBuilderTests
    {
        private readonly PivotDataSourceSchemaCube cube;
        private readonly PivotAjaxDataSourceSchemaCubeBuilder<object> builder;

        public PivotAjaxDataSourceSchemaCubeBuilderTests()
        {
            cube = new PivotDataSourceSchemaCube();
            builder = new PivotAjaxDataSourceSchemaCubeBuilder<object>(cube);
        }

        [Fact]
        public void Measures_should_return_builder()
        {
            builder.Measures(e => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Measures_should_configure_measures_options()
        {
            string value = "Custom";
            builder.Measures(m => m.Add(value).Caption(value));
            cube.Measures.ElementAt(0).Measure.ShouldEqual(value);
        }

        [Fact]
        public void Dimensions_should_return_builder()
        {
            builder.Dimensions(c => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Dimensions_should_configure_measures_options()
        {
            string value = "Custom";
            builder.Dimensions(m => m.Add(value).Caption(value));
            cube.Dimensions.ElementAt(0).Member.ShouldEqual(value);
        }
    }
}
