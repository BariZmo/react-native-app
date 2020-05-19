namespace BarAppBroker.Models
{
    public class Bar
    {
        public int Id { get; set; }
        public string TradeName { get; set; }
        public string Number { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public string Coordinates { get; set; }

        public override string ToString()
        {
            return $"{Id} {TradeName} {Number} {Email} {Address} {Password} {Coordinates}";
        }
    }
}
