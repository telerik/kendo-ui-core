namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Web;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// HTMLHelper extension for providing access to <see cref="ViewComponentFactory"/>.
    /// </summary>
    public static class HtmlHelperExtension
    {
        private static readonly string Key = typeof(ViewComponentFactory).AssemblyQualifiedName;

        /// <summary>
        /// Gets the Telerik View Component Factory
        /// </summary>
        /// <param name="helper">The helper.</param>
        /// <returns>The Factory</returns>
        public static ViewComponentFactory Kendo(this HtmlHelper helper)
        {
            Guard.IsNotNull(helper, "helper");

            var clientSideObjectWriterFactory = DI.Current.Resolve<IClientSideObjectWriterFactory>();

            return new ViewComponentFactory(helper, clientSideObjectWriterFactory);
        }

#if MVC2 || MVC3
        /// <summary>
        /// Gets the Telerik View Component Factory
        /// </summary>
        /// <param name="helper">The helper.</param>
        /// <returns>The Factory</returns>
        public static ViewComponentFactory<TModel> Kendo<TModel>(this HtmlHelper<TModel> helper)
        {
            Guard.IsNotNull(helper, "helper");

            var clientSideObjectWriterFactory = DI.Current.Resolve<IClientSideObjectWriterFactory>();

            return new ViewComponentFactory<TModel>(helper, clientSideObjectWriterFactory);
        }
#endif
    }
}