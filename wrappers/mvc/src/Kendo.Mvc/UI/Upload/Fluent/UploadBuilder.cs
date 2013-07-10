namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using Kendo.Mvc.Infrastructure;
    using System.Collections;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Upload"/> component.
    /// </summary>
    public class UploadBuilder : WidgetBuilderBase<Upload, UploadBuilder>, IHideObjectMembers
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
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Events(events => events
        ///                 .OnLoad("onLoad")
        ///                 .OnUpload("onUpload")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadBuilder Events(Action<UploadEventBuilder> configurator)
        {
            configurator(new UploadEventBuilder(Component.Events));

            return this;
        }

        /// <summary>
        /// Enables or disables the component.
        /// </summary>
        /// <param name="value">true if the component should be enabled, false otherwise; the default is true.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
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
        ///  &lt;%= Html.Kendo().Upload()
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
        ///  &lt;%= Html.Kendo().Upload()
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
            configurator(new UploadAsyncSettingsBuilder(Component.Async));

            return this;
        }

        /// <summary>
        /// Use it to configure asynchronous uploading.
        /// </summary>
        /// <param name="configurator">Use builder to set different asynchronous uploading options.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Save", "Compose")
        ///                 .Remove("Remove", "Compose")
        ///             );
        /// %&gt;
        /// </code>
        /// </example>
        public UploadBuilder Messages(Action<UploadMessagesBuilder> configurator)
        {
            configurator(new UploadMessagesBuilder(Component.Messages));

            return this;
        }

        /// <summary>
        /// The template element to be used for rendering the files in the list
        /// </summary>
        /// <param name="templateId">The id of the template</param>
        /// <example>
        /// <code lang="Razor">
        /// 
        /// </code>
        /// <code lang="ASPX">
        /// 
        /// </code>
        /// </example>
        public UploadBuilder TemplateId(string templateId)
        {
            Component.TemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Sets the initially rendered files
        /// </summary>
        /// <param name="configurator">The lambda which configures initial files</param>
        /// <example>
        /// <code lang="ASPX">
        ///
        /// </code>
        /// <code lang="Razor">
        ///
        /// </code>
        /// </example>
        public UploadBuilder Files(Action<UploadFileFactory> configurator)
        {
            UploadFileFactory factory = new UploadFileFactory(Component);

            configurator(factory);

            return this;
        }
    }
}
