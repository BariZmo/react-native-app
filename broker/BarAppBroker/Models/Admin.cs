namespace BarAppBroker.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public override string ToString()
        {
            return $"{Id} {Email} {Password}";
        }
    }
}
