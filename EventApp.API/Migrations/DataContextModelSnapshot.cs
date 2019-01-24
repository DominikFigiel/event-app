﻿// <auto-generated />
using System;
using EventApp.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EventApp.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.2-rtm-30932");

            modelBuilder.Entity("EventApp.API.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CityId");

                    b.Property<string>("Line1");

                    b.Property<string>("Line2");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("EventApp.API.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("EventApp.API.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasName("City_Name");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("EventApp.API.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Approved");

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<bool>("Finished");

                    b.Property<string>("Headline");

                    b.Property<string>("Name");

                    b.Property<string>("PhotoURL");

                    b.Property<bool>("Promoted");

                    b.Property<bool>("Rejected");

                    b.Property<int>("SubcategoryId");

                    b.Property<int>("UserId");

                    b.Property<int>("VenueId");

                    b.HasKey("Id");

                    b.HasIndex("SubcategoryId");

                    b.HasIndex("UserId");

                    b.HasIndex("VenueId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("EventApp.API.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<int>("EventId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("EventApp.API.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("OrderDate");

                    b.Property<DateTime>("PaymentDate");

                    b.Property<int>("StatusId");

                    b.Property<decimal>("TotalAmount");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("StatusId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("EventApp.API.Models.OrderTicket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("OrderId");

                    b.Property<int>("SoldUnits");

                    b.Property<int>("TicketCategoryId");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("TicketCategoryId");

                    b.ToTable("OrderTickets");
                });

            modelBuilder.Entity("EventApp.API.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("EventApp.API.Models.Status", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Statuses");
                });

            modelBuilder.Entity("EventApp.API.Models.Subcategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Subcategories");
                });

            modelBuilder.Entity("EventApp.API.Models.TicketCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int>("EventId");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.Property<int>("Quantity");

                    b.Property<int>("SoldUnits");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("TicketCategories");
                });

            modelBuilder.Entity("EventApp.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CompanyName");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("PhotoURL");

                    b.Property<DateTime>("RegistrationDate");

                    b.Property<string>("Surname");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EventApp.API.Models.UserRole", b =>
                {
                    b.Property<int>("UserId");

                    b.Property<int>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("EventApp.API.Models.Venue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AddressId");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<string>("PhotoUrl");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Venues");
                });

            modelBuilder.Entity("EventApp.API.Models.Address", b =>
                {
                    b.HasOne("EventApp.API.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.Event", b =>
                {
                    b.HasOne("EventApp.API.Models.Subcategory", "Subcategory")
                        .WithMany()
                        .HasForeignKey("SubcategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EventApp.API.Models.User", "User")
                        .WithMany("Events")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EventApp.API.Models.Venue", "Venue")
                        .WithMany()
                        .HasForeignKey("VenueId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.Image", b =>
                {
                    b.HasOne("EventApp.API.Models.Event", "Event")
                        .WithMany("Images")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.Order", b =>
                {
                    b.HasOne("EventApp.API.Models.Status", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EventApp.API.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.OrderTicket", b =>
                {
                    b.HasOne("EventApp.API.Models.Order", "Order")
                        .WithMany("OrderTickets")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EventApp.API.Models.TicketCategory", "TicketCategory")
                        .WithMany()
                        .HasForeignKey("TicketCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.Subcategory", b =>
                {
                    b.HasOne("EventApp.API.Models.Category", "Category")
                        .WithMany("Subcategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.TicketCategory", b =>
                {
                    b.HasOne("EventApp.API.Models.Event", "Event")
                        .WithMany("TicketCategories")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.UserRole", b =>
                {
                    b.HasOne("EventApp.API.Models.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("EventApp.API.Models.User", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventApp.API.Models.Venue", b =>
                {
                    b.HasOne("EventApp.API.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
