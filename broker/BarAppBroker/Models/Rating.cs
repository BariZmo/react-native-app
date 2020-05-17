namespace BarAppBroker.Models
{
    public class Rating
    {
        public int Score { get; set; }
        public string Comment { get; set; }
        public string RatedEntityRole { get; set; }
        public int RatedEntityId { get; set; }

        public override string ToString()
        {
            return $"{RatedEntityId} {RatedEntityRole} {Score} {Comment}";
        }
    }
}
