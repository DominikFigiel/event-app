namespace EventApp.API.Helpers
{
    public class EventParams
    {
        private const int MaxPageSize = 100;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 3;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        public string OrderBy { get; set; }
    }
}