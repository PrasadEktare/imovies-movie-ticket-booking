const bcrypt = require('bcryptjs');

const initialMovies = [
  {
    _id: '671d1001a1b2c3d4e5f60001',
    title: 'Dune: Part Two',
    description:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    duration: 166,
    language: 'English',
    releaseDate: new Date('2024-03-01'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520QIe.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=Way9Dexny3w',
    rating: 8.6,
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    status: 'now_showing',
  },
  {
    _id: '671d1001a1b2c3d4e5f60002',
    title: 'Oppenheimer',
    description:
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, examining the deep moral and geopolitical consequences that followed.',
    genre: ['Biography', 'Drama', 'History'],
    duration: 180,
    language: 'English',
    releaseDate: new Date('2023-07-21'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=uYPbbksJxIg',
    rating: 8.9,
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    status: 'now_showing',
  },
  {
    _id: '671d1001a1b2c3d4e5f60003',
    title: 'Spider-Man: Across the Spider-Verse',
    description:
      'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.',
    genre: ['Animation', 'Action', 'Adventure'],
    duration: 140,
    language: 'English',
    releaseDate: new Date('2023-06-02'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
    rating: 8.7,
    director: 'Joaquim Dos Santos, Kemp Powers',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac', 'Daniel Kaluuya'],
    status: 'now_showing',
  },
  {
    _id: '671d1001a1b2c3d4e5f60004',
    title: 'Interstellar',
    description:
      'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    duration: 169,
    language: 'English',
    releaseDate: new Date('2014-11-07'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/rAiYTsqzrxtvoUw85mbtx1qmgr2.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    rating: 8.7,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    status: 'now_showing',
  },
  {
    _id: '671d1001a1b2c3d4e5f60005',
    title: 'The Batman',
    description:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 176,
    language: 'English',
    releaseDate: new Date('2022-03-04'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/5P8SmMzSNYikXpxil6BYzJ16611.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=mqqft2x_Aa4',
    rating: 7.8,
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Colin Farrell'],
    status: 'now_showing',
  },
  {
    _id: '671d1001a1b2c3d4e5f60006',
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    duration: 148,
    language: 'English',
    releaseDate: new Date('2010-07-16'),
    posterUrl: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    rating: 8.8,
    director: 'Christopher Nolan',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
    status: 'now_showing',
  },
];

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const todayStr = today.toISOString().split('T')[0];
const tomorrowStr = tomorrow.toISOString().split('T')[0];

const theatres = [
  { name: 'PVR ICON: Gold Class', location: 'Phoenix Mall, Downtown' },
  { name: 'INOX Megaplex', location: 'City Center Mall' },
  { name: 'Cinepolis IMAX 3D', location: 'Grand Galleria' },
];

const screenTypes = ['IMAX 3D', '2D', '3D'];

const initialShows = [];
let showIdCounter = 1;

initialMovies.forEach((movie, idx) => {
  const theatre = theatres[idx % theatres.length];
  const screenType = screenTypes[idx % screenTypes.length];

  initialShows.push({
    _id: `671d2001a1b2c3d4e5f6${String(showIdCounter++).padStart(4, '0')}`,
    movie: movie,
    theatreName: theatre.name,
    theatreLocation: theatre.location,
    screenType: screenType,
    showDate: todayStr,
    showTime: '02:00 PM',
    ticketPrice: { regular: 220, premium: 380, vip: 550 },
    totalSeats: 60,
    bookedSeats: ['B3', 'B4', 'C5'],
  });

  initialShows.push({
    _id: `671d2001a1b2c3d4e5f6${String(showIdCounter++).padStart(4, '0')}`,
    movie: movie,
    theatreName: theatre.name,
    theatreLocation: theatre.location,
    screenType: screenType,
    showDate: todayStr,
    showTime: '07:30 PM',
    ticketPrice: { regular: 250, premium: 420, vip: 600 },
    totalSeats: 60,
    bookedSeats: ['D1', 'D2', 'E4'],
  });

  initialShows.push({
    _id: `671d2001a1b2c3d4e5f6${String(showIdCounter++).padStart(4, '0')}`,
    movie: movie,
    theatreName: theatre.name,
    theatreLocation: theatre.location,
    screenType: screenType,
    showDate: tomorrowStr,
    showTime: '06:00 PM',
    ticketPrice: { regular: 240, premium: 400, vip: 580 },
    totalSeats: 60,
    bookedSeats: ['A1', 'C2'],
  });
});

const initialUsers = [
  {
    _id: '671d3001a1b2c3d4e5f60001',
    name: 'System Admin',
    email: 'admin@imovies.com',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    phone: '+1 800 555 0199',
  },
  {
    _id: '671d3001a1b2c3d4e5f60002',
    name: 'John Doe',
    email: 'demo@imovies.com',
    password: bcrypt.hashSync('demo123', 10),
    role: 'user',
    phone: '+1 555 123 4567',
  },
];

const initialBookings = [
  {
    _id: '671d4001a1b2c3d4e5f60001',
    user: initialUsers[1],
    show: initialShows[0],
    movie: initialMovies[0],
    seats: ['B3', 'B4'],
    seatDetails: [
      { seatNumber: 'B3', tier: 'VIP', price: 550 },
      { seatNumber: 'B4', tier: 'VIP', price: 550 },
    ],
    totalAmount: 1100,
    bookingReference: 'IM-DEMO-9901',
    bookingStatus: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date(),
  },
];

const mockStore = {
  movies: [...initialMovies],
  shows: [...initialShows],
  users: [...initialUsers],
  bookings: [...initialBookings],
};

module.exports = mockStore;
