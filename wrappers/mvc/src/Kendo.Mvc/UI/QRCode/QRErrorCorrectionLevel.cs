namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Specifies a QR code error correction level.
    /// </summary>
    public enum QRErrorCorrectionLevel
    {
        /// <summary>
        /// Specifies a Low error correction level. Approximately 7% of the codewords can be restored.
        /// </summary>
        L,

        /// <summary>
        /// Specifies a Medium error correction level. Approximately 15% of the codewords can be restored.
        /// </summary>
        M,

        /// <summary>
        /// Specifies a Quartile error correction level. Approximately 25% of the codewords can be restored.
        /// </summary>
        Q,

        /// <summary>
        /// Specifies a High error correction level. Approximately 30% of the codewords can be restored.
        /// </summary>
        H
    }
}
