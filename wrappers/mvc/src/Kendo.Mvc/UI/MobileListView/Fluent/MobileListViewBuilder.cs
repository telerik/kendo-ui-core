namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileListViewBuilder<T> : WidgetBuilderBase<MobileListView<T>, MobileListViewBuilder<T>>, IHideObjectMembers where T : class
    {        
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileListView{T}"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileListViewBuilder(MobileListView<T> component)
            : base(component)
        {            
        }

        /// <summary>
        /// Binds the MobileListView to a list of objects
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileListView&lt;Order&gt;()
        ///             .Name("Orders")        
        ///             .BindTo((IEnumerable&lt;Order&gt;)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public MobileListViewBuilder<T> BindTo(IEnumerable<T> dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Binds the MobileListView to a list of objects
        /// </summary>
        /// <typeparam name="T">The type of the data item</typeparam>
        /// <param name="dataSource">The data source.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileListView&lt;Order&gt;()
        ///             .Name("Orders")        
        ///             .BindTo((IEnumerable)ViewData["Orders"]);
        /// %&gt;
        /// </code>
        /// </example>
        public MobileListViewBuilder<T> BindTo(IEnumerable dataSource)
        {
            Component.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// Used in combination with pullToRefresh. If set to true, newly loaded data will be appended on top when refershing.
        /// </summary>
        /// <param name="value">The value that configures the appendonrefresh.</param>
        public MobileListViewBuilder<T> AppendOnRefresh(bool value)
        {
            Component.AppendOnRefresh = value;

            return this;
        }
        
        /// <summary>
        /// Indicates whether the listview will call read on the DataSource initially.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public MobileListViewBuilder<T> AutoBind(bool value)
        {
            Component.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// Instance of DataSource or the data that the mobile ListView will be bound to.
        /// </summary>
        /// <param name="value">The value that configures the datasource.</param>
        public MobileListViewBuilder<T> DataSource(Action<AjaxDataSourceBuilder<T>> configurator)
        {
            configurator(new AjaxDataSourceBuilder<T>(Component.DataSource, Component.ViewContext, Component.UrlGenerator));

            return this;
        }
        
        /// <summary>
        /// If set to true, the listview gets the next page of data when the user scrolls near the bottom of the view.
        /// </summary>
        /// <param name="value">The value that configures the endlessscroll.</param>
        public MobileListViewBuilder<T> EndlessScroll(bool value)
        {
            Component.EndlessScroll = value;

            return this;
        }
        
        /// <summary>
        /// A callback function used when the 'endlessScroll' option is enabled. The result of the function will be send as additional parameters to the DataSource's next method.
        /// </summary>
        /// <param name="value">The value that configures the endlessscrollparameters.</param>
        public MobileListViewBuilder<T> EndlessScrollParameters(string value)
        {
            Component.EndlessScrollParameters = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the group headers will persist their position when the user scrolls through the listview. Applicable only when the type is set to group, or when binding to grouped datasource.
        /// </summary>
        /// <param name="value">The value that configures the fixedheaders.</param>
        public MobileListViewBuilder<T> FixedHeaders(bool value)
        {
            Component.FixedHeaders = value;

            return this;
        }
        
        /// <summary>
        /// The header item template (applicable when the type is set to group).
        /// </summary>
        /// <param name="value">The value that configures the headertemplate.</param>
        public MobileListViewBuilder<T> HeaderTemplate(string value)
        {
            Component.HeaderTemplate = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, a button is rendered at the bottom of the listview, which fetch the next page of data when tapped.
        /// </summary>
        /// <param name="value">The value that configures the loadmore.</param>
        public MobileListViewBuilder<T> LoadMore(bool value)
        {
            Component.LoadMore = value;

            return this;
        }
        
        /// <summary>
        /// The text of the rendered load-more button (applies only if loadMore is set to true).
        /// </summary>
        /// <param name="value">The value that configures the loadmoretext.</param>
        public MobileListViewBuilder<T> LoadMoreText(string value)
        {
            Component.LoadMoreText = value;

            return this;
        }
        
        /// <summary>
        /// Check the 'endlessScrollParameters' option.
        /// </summary>
        /// <param name="value">The value that configures the loadmoreparameters.</param>
        public MobileListViewBuilder<T> LoadMoreParameters(string value)
        {
            Component.LoadMoreParameters = value;

            return this;
        }
        
        /// <summary>
        /// The message template displayed when the user pulls the listView. Applicable only when pullToRefresh is set to true.
        /// </summary>
        /// <param name="value">The value that configures the pulltemplate.</param>
        public MobileListViewBuilder<T> PullTemplate(string value)
        {
            Component.PullTemplate = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the listview will reload its data when the user pulls the view over the top limit.
        /// </summary>
        /// <param name="value">The value that configures the pulltorefresh.</param>
        public MobileListViewBuilder<T> PullToRefresh(bool value)
        {
            Component.PullToRefresh = value;

            return this;
        }
        
        /// <summary>
        /// A callback function used when the 'pullToRefresh' option is enabled. The result of the function will be send as additional parameters to the DataSource's next method.
        /// </summary>
        /// <param name="value">The value that configures the pullparameters.</param>
        public MobileListViewBuilder<T> PullParameters(string value)
        {
            Component.PullParameters = value;

            return this;
        }
        
        /// <summary>
        /// The message template displayed during the refresh. Applicable only when pullToRefresh is set to true.
        /// </summary>
        /// <param name="value">The value that configures the refreshtemplate.</param>
        public MobileListViewBuilder<T> RefreshTemplate(string value)
        {
            Component.RefreshTemplate = value;

            return this;
        }
        
        /// <summary>
        /// The message template indicating that pullToRefresh will occur. Applicable only when pullToRefresh is set to true.
        /// </summary>
        /// <param name="value">The value that configures the releasetemplate.</param>
        public MobileListViewBuilder<T> ReleaseTemplate(string value)
        {
            Component.ReleaseTemplate = value;

            return this;
        }
        
        /// <summary>
        /// The distance to the bottom in pixels, after which the listview will start fetching the next page. Applicable only when endlessScroll is set to true.
        /// </summary>
        /// <param name="value">The value that configures the scrolltreshold.</param>
        public MobileListViewBuilder<T> ScrollTreshold(string value)
        {
            Component.ScrollTreshold = value;

            return this;
        }

        /// <summary>
        /// The distance to the bottom in pixels, after which the listview will start fetching the next page. Applicable only when endlessScroll is set to true.
        /// </summary>
        /// <param name="value">The value that configures the scrolltreshold.</param>
        public MobileListViewBuilder<T> ScrollTreshold(int value)
        {
            Component.ScrollTreshold = value + "px";

            return this;
        }

        /// <summary>
        /// The style of the control. Can be either empty string(""), or inset.
        /// </summary>
        /// <param name="value">The value that configures the style.</param>
        public MobileListViewBuilder<T> Style(string value)
        {
            Component.Style = value;

            return this;
        }
        
        /// <summary>
        /// The item template.
        /// </summary>
        /// <param name="value">The value that configures the template.</param>
        public MobileListViewBuilder<T> Template(string value)
        {
            Component.Template = value;

            return this;
        }
        
        /// <summary>
        /// The type of the control. Can be either flat (default) or group. Determined automatically in databound mode.
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public MobileListViewBuilder<T> Type(string value)
        {
            Component.Type = value;

            return this;
        }
        
        /// <summary>
        /// Indicates whether the filter input must be visible or not.
        /// </summary>
        /// <param name="configurator">The action that configures the filterable.</param>
        public MobileListViewBuilder<T> Filterable(Action<MobileListViewFilterableSettingsBuilder> configurator)
        {
            configurator(new MobileListViewFilterableSettingsBuilder(Component.Filterable));
            return this;
        }
              
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileListView&lt;Order&gt;()
        ///             .Name("MobileListView")
        ///             .Events(events => events
        ///                 .Click("onClick")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileListViewBuilder<T> Events(Action<MobileListViewEventBuilder> configurator)
        {

            configurator(new MobileListViewEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Builds MobileListView items.
        /// </summary>
        /// <param name="action">Action for declaratively building MobileListView items.</param>
        /// <code lang="CS">
        ///  &lt;% Html.Kendo().MobileListViewView()
        ///            .Name("View")
        ///            .Items(items => 
        ///            {
        ///                 items.Add().Text("Item");
        ///                 items.AddLink().Text("Link Item");    
        ///             })
        ///            .Render();
        /// %&gt;
        /// </code>
        public MobileListViewBuilder<T> Items(Action<MobileListViewItemFactory> action)
        {

            var factory = new MobileListViewItemFactory(Component.Items, Component.ViewContext, Component.UrlGenerator);

            action(factory);

            return this;
        }
    }
}

