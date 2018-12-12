using System.Linq;
using AutoMapper;
using EventApp.API.Dtos.Address;
using EventApp.API.Dtos.Category;
using EventApp.API.Dtos.City;
using EventApp.API.Dtos.Event;
using EventApp.API.Dtos.Image;
using EventApp.API.Dtos.User;
using EventApp.API.Dtos.Venue;
using EventApp.API.Models;

namespace EventApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForListDto>();
            CreateMap<UserForSeedDataDto, User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Image, ImagesForDetailedDto>();
            CreateMap<Event, EventForListDto>();
            CreateMap<Event, EventForDetailedDto>();
            CreateMap<CategoryForAddDto, Category>();
            CreateMap<CategoryForUpdateDto, Category>();
            CreateMap<SubcategoryForAddDto, Subcategory>();
            CreateMap<SubcategoryForUpdateDto, Subcategory>();
            CreateMap<CityForAddDto, City>();
            CreateMap<CityForUpdateDto, City>();
            CreateMap<VenueForAddDto, Venue>();
            CreateMap<VenueForUpdateDto, Venue>();
            CreateMap<AddressForUpdateDto, Address>();
        }
    }
}