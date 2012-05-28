namespace Kendo.Mvc.UI.Html.Tests
{
    using System.Collections.Generic;
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridRowBuilderFactoryTests
    {
        private readonly GridRowBuilderFactory factory;
        private readonly GridRenderingData renderingData;
        private readonly Mock<IGridCellBuilderFactory> cellBuilderFactory;
        private readonly Mock<IGridRowBuilderDecoratorProvider> decoratorsProvider;

        public GridRowBuilderFactoryTests()
        {
            cellBuilderFactory = new Mock<IGridCellBuilderFactory>();
            decoratorsProvider = new Mock<IGridRowBuilderDecoratorProvider>();
            decoratorsProvider.Setup(p => p.ApplyDecorators(It.IsAny<IGridRowBuilder>(), It.IsAny<GridItem>(), It.IsAny<bool>()))
                .Returns((IGridRowBuilder b, GridItem item, bool hasDetailView) => b);

            factory = new GridRowBuilderFactory(new Mock<IGridTableBulderFactory>().Object, cellBuilderFactory.Object, decoratorsProvider.Object);
            renderingData = new GridRenderingData
            {
                Columns = new IGridColumn[0],
                Localization = new Mock<IGridLocalization>().Object,
                UrlBuilder = new Mock<IGridUrlBuilder>().Object,
                GroupMembers = new string[0],
                Callback = delegate { },
              //  EditFormHtmlAttributes = new Dictionary<string, object>(),
                Aggregates = new AggregateFunction[0]
            };
        }

        [Fact]
        public void Should_return_data_row_builder()
        {
            var builder = factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.DataRow });
            builder.ShouldBeType<GridDataRowBuilder>();
        }

        [Fact]
        public void Should_return_template_row_builder_if_row_template_is_set()
        {
            renderingData.RowTemplate = delegate { };

            var builder = factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.DataRow });
            builder.ShouldBeType<GridTemplateRowBuilder>();
        }

        [Fact]
        public void Should_return_inline_edit_row_builder()
        {
            var builder = factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.EditRow });
            builder.ShouldBeType<GridInLineEditRowBuilder>();
        }

        [Fact]
        public void Should_return_inform_edit_row_builder()
        {
            renderingData.EditMode = GridEditMode.InForm;
            var builder = factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.EditRow });
            builder.ShouldBeType<GridInFormEditRowBuilder>();
        }

        [Fact]
        public void Should_return_data_row_builder_when_editing_mode_is_popup()
        {
            renderingData.EditMode = GridEditMode.PopUp;
            var builder = factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.EditRow });
            builder.ShouldBeType<GridPopUpEditRowBuilder>();
        }

        [Fact]
        public void Should_return_detail_row_builder()
        {
            var builder = factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.DetailRow });
            builder.ShouldBeType<GridDetailRowBuilder>();
        }        
        
        [Fact]
        public void Should_return_empty_row_builder()
        {
            var builder = factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.EmptyRow});
            builder.ShouldBeType<GridEmptyRowBuilder>();
        }

        [Fact]
        public void Should_return_row_builder_for_header_item()
        {
            var builder = factory.CreateHeaderBuilder(renderingData);
            builder.ShouldBeType<GridRowBuilder>();
        }

        [Fact]
        public void Should_return_row_builder_for_footer_item()
        {
            var builder = factory.CreateFooterBuilder(renderingData);
            builder.ShouldBeType<GridRowBuilder>();
        }

        [Fact]
        public void Should_call_decorator_provider_for_header_items()
        {
            factory.CreateHeaderBuilder(renderingData);
            decoratorsProvider.Verify(dp => dp.ApplyDecorators(It.IsAny<GridRowBuilder>(), It.IsAny<GridItem>(),It.IsAny<bool>()), Times.Once());
        }

        [Fact]
        public void Should_call_decorator_provider_for_footer_items()
        {
            factory.CreateFooterBuilder(renderingData);
            decoratorsProvider.Verify(dp => dp.ApplyDecorators(It.IsAny<GridRowBuilder>(), It.IsAny<GridItem>(), It.IsAny<bool>()), Times.Once());
        }

        [Fact]
        public void Should_return_group_footer_row_builder()
        {
            var group = new Mock<AggregateFunctionsGroup> {CallBase = true};
            var builder = factory.CreateBuilder(renderingData, new GridItem { DataItem = group.Object,Type = GridItemType.GroupFooterRow });
            builder.ShouldBeType<GridGroupFooterRowBuilder>();
        }

        [Fact]
        public void Should_not_call_callback_if_item_is_empty_row()
        {
            var called = false;
            var data = new GridRenderingData
            {
                Callback = item => called = true
            };

            factory.CreateBuilder(data, new GridItem {Type = GridItemType.EmptyRow});

            called.ShouldBeFalse();
        }

        [Fact]
        public void Should_not_call_callback_if_item_is_detail_row()
        {
            var called = false;
            renderingData.Callback = item => called = true;

            factory.CreateBuilder(renderingData, new GridItem { Type = GridItemType.DetailRow });

            called.ShouldBeFalse();
        }

        [Fact]
        public void Should_not_call_callback_if_item_is_group_row()
        {
            var called = false;
            renderingData.Callback = item => called = true;

            var group = new Mock<AggregateFunctionsGroup> { CallBase = true };
            factory.CreateBuilder(renderingData, new GridItem { DataItem = group.Object, Type = GridItemType.GroupRow });

            called.ShouldBeFalse();
        }

        [Fact]
        public void Should_not_call_callback_if_item_is_group_footer_row()
        {
            var called = false;
            renderingData.Callback = item => called = true;

            var group = new Mock<AggregateFunctionsGroup> { CallBase = true };
            factory.CreateBuilder(renderingData, new GridItem { DataItem = group.Object, Type = GridItemType.GroupFooterRow });

            called.ShouldBeFalse();
        }
    }
}
