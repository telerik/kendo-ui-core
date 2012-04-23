
namespace KendoUI.Mvc.UI.Html
{
    using System.Collections.Generic;

    public interface IGridTableBuilder
    {
        IHtmlNode CreateTable();
        ICollection<IGridTableBuilderDecorator> Decorators { get; }
    }
}