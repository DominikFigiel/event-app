using System.Linq;
using AutoMapper;
using EventApp.API.Dtos.Event;
using EventApp.API.Dtos.Image;
using EventApp.API.Dtos.User;
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
            CreateMap<Image, ImagesForDetailedDto>();
            CreateMap<Event, EventForListDto>();
            CreateMap<Event, EventForDetailedDto>();
        }
    }
}