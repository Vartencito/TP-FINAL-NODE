USE [master]
GO
/****** Object:  Database [DAI-Disney]    Script Date: 3/7/2022 02:50:45 ******/
CREATE DATABASE [DAI-Disney]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DAI-Disnay', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DAI-Disnay.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DAI-Disnay_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\DAI-Disnay_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DAI-Disney] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DAI-Disney].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DAI-Disney] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DAI-Disney] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DAI-Disney] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DAI-Disney] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DAI-Disney] SET ARITHABORT OFF 
GO
ALTER DATABASE [DAI-Disney] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DAI-Disney] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DAI-Disney] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DAI-Disney] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DAI-Disney] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DAI-Disney] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DAI-Disney] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DAI-Disney] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DAI-Disney] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DAI-Disney] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DAI-Disney] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DAI-Disney] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DAI-Disney] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DAI-Disney] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DAI-Disney] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DAI-Disney] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DAI-Disney] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DAI-Disney] SET RECOVERY FULL 
GO
ALTER DATABASE [DAI-Disney] SET  MULTI_USER 
GO
ALTER DATABASE [DAI-Disney] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DAI-Disney] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DAI-Disney] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DAI-Disney] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DAI-Disney] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DAI-Disney] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [DAI-Disney] SET QUERY_STORE = OFF
GO
USE [DAI-Disney]
GO
/****** Object:  Table [dbo].[Pelicula]    Script Date: 3/7/2022 02:50:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pelicula](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](150) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[FechaCreacion] [int] NOT NULL,
	[Calificacion] [float] NOT NULL,
 CONSTRAINT [PK_Pelicula] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personaje]    Script Date: 3/7/2022 02:50:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personaje](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Imagen] [varchar](150) NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Edad] [int] NOT NULL,
	[Peso] [float] NOT NULL,
	[Historia] [varchar](350) NOT NULL,
 CONSTRAINT [PK_Personaje] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonajesXPeliculas]    Script Date: 3/7/2022 02:50:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonajesXPeliculas](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdPersonaje] [int] NOT NULL,
	[IdPelicula] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 3/7/2022 02:50:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](50) NOT NULL,
 CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Pelicula] ON 

INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (5, N'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2016/12/aladdin.jpg?itok=4qtuDDNB', N'Aladin', 1992, 4.5)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (8, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOllprBSkLhgzTMSQcfBk_BjXIJtSZCLVlacQEgHy4gxvsTyWaFNpJ0jgzTc7H_3DXz0k&usqp=CAU', N'La Bella Durmiente', 1959, 5)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (9, N'https://1.bp.blogspot.com/-mozWIOldwWQ/UkCmR6yjE9I/AAAAAAAACeg/XCdU5oo96Ys/s1600/La-Cenicienta-Walt-Disney.png', N'La Cenicienta', 1950, 3)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (10, N'https://es.web.img3.acsta.net/medias/nmedia/18/80/55/35/19549001.jpg', N'Blancanieves y los siete enanos', 1937, 2)
INSERT [dbo].[Pelicula] ([Id], [Imagen], [Titulo], [FechaCreacion], [Calificacion]) VALUES (11, N'https://es.web.img2.acsta.net/pictures/14/02/27/19/01/345052.jpg', N'Alicia en el país de las maravillas', 1951, 1)
SET IDENTITY_INSERT [dbo].[Pelicula] OFF
GO
SET IDENTITY_INSERT [dbo].[Personaje] ON 

INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (3, N'https://static.wikia.nocookie.net/disney/images/b/b7/Ab%C3%BA.png/revision/latest?cb=20130925165725&path-prefix=es', N'Abú', 18, 14, N'Es un travieso monito ladronzuelo que tiene el honor de ser el mejor amigo de Aladin.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (4, N'https://static.wikia.nocookie.net/disney/images/b/b3/Mal%C3%A9fica.png/revision/latest?cb=20120926081318&path-prefix=es', N'Maléfica', 35, 55, N'Maléfica es la villana principal de la película Sleeping Beauty. Es una poderosa hechicera que se describe a sí misma como la "Emperatriz del Mal".')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (6, N'https://static.wikia.nocookie.net/disney/images/a/ad/Charming.png/revision/latest?cb=20170927024701&path-prefix=es', N'Principe Encantador', 30, 60, N'El príncipe Henry, más conocido como Charming, es el esposo de Cenicienta. Aparece en el clásico de 1950 y en sus secuelas, así como en el remake se llama Kit, interpretado por Richard Madden.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (7, N'https://static.wikia.nocookie.net/disney/images/3/31/Gru%C3%B1%C3%B3n.png/revision/latest?cb=20140125094337&path-prefix=es', N'Gruñón', 40, 12, N'Es muy cascarrabias, y no para de quejarse de Blancanieves. Pero en realidad le cae bien. Se pelea a menudo con Sabio. Cuando trabaja en la mina, se encarga de cavar.')
INSERT [dbo].[Personaje] ([Id], [Imagen], [Nombre], [Edad], [Peso], [Historia]) VALUES (10, N'https://static.wikia.nocookie.net/aliceinwonderland/images/0/01/1951-Mad_Hatter.png/revision/latest?cb=20160526190137&path-prefix=es', N'El Sombrereo', 55, 20, N'Es visto por primera vez cuando Alicia se pregunta como salir del bosque y el Gato Risón le dice que debería visitarlos para que la indiquen el camino de vuelta a casa. Alicia le visita, interrumpiendo la extraña fiesta del no cumpleaños que el sombrerero tenía con la Liebre de Marzo y el Lirón.')
SET IDENTITY_INSERT [dbo].[Personaje] OFF
GO
SET IDENTITY_INSERT [dbo].[PersonajesXPeliculas] ON 

INSERT [dbo].[PersonajesXPeliculas] ([Id], [IdPersonaje], [IdPelicula]) VALUES (2, 3, 5)
INSERT [dbo].[PersonajesXPeliculas] ([Id], [IdPersonaje], [IdPelicula]) VALUES (3, 4, 8)
INSERT [dbo].[PersonajesXPeliculas] ([Id], [IdPersonaje], [IdPelicula]) VALUES (4, 6, 9)
INSERT [dbo].[PersonajesXPeliculas] ([Id], [IdPersonaje], [IdPelicula]) VALUES (5, 7, 10)
INSERT [dbo].[PersonajesXPeliculas] ([Id], [IdPersonaje], [IdPelicula]) VALUES (6, 10, 11)
SET IDENTITY_INSERT [dbo].[PersonajesXPeliculas] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [username], [password]) VALUES (1, N'Valen', N'1234')
INSERT [dbo].[Users] ([Id], [username], [password]) VALUES (2, N'Caro', N'5678')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[PersonajesXPeliculas]  WITH CHECK ADD  CONSTRAINT [FK_PersonajesXPeliculas_Pelicula] FOREIGN KEY([IdPelicula])
REFERENCES [dbo].[Pelicula] ([Id])
GO
ALTER TABLE [dbo].[PersonajesXPeliculas] CHECK CONSTRAINT [FK_PersonajesXPeliculas_Pelicula]
GO
ALTER TABLE [dbo].[PersonajesXPeliculas]  WITH CHECK ADD  CONSTRAINT [FK_PersonajesXPeliculas_Personaje] FOREIGN KEY([IdPersonaje])
REFERENCES [dbo].[Personaje] ([Id])
GO
ALTER TABLE [dbo].[PersonajesXPeliculas] CHECK CONSTRAINT [FK_PersonajesXPeliculas_Personaje]
GO
USE [master]
GO
ALTER DATABASE [DAI-Disney] SET  READ_WRITE 
GO
