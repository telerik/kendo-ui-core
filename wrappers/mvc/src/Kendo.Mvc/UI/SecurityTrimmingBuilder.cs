namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Defines the fluent interface for configuring the SecurityTrimming info.
    /// </summary>
    public class SecurityTrimmingBuilder
    {
        public SecurityTrimmingBuilder(SecurityTrimming SecurityTrimmingInfo)
        {
            this.SecurityTrimmingInfo = SecurityTrimmingInfo;
        }

        protected SecurityTrimming SecurityTrimmingInfo { get; set; }

        /// <summary>
        /// Enables or disables security trimming
        /// </summary>
        /// <remarks>
        /// The Enabled method is useful when you need to enable security trimming based on certain conditions.
        /// </remarks>
        public void Enabled(bool enable)
        {
            SecurityTrimmingInfo.Enabled = enable;
        }

        /// <summary>
        /// Enables or disables whether to hide parent item which does not have accessible childrens
        /// </summary>
        public void HideParent(bool hideParent)
        {
            SecurityTrimmingInfo.HideParent = hideParent;
            SecurityTrimmingInfo.Enabled = true;
        }
    }
}
