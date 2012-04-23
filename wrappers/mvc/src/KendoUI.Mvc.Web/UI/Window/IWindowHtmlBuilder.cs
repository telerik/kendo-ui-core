

namespace KendoUI.Mvc.UI
{
    public interface IWindowHtmlBuilder
    {
        IHtmlNode WindowTag();

        IHtmlNode HeaderTag();

        IHtmlNode IconTag();

        IHtmlNode TitleTag();

        IHtmlNode ButtonContainerTag();

        IHtmlNode ButtonTag(IWindowButton button);

        IHtmlNode ContentTag();
    }
}
