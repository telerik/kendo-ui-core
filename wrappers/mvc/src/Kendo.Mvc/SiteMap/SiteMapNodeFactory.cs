namespace Kendo.Mvc
{
    using Infrastructure;

    /// <summary>
    /// Defines a factory that is used to create <see cref="SiteMapNode"/>.
    /// </summary>
    public class SiteMapNodeFactory : IHideObjectMembers
    {
        private readonly SiteMapNode parent;

        /// <summary>
        /// Initializes a new instance of the <see cref="SiteMapNodeFactory"/> class.
        /// </summary>
        /// <param name="parent">The parent.</param>
        public SiteMapNodeFactory(SiteMapNode parent)
        {

            this.parent = parent;
        }

        /// <summary>
        /// Adds this instance.
        /// </summary>
        /// <returns></returns>
        public SiteMapNodeBuilder Add()
        {
            SiteMapNode node = new SiteMapNode();

            parent.ChildNodes.Add(node);

            return new SiteMapNodeBuilder(node);
        }
    }
}