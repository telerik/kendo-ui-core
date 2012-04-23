
namespace KendoUI.Mvc
{
    public interface IDescriptor
    {
        void Deserialize(string source);
        string Serialize();
    }
}
