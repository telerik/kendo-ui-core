namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// A builder class for <see cref="UploadMessages"/>
    /// </summary>
    public class UploadMessagesBuilder : IHideObjectMembers
    {
        private readonly IUploadMessages messages;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadMessagesBuilder" /> class.
        /// </summary>
        /// <param name="messages">The messages.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .Retry("retry")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder(IUploadMessages messages)
        {
            this.messages = messages;
        }

        /// <summary>
        /// Sets the Cancel button text
        /// </summary>
        /// <param name="cancelMessage">New cancel button text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .Cancel("cancel")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder Cancel(string cancelMessage)
        {
            messages.Cancel = cancelMessage;

            return this;
        }

        /// <summary>
        /// Sets the Drag and Drop hint text
        /// </summary>
        /// <param name="dropFilesHereMessage">New Drag and Drop hint text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .DropFilesHere("drop files here")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder DropFilesHere(string dropFilesHereMessage)
        {
            messages.DropFilesHere = dropFilesHereMessage;

            return this;
        }

        /// <summary>
        /// Sets the Remove button text
        /// </summary>
        /// <param name="removeMessage">New Remove button text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .Remove("drop files here")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder Remove(string removeMessage)
        {
            messages.Remove = removeMessage;

            return this;
        }

        /// <summary>
        /// Sets the Retry button text
        /// </summary>
        /// <param name="retryMessage">New Retry button text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .Retry("retry")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder Retry(string retryMessage)
        {
            messages.Retry = retryMessage;

            return this;
        }

        /// <summary>
        /// Sets the Select button text
        /// </summary>
        /// <param name="selectMessage">New Select button text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .Select("select")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder Select(string selectMessage)
        {
            messages.Select = selectMessage;

            return this;
        }

        /// <summary>
        /// Sets the "failed" status text accessible by screen readers
        /// </summary>
        /// <param name="statusFailedMessage">New "failed" status text accessible by screen readers.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .StatusFailed("failed")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder StatusFailed(string statusFailedMessage)
        {
            messages.StatusFailed = statusFailedMessage;

            return this;
        }

        /// <summary>
        /// Sets the "uploaded" status text accessible by screen readers
        /// </summary>
        /// <param name="statusUploadedMessage">New "uploaded" status text accessible by screen readers.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .StatusUploaded("uploaded")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder StatusUploaded(string statusUploadedMessage)
        {
            messages.StatusUploaded = statusUploadedMessage;

            return this;
        }

        /// <summary>
        /// Sets the "uploading" status text accessible by screen readers
        /// </summary>
        /// <param name="statusUploadingMessage">New "uploading" status text accessible by screen readers.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .StatusUploading("uploading")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder StatusUploading(string statusUploadingMessage)
        {
            messages.StatusUploading = statusUploadingMessage;

            return this;
        }

        /// <summary>
        /// Sets Upload button (visible when AutoUpload is set to false) text
        /// </summary>
        /// <param name="uploadSelectedFilesMessage">New Upload button text.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Messages(msgs => msgs
        ///                 .UploadSelectedFiles("uploading")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadMessagesBuilder UploadSelectedFiles(string uploadSelectedFilesMessage)
        {
            messages.UploadSelectedFiles = uploadSelectedFilesMessage;

            return this;
        }
    }
}
