using Application.Contacts.Commands.CreateContactCommand;
using Application.Contacts.Commands.DeleteContactCommand;
using Application.Contacts.Commands.UpdateContactCommand;
using Application.Contacts.Queries.GetContact;
using Application.Contacts.Queries.GetMyContacts;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddTransient<IRequestHandler<CreateContactCommand, Guid>, CreateContactHandler>();
            services.AddTransient<IRequestHandler<UpdateContactCommand, GetContactDto>, UpdateContactHandler>();
            services.AddTransient<IRequestHandler<DeleteContactCommand, bool>, DeleteContactHandler>();
            services.AddTransient<IRequestHandler<MyContactsQuery, MyContactsPageDto>, MyContactsHandler>();
            services.AddTransient<IRequestHandler<GetContactQuery, GetContactDto>, GetContactHandler>();

            return services;
        }
    }
}
