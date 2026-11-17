export const nav = [
  { label: "About", href: "#about" },
  { label: "Model Influencers", href: "#influencers" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export const heroBrands = [
  { name: "Dahlia", image: "/images/hero/dahlia.png", logo: "/images/hero/logo-dahlia.png" },
  { name: "El Silencio", image: "/images/hero/el-silencio.png", logo: "/images/hero/logo-el-silencio.png" },
  { name: "Vivaia", image: "/images/hero/vivaia.png", logo: "/images/hero/logo-vivaia.png" },
  { name: "McLaren", image: "/images/hero/mclaren.png", logo: "/images/hero/logo-mclaren.svg" },
  { name: "KOR Shots", image: "/images/hero/kor.png", logo: "/images/hero/logo-kor.png" },
];

export const press = [
  { name: "GQ", logo: "/images/press/gq.svg" },
  { name: "Variety", logo: "/images/press/variety.svg" },
  { name: "Maxim", logo: "/images/press/maxim.svg" },
  { name: "Harper's Bazaar", logo: "/images/press/bazaar.svg" },
  { name: "OK!", logo: "/images/press/ok.svg" },
  { name: "USA Today", logo: "/images/press/usa-today.svg" },
];

export const services = [
  {
    title: "Content Production Agency",
    body: "Editorial-grade photo and video, shot with model talent and built for the feed, the billboard and everything in between.",
    image: "/images/projects/dahlia-tequila/1.png",
  },
  {
    title: "Influencer Marketing",
    body: "Campaigns led by top model influencers that drive engagement, amplify brand image and build cultural relevance.",
    image: "/images/projects/kor-shots-coachella/2.png",
  },
  {
    title: "Brand Strategy and Development",
    body: "Positioning, voice and creative direction that make premium brands impossible to scroll past.",
    image: "/images/projects/vivaia/2.png",
  },
  {
    title: "Targeted Growth",
    body: "Audience-first distribution that turns impressions into followers, and followers into customers.",
    image: "/images/projects/mclaren/1.png",
  },
  {
    title: "Guaranteed High-Tier Press",
    body: "Placement in the titles that matter — GQ, Variety, Maxim, Harper's Bazaar, OK! and more.",
    image: "/images/projects/el-silencio/9.png",
  },
];

export type Influencer = { name: string; tiktok?: string; instagram: string; image: string };

const inf = (name: string, instagram: string, tiktok?: string): Influencer => ({
  name,
  instagram,
  tiktok,
  image: `/images/influencers/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`,
});

export const influencers: Influencer[] = [
  inf("Alessandra Ambrosio", "11M", "457k"),
  inf("Sara Sampaio", "8.5M", "766.8k"),
  inf("Candice Swanepoel", "18.5M", "590k"),
  inf("Emily DiDonato", "2.6M", "412k"),
  inf("Josephine Skriver", "8.0M", "99.7k"),
  inf("Roosmarijn de Kok", "447.5k"),
  inf("Juliana Herz", "618k", "330k"),
  inf("Noel Capri Berry", "576.5k"),
  inf("Mahlagha", "3.4M", "310k"),
  inf("Jessica Killings", "1.0M", "2.0M"),
  inf("Joy Corrigan", "777.4k", "391.2k"),
  inf("Emma Hernan", "2.0M"),
  inf("Hailee Lautenbach", "554.2k"),
  inf("Kelsie Jean Smeby", "695k", "120k"),
  inf("Zita Vass", "752.6k"),
  inf("Angie Landaburu", "2.0M"),
  inf("Abla Sofy", "989.1k", "20.9k"),
  inf("Lateysha Grace", "1M", "287.4k"),
  inf("Anne V", "518k", "100k"),
  inf("Tatiana Mityushina", "408k", "100k"),
  inf("Bakin Champion", "255k", "100k"),
  inf("Alina Baikova", "420k", "100k"),
  inf("Abby Champion", "337.6k"),
  inf("Ella Rose", "748k"),
];

export const expertise = [
  "Precision talent booking",
  "Cutting-edge content development",
  "Strategic influencer campaigns",
  "Competitor disruption",
  "Seamless project management",
  "Talent synergy",
  "Dynamic growth",
];

export type Project = {
  name: string;
  tag: string;
  logo: string;
  invertLogo?: boolean;
  squareLogo?: boolean;
  images: string[];
};

const shots = (dir: string, ids: number[]) => ids.map((i) => `/images/projects/${dir}/${i}.png`);

export const projects: Project[] = [
  { name: "Dahlia Tequila", tag: "Spirits · Content", logo: "/images/hero/logo-dahlia.png", images: shots("dahlia-tequila", [1, 3, 2, 5, 6]) },
  { name: "KOR Shots Coachella", tag: "Festival · Activation", logo: "/images/projects/logo-kor-wildfox.png", invertLogo: true, images: shots("kor-shots-coachella", [1, 2, 3, 4, 5]) },
  { name: "Adidas + Urban Outfitters", tag: "Fashion · Campaign", logo: "/images/projects/logo-adidas-uo.svg", invertLogo: true, images: shots("adidas-urban-outfitters", [15, 21, 25, 36, 43]) },
  { name: "McLaren Automotive + O’Gara Coach Co", tag: "Automotive · Event", logo: "/images/hero/logo-mclaren.svg", images: shots("mclaren", [1, 2, 3, 4, 5]) },
  { name: "Vivaia", tag: "Footwear · Content", logo: "/images/hero/logo-vivaia.png", images: shots("vivaia", [1, 2, 3, 5, 4]) },
  { name: "El Silencio Mezcal", tag: "Spirits · Campaign", logo: "/images/hero/logo-el-silencio.png", images: shots("el-silencio", [9, 10, 7, 11, 12]) },
  { name: "Hyatt Hotels", tag: "Hospitality · Stays", logo: "/images/clients/hyatt.png", squareLogo: true, images: shots("hyatt-hotels", [1, 2, 3, 4, 5]) },
  { name: "MGM Hotels + TAO Group", tag: "Hospitality · Nightlife", logo: "/images/clients/mgm.png", squareLogo: true, images: shots("mgm-hotels-and-tao-group", [4, 5, 7, 8, 9]) },
];

export const clients = [
  "adidas.svg", "mgm.png", "tao.png", "wildfox.png", "ferrari.png", "f1.png",
  "ralph-lauren.svg", "mclaren.png", "hyatt.png", "david-yurman.svg", "sbe.svg", "nascar.svg",
  "dahlia.png", "el-silencio.png", "vivaia.png", "joah-brown.png", "path-water.png", "adl.svg",
].map((f) => ({ name: f.replace(/\.(png|svg)$/, "").replace(/-/g, " "), logo: `/images/clients/${f}` }));

export const trust = [
  {
    k: "01",
    title: "Recommendation beats interruption",
    body: "Consumers are more likely to purchase a product recommended by an influencer they follow, rather than respond to a sponsored ad forced on their page by an unfamiliar brand.",
  },
  {
    k: "02",
    title: "Lower cost per engagement",
    body: "If you’re using your influencer marketing to promote content, consider how much more cost effective each influencer’s cost per engagement is compared to other marketing channels.",
  },
  {
    k: "03",
    title: "Reach that compounds",
    body: "If you’re using your influencer marketing program to expand brand reach, look into how many impressions you are able to generate with our influencers.",
  },
];

export const contact = {
  email: "RWI@RunwayInfluence.com",
  phone: "(800) 510-4564",
  phoneHref: "tel:+18005104564",
  address: ["6600 Sunset Blvd.", "Los Angeles, CA 90028"],
};
