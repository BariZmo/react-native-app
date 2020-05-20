namespace BarAppBroker.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BarId { get; set; }
        public int OtherPeople { get; set; }
        public string Date { get; set; }
        public bool Accepted { get; set; }

        public override string ToString()
        {
            return $"{Id} {UserId} {BarId} {OtherPeople} {Date} {Accepted}";
        }
    }
}
