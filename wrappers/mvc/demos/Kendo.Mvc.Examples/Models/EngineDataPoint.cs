namespace Kendo.Mvc.Examples.Models
{
    public class EngineDataPoint
    {
        public EngineDataPoint()
        {
        }

        public EngineDataPoint(int rpm, double torque, double power)
        {
            RPM = rpm;
            Torque = torque;
            Power = power;
        }

        public int RPM;
        public double Torque;
        public double Power;
    }
}
