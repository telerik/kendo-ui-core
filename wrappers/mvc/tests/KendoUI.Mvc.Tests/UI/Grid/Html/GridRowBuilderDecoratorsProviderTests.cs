namespace KendoUI.Mvc.UI.Html.Tests
{
    using System;
    using Moq;
    using Html;
    using Xunit;

    public class GridRowBuilderDecoratorsProviderTests
    {
        private readonly GridRowBuilderDecoratorProvider decoratorProvider;
        private readonly Mock<IGridRowBuilderDecorator> rowDecorator;

        public GridRowBuilderDecoratorsProviderTests()
        {
            rowDecorator = new Mock<IGridRowBuilderDecorator>();
            decoratorProvider = new GridRowBuilderDecoratorProvider(new Func<IGridRowBuilderDecorator>[]
                                                                         {
                                                                             () => rowDecorator.Object
                                                                         });
        }

        [Fact]
        public void Should_decorate_the_given_row_builder()
        {
            var rowBuilder = new Mock<IGridRowBuilder>().Object;
            decoratorProvider.ApplyDecorators(rowBuilder, new GridItem(), false);
            rowDecorator.Verify(d => d.Decorate(rowBuilder, It.IsAny<GridItem>(), false), Times.Once());
        }
    }
}