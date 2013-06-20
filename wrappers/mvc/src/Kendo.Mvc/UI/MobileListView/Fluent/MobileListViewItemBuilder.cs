namespace Kendo.Mvc.UI.Fluent
{  
    using System.Web.Mvc;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the MobileListViewItem settings.
    /// </summary>
    public class MobileListViewItemBuilder : MobileListViewItemBuilderBase<MobileListViewItem, MobileListViewItemBuilder>, IHideObjectMembers        
    {
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public MobileListViewItemBuilder(MobileListViewItem item, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(item)
        {            
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        /// <summary>
        /// Builds nested MobileListView items.
        /// </summary>
        /// <param name="action">Action for declaratively building MobileListView items.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileListViewView()
        ///            .Name("View")
        ///            .Items(items => 
        ///            {
        ///                 items.Add().Text("Master Item")
        ///                     .Items(masterItem => 
        ///                     {
        ///                         masterItem.Add().Text("Inner Item 1");
        ///                         masterItem.Add().Text("Inner Item 2");
        ///                     });
        ///             })
        ///            .Render();
        /// %&gt;
        /// </code>
        public virtual MobileListViewItemBuilder Items(Action<MobileListViewItemFactory> action)
        {
            var factory = new MobileListViewItemFactory(Item.Items, viewContext, urlGenerator);

            action(factory);

            return this;
        }       
    }   
}
