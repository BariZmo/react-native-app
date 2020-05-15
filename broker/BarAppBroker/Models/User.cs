namespace BarAppBroker.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public override string ToString()
        {
            return $"{Id} {Name} {Surname} {Email} {Password}";
        }
    }
}
