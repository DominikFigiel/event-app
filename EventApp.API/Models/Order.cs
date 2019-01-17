using System;
using System.Collections.Generic;

namespace EventApp.API.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public Status Status { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime PaymentDate { get; set; }
        public ICollection<OrderTicket> OrderTickets { get; set; }
    }
}