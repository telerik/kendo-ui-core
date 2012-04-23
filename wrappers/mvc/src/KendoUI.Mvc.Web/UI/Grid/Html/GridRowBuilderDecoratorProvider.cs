namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.UI;
    using System;
    using System.Collections.Generic;

    internal class GridRowBuilderDecoratorProvider : IGridRowBuilderDecoratorProvider
    {
        private readonly IEnumerable<Func<IGridRowBuilderDecorator>> decorators;

        public GridRowBuilderDecoratorProvider(IEnumerable<Func<IGridRowBuilderDecorator>> decorators)
        {
            this.decorators = decorators;
        }

        public GridRowBuilderDecoratorProvider()
            : this(new List<Func<IGridRowBuilderDecorator>>
                       {
                           () => new GridDataRowBuilderDecorator(),
                           () => new GridGroupRowBuilderDecorator(),
                           () => new GridDetailRowBuilderDecorator(),
                           () => new GridAlternatingRowBuilderDecorator(),
                           () => new GridMasterRowBuilderDecorator(),
                           () => new GridEditRowBuilderDecorator(),
                           () => new GridSelectedRowBuilderDecorator()
                       })
        {
        }

        public IGridRowBuilder ApplyDecorators(IGridRowBuilder gridRowBuilder, GridItem item, bool hasDetailView)
        {
            var builderToDecorate = gridRowBuilder;
            foreach (var decorator in decorators)
            {
                var temp = decorator();
                temp.Decorate(builderToDecorate, item, hasDetailView);
                builderToDecorate = temp;
            }
            return builderToDecorate;
        }
    }
}