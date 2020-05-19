namespace BarAppBroker.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BarId { get; set; }
        public int OtherPeople { get; set; }
        public string Date { get; set; }
    }
}
