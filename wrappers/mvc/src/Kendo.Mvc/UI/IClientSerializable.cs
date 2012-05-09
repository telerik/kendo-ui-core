namespace Kendo.Mvc.UI
{
    public interface IClientSerializable
    {
        void SerializeTo(string key, IClientSideObjectWriter writer);
    }
}
