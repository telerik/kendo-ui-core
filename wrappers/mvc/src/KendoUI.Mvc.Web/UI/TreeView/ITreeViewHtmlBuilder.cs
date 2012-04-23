

namespace KendoUI.Mvc.UI
{

    public interface ITreeViewHtmlBuilder
    {
        IHtmlNode TreeViewTag();

        IHtmlNode ItemTag(TreeViewItem item, bool hasAccessibleChildren);

        IHtmlNode ItemInnerContent(TreeViewItem item);

        IHtmlNode ItemHiddenInputValue(TreeViewItem item);

        IHtmlNode ItemContentTag(TreeViewItem item);

        IHtmlNode ChildrenTag(TreeViewItem item);
    }
}