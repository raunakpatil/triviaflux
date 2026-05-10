
export type Entity = {
  name: string;
  value: number;
  unit: string;
  type: string;
  fact: string;
  emoji: string;
  year?: number;
};

export type Deck = {
  category: string;
  title: string;
  description: string;
  icon: string;
  entities: Entity[];
};

export const GAME_LIBRARY: Record<string, Deck> = {
  "geography": {
    category: "Geography & Society",
    title: "Global Landscape",
    description: "Landmasses, populations, and landmarks.",
    icon: "Map",
    entities: [
      // POPULATION (Updated 2024/2025)
      { name: "India", value: 1441719852, unit: "People", type: "Population", fact: "Now the world's most populous nation as of 2023.", emoji: "🇮🇳" },
      { name: "China", value: 1425178782, unit: "People", type: "Population", fact: "Experienced its first population decline in decades in 2022.", emoji: "🇨🇳" },
      { name: "USA", value: 341814420, unit: "People", type: "Population", fact: "The third most populous country, growing primarily via migration.", emoji: "🇺🇸" },
      { name: "Indonesia", value: 279798049, unit: "People", type: "Population", fact: "The world's largest archipelago and most populous Muslim-majority nation.", emoji: "🇮🇩" },
      { name: "Pakistan", value: 245209815, unit: "People", type: "Population", fact: "Has one of the youngest populations in the world.", emoji: "🇵🇰" },
      { name: "Nigeria", value: 229152217, unit: "People", type: "Population", fact: "Projected to become the world's 3rd largest country by 2050.", emoji: "🇳🇬" },
      { name: "Brazil", value: 217637297, unit: "People", type: "Population", fact: "The most populous country in South America.", emoji: "🇧🇷" },
      { name: "Bangladesh", value: 174701211, unit: "People", type: "Population", fact: "One of the most densely populated countries on Earth.", emoji: "🇧🇩" },
      { name: "Russia", value: 143957079, unit: "People", type: "Population", fact: "The largest country by land area, but only 9th by population.", emoji: "🇷🇺" },
      { name: "Ethiopia", value: 129719719, unit: "People", type: "Population", fact: "The world's most populous landlocked country.", emoji: "🇪🇹" },
      { name: "Japan", value: 122631432, unit: "People", type: "Population", fact: "Facing a significant demographic crisis with a shrinking population.", emoji: "🇯🇵" },
      { name: "Germany", value: 83252474, unit: "People", type: "Population", fact: "The most populous nation in the European Union.", emoji: "🇩🇪" },
      { name: "Vietnam", value: 99497680, unit: "People", type: "Population", fact: "The 15th most populous country in the world.", emoji: "🇻🇳" },
      { name: "UK", value: 67736802, unit: "People", type: "Population", fact: "Has one of the most multicultural populations in Europe.", emoji: "🇬🇧" },
      { name: "Vatican City", value: 518, unit: "People", type: "Population", fact: "The smallest sovereign state by both area and population.", emoji: "🇻🇦" },
      
      // AREA (Constants)
      { name: "Russia", value: 17098242, unit: "km²", type: "Area", fact: "Covers over one-eighth of Earth's inhabited land area.", emoji: "🗺️" },
      { name: "Canada", value: 9984670, unit: "km²", type: "Area", fact: "Has more lakes than the rest of the world combined.", emoji: "🍁" },
      { name: "China (Area)", value: 9706961, unit: "km²", type: "Area", fact: "Shares borders with 14 different countries.", emoji: "🐉" },
      { name: "USA (Area)", value: 9372610, unit: "km²", type: "Area", fact: "Includes 50 states, a federal district, and five territories.", emoji: "🦅" },
      { name: "Brazil (Area)", value: 8515767, unit: "km²", type: "Area", fact: "The only country in the Americas with Portuguese as an official language.", emoji: "🌳" },
      { name: "Australia (Area)", value: 7692024, unit: "km²", type: "Area", fact: "The only country that is also a continent.", emoji: "🦘" },
      { name: "India (Area)", value: 3287263, unit: "km²", type: "Area", fact: "Contains the world's highest mountain range, the Himalayas.", emoji: "🐅" },
      { name: "Argentina (Area)", value: 2780400, unit: "km²", type: "Area", fact: "Stretches from the tropics to the sub-antarctic.", emoji: "🧉" },
      { name: "Kazakhstan (Area)", value: 2724900, unit: "km²", type: "Area", fact: "The largest landlocked country in the world.", emoji: "🦅" },
      { name: "Algeria (Area)", value: 2381741, unit: "km²", type: "Area", fact: "Over 80% of its land is part of the Sahara Desert.", emoji: "🏜️" }
    ]
  },
  "entertainment": {
    category: "Entertainment & Media",
    title: "Pop Culture Hub",
    description: "Movies, music, influencers, and viral trends.",
    icon: "Film",
    entities: [
      // BOX OFFICE (Updated 2024/2025)
      { name: "Avatar", value: 2923706026, unit: "USD", type: "Box Office", fact: "Returned to the #1 spot after multiple re-releases.", emoji: "👽" },
      { name: "Avengers: Endgame", value: 2799439100, unit: "USD", type: "Box Office", fact: "The culmination of 22 films in the Marvel Cinematic Universe.", emoji: "🦸" },
      { name: "Avatar: Way of Water", value: 2320250281, unit: "USD", type: "Box Office", fact: "Took 13 years to produce the sequel to the original hit.", emoji: "🌊" },
      { name: "Titanic", value: 2264743305, unit: "USD", type: "Box Office", fact: "Held the #1 spot for 12 consecutive years from 1997.", emoji: "🚢" },
      { name: "Star Wars: Ep VII", value: 2071310218, unit: "USD", type: "Box Office", fact: "The fastest film to reach $1 billion (12 days).", emoji: "✨" },
      { name: "Avengers: Infinity War", value: 2052415039, unit: "USD", type: "Box Office", fact: "The first superhero movie to ever cross $2 billion.", emoji: "🦾" },
      { name: "Inside Out 2", value: 1696000000, unit: "USD", type: "Box Office", fact: "The highest-grossing animated film of all time as of 2024.", emoji: "🧠" },
      { name: "The Lion King (2019)", value: 1663075401, unit: "USD", type: "Box Office", fact: "A photorealistic remake of the 1994 Disney classic.", emoji: "🦁" },
      { name: "Barbie", value: 1445638421, unit: "USD", type: "Box Office", fact: "Warner Bros' highest-grossing film ever.", emoji: "💅" },
      { name: "Deadpool & Wolverine", value: 1337000000, unit: "USD", type: "Box Office", fact: "The highest-grossing R-rated film of all time.", emoji: "⚔️" },
      
      // FOLLOWERS (Updated 2024)
      { name: "Cristiano Ronaldo (IG)", value: 641000000, unit: "Followers", type: "Followers", fact: "The first person to reach 600 million followers on Instagram.", emoji: "⚽" },
      { name: "Lionel Messi (IG)", value: 504000000, unit: "Followers", type: "Followers", fact: "His World Cup victory post is the most liked in IG history.", emoji: "🏆" },
      { name: "Selena Gomez (IG)", value: 424000000, unit: "Followers", type: "Followers", fact: "The most followed woman on Instagram for several years.", emoji: "🎤" },
      { name: "Kylie Jenner (IG)", value: 396000000, unit: "Followers", type: "Followers", fact: "First woman to reach 300 million followers.", emoji: "💄" },
      { name: "Dwayne Johnson (IG)", value: 395000000, unit: "Followers", type: "Followers", fact: "The most followed actor on the platform.", emoji: "🤨" },
      { name: "MrBeast (YT)", value: 320000000, unit: "Subscribers", type: "Followers", fact: "The most subscribed individual YouTuber in history.", emoji: "🍔" }
    ]
  },
  "science_cosmos": {
    category: "Science & Cosmos",
    title: "The Universe",
    description: "Space missions, celestial bodies, and physics.",
    icon: "Rocket",
    entities: [
      // DIAMETER (Constants)
      { name: "Sun", value: 1391000, unit: "km", type: "Diameter", fact: "Contains 99.8% of the total mass in our Solar System.", emoji: "☀️" },
      { name: "Jupiter", value: 139820, unit: "km", type: "Diameter", fact: "Twice as massive as all other planets combined.", emoji: "🪐" },
      { name: "Saturn", value: 116460, unit: "km", type: "Diameter", fact: "Has a ring system spanning 282,000 km.", emoji: "🪐" },
      { name: "Uranus", value: 50724, unit: "km", type: "Diameter", fact: "Rotates on its side with an axial tilt of 98 degrees.", emoji: "🧊" },
      { name: "Neptune", value: 49244, unit: "km", type: "Diameter", fact: "The first planet located through mathematical prediction.", emoji: "🌬️" },
      { name: "Earth", value: 12742, unit: "km", type: "Diameter", fact: "The only planet not named after a Greek or Roman deity.", emoji: "🌍" },
      { name: "Venus", value: 12104, unit: "km", type: "Diameter", fact: "Often called Earth's twin due to similar size and mass.", emoji: "🔥" },
      { name: "Mars", value: 6779, unit: "km", type: "Diameter", fact: "Home to the largest canyon in the Solar System, Valles Marineris.", emoji: "🔴" },
      { name: "Ganymede", value: 5268, unit: "km", type: "Diameter", fact: "The largest moon in the Solar System, bigger than Mercury.", emoji: "🌑" },
      { name: "Mercury", value: 4879, unit: "km", type: "Diameter", fact: "The smallest planet, only slightly larger than Earth's Moon.", emoji: "🌑" },
      
      // DISTANCE FROM SUN (Mean)
      { name: "Mercury (Dist)", value: 57900000, unit: "km", type: "Distance", fact: "A year on Mercury lasts only 88 Earth days.", emoji: "🏃" },
      { name: "Venus (Dist)", value: 108200000, unit: "km", type: "Distance", fact: "Its atmosphere is 90 times denser than Earth's.", emoji: "👯" },
      { name: "Earth (Dist)", value: 149600000, unit: "km", type: "Distance", fact: "Light takes about 8 minutes and 20 seconds to reach us.", emoji: "🏡" },
      { name: "Mars (Dist)", value: 227900000, unit: "km", type: "Distance", fact: "Home to the tallest mountain in the solar system, Olympus Mons.", emoji: "🌋" },
      { name: "Jupiter (Dist)", value: 778600000, unit: "km", type: "Distance", fact: "Has at least 95 moons orbiting it.", emoji: "👑" },
      { name: "Saturn (Dist)", value: 1433500000, unit: "km", type: "Distance", fact: "Visible to the naked eye since ancient times.", emoji: "🪐" }
    ]
  },
  "tech_future": {
    category: "Tech & Future",
    title: "Innovation",
    description: "AI, big tech, devices, and startups.",
    icon: "Laptop",
    entities: [
      // MARKET CAP (Updated late 2024 Estimates)
      { name: "NVIDIA", value: 3500000000000, unit: "USD", type: "Market Cap", fact: "Overtook Apple and Microsoft as the world's most valuable company in 2024.", emoji: "🎮" },
      { name: "Apple", value: 3450000000000, unit: "USD", type: "Market Cap", fact: "Launched Apple Intelligence in 2024 to enter the AI race.", emoji: "🍎" },
      { name: "Microsoft", value: 3100000000000, unit: "USD", type: "Market Cap", fact: "Early adopter of AI through its partnership with OpenAI.", emoji: "🪟" },
      { name: "Alphabet (Google)", value: 2100000000000, unit: "USD", type: "Market Cap", fact: "DeepMind and Google Research merged to accelerate AI development.", emoji: "🔍" },
      { name: "Amazon", value: 1950000000000, unit: "USD", type: "Market Cap", fact: "AWS remains the world's leading cloud infrastructure provider.", emoji: "📦" },
      { name: "Meta", value: 1450000000000, unit: "USD", type: "Market Cap", fact: "Over 3.2 billion people use at least one Meta app daily.", emoji: "♾️" },
      { name: "TSMC", value: 1000000000000, unit: "USD", type: "Market Cap", fact: "Produces almost all of the world's most advanced AI chips.", emoji: "🏗️" },
      { name: "Broadcom", value: 850000000000, unit: "USD", type: "Market Cap", fact: "Crucial provider of networking hardware for AI data centers.", emoji: "📡" },
      { name: "Tesla", value: 820000000000, unit: "USD", type: "Market Cap", fact: "Shifted focus heavily toward Robotaxis and Optimus robots.", emoji: "⚡" },
      { name: "Tencent", value: 500000000000, unit: "USD", type: "Market Cap", fact: "The largest gaming company in the world by revenue.", emoji: "🐧" },
      { name: "Samsung", value: 380000000000, unit: "USD", type: "Market Cap", fact: "The world's leading producer of memory chips and displays.", emoji: "📱" },
      { name: "Bitcoin (MCap)", value: 1300000000000, unit: "USD", type: "Market Cap", fact: "Reached new all-time highs in 2024 following the ETF launches.", emoji: "🪙" }
    ]
  }
};
