namespace Kendo.Mvc.UI
{

    using Infrastructure;

    public class TreeViewHtmlBuilderFactory : ITreeViewHtmlBuilderFactory
    {
        private readonly IActionMethodCache actionMethodCache;

        public TreeViewHtmlBuilderFactory(IActionMethodCache actionMethodCache)
        {

            this.actionMethodCache = actionMethodCache;
        }

        public ITreeViewHtmlBuilder Create(TreeView treeView)
        {
            return new TreeViewHtmlBuilder(treeView, actionMethodCache);
        }
    }
}