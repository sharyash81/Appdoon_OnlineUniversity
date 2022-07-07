FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN mkdir /src 
WORKDIR /src
COPY /Src/Appdoon.Application/*.csproj ./Src/Appdoon.Application/
COPY /Src/Appdoon.Common/*.csproj ./Src/Appdoon.Common/
COPY /Src/Appdoon.Domain/*.csproj ./Src/Appdoon.Domain/
COPY /Src/Appdoon.Presistence/*.csproj ./Src/Appdoon.Presistence/
COPY /Src/Appdoon.WebApi/*.csproj ./Src/Appdoon.WebApi/

RUN dotnet restore "/src/Src/Appdoon.WebApi/Appdoon.WebApi.csproj"
COPY /Src ./Src

WORKDIR "/src/Src/Appdoon.WebApi/"
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build /src/Src/Appdoon.WebApi/Photos ./Photos
EXPOSE 80
ENTRYPOINT ["dotnet","Appdoon.WebApi.dll"]