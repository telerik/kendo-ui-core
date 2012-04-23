// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.Globalization;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Upload"/> component.
    /// </summary>
    public class UploadBuilder : ViewComponentBuilderBase<Upload, UploadBuilder>, IHideObjectMembers
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UploadBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public UploadBuilder(Upload component)
            : base(component)
        {
        }

        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events configuration action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .ClientEvents(events => events
        ///                 .OnLoad("onLoad")
        ///                 .OnUpload("onUpload")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadBuilder ClientEvents(Action<UploadClientEventsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new UploadClientEventsBuilder(Component.ClientEvents));

            return this;
        }

        /// <summary>
        /// Enables or disables the component.
        /// </summary>
        /// <param name="value">true if the component should be enabled, false otherwise; the default is true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Enable(false)
        /// %&gt;
        /// </code>
        /// </example>
        public UploadBuilder Enable(bool value)
        {
            Component.Enabled = value;

            return this;
        }

        /// <summary>
        /// Enables or disables multiple file selection.
        /// </summary>
        /// <param name="value">true if multiple file selection should be enabled, false otherwise; the default is true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Multiple(false)
        /// %&gt;
        /// </code>
        /// </example>
        public UploadBuilder Multiple(bool value)
        {
            Component.Multiple = value;

            return this;
        }

        /// <summary>
        /// Sets a value indicating whether to show the list of uploaded files
        /// </summary>
        /// <param name="value">true if the list of uploaded files should be visible, false otherwise; true by default</param>
        public UploadBuilder ShowFileList(bool value)
        {
            Component.ShowFileList = value;

            return this;
        }

        /// <summary>
        /// Use it to configure asynchronous uploading.
        /// </summary>
        /// <param name="configurator">Use builder to set different asynchronous uploading options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Save", "Compose")
        ///                 .Remove("Remove", "Compose")
        ///             );
        /// %&gt;
        /// </code>
        /// </example>
        public UploadBuilder Async(Action<UploadAsyncSettingsBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new UploadAsyncSettingsBuilder(Component.Async));

            return this;
        }

        /// <summary>
        /// Sets the localization culture of the upload.
        /// </summary>
        /// <param name="culture">The culture.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Telerik().Upload()
        ///             .Name("Upload")
        ///             .Localizable("de-DE")
        /// %&gt;
        /// </code>
        /// </example>
        public UploadBuilder Localizable(string culture)
        {
            var localizationServiceFactory = DI.Current.Resolve<ILocalizationServiceFactory>();
            var cultureInfo = new CultureInfo(culture);

            Component.Localization = new UploadLocalization(localizationServiceFactory.Create("UploadLocalization", cultureInfo), cultureInfo);

            return this;
        }
    }
}
