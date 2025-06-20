
export type ProjectCategory = 'Web Development' | 'Mobile App' | 'UI/UX Design' | 'Branding' | 'Illustration' | 'Game Design';
export type ProjectPurpose = 'Commercial' | 'Personal' | 'Open Source' | 'Experimental' | 'Educational';

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: ProjectCategory;
  purpose: ProjectPurpose;
  tags: string[];
  featured: boolean;
};

// Generate projects with our actual images
const generateProjects = (): Project[] => {
  const projects: Project[] = [];
  
  const categories: ProjectCategory[] = [
    'Web Development', 
    'Mobile App', 
    'UI/UX Design', 
    'Branding', 
    'Illustration', 
    'Game Design'
  ];
  
  const purposes: ProjectPurpose[] = [
    'Commercial', 
    'Personal', 
    'Open Source', 
    'Experimental', 
    'Educational'
  ];
  
  const webTags = ['React', 'TypeScript', 'NextJS', 'Tailwind', 'WordPress', 'Vue', 'Angular'];
  const mobileTags = ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android'];
  const designTags = ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Wireframing', 'Prototyping'];
  const brandTags = ['Logo Design', 'Identity', 'Style Guide', 'Marketing', 'Packaging'];
  const illustrationTags = ['Digital Art', 'Character Design', 'Concept Art', 'Vector'];
  const gameTags = ['Unity', 'Unreal Engine', 'Level Design', '3D Modeling', 'Game Mechanics'];
  
  const projectNames = [
    // Web Projects
    "Portfolio Website", "E-commerce Platform", "Blog System", "Social Network", "Dashboard UI",
    "Landing Page", "Personal Blog", "Admin Panel", "Weather App", "Task Manager",
    "Recipe Finder", "Real Estate Website", "Fitness Tracker", "Learning Management System", "Event Booking",
    "Job Board", "News Portal", "Photography Portfolio", "Crypto Dashboard", "Music Streaming App",
    
    // Mobile Projects
    "Fitness App", "Food Delivery", "Social Media App", "Budget Tracker", "Task Manager Mobile",
    "Dating App", "Travel Companion", "Language Learning", "Meditation App", "Shopping List",
    "Photo Editor", "Weather Mobile", "Notes App", "Habit Tracker", "Music Player",
    "Flashcards App", "Recipe Book", "Chat Application", "Workout Timer", "Plant Care App",
    
    // UI/UX Projects
    "Banking App UI", "Travel Booking UI", "Streaming Platform UI", "Smart Home App", "Fitness Dashboard",
    "E-learning Platform", "Real Estate Browsing", "Medical Portal", "Project Management", "Creative Agency Website",
    "Dating App Interface", "Restaurant Ordering", "Podcast Platform", "Gaming Dashboard", "Social Media Redesign",
    "Music App Interface", "News Reader UI", "Educational Platform", "NFT Marketplace", "Remote Work Tools",
    
    // Branding Projects
    "Tech Startup Branding", "Restaurant Rebranding", "Fashion Brand Identity", "Sports Team Logo", "Coffee Shop Branding",
    "Organic Food Brand", "Fitness Center Identity", "App Brand Kit", "Beauty Product Line", "Jewelry Brand",
    "Craft Beer Identity", "Financial Advisor Branding", "Bakery Brand", "Non-profit Organization", "Photography Studio",
    "Literary Magazine", "Music Festival", "Yoga Studio", "Electric Vehicle Brand", "Sustainable Products",
    
    // Illustrations
    "Character Set", "Icon Collection", "Editorial Illustrations", "Background Art", "Game Assets",
    "Mascot Design", "Children's Book", "Digital Portrait Series", "Nature Scenes", "Fantasy World",
    "Comic Book Pages", "Product Illustrations", "Isometric Scenes", "UI Icons", "Architectural Illustrations",
    "Food Illustrations", "Fashion Sketches", "Animal Characters", "City Landscapes", "Science Infographics",
    
    // Game Design
    "Puzzle Game", "Adventure Game", "Mobile Arcade", "Strategy Game", "RPG Concept",
    "Racing Game", "Platform Game", "VR Experience", "Educational Game", "Survival Game",
    "Card Game", "City Builder", "Interactive Story", "Horror Game", "Sports Simulation",
    "Battle Royale", "Word Game", "Physics Sandbox", "Music Rhythm Game", "Tower Defense"
  ];

  const getTagsByCategory = (category: ProjectCategory): string[] => {
    switch(category) {
      case 'Web Development': return webTags;
      case 'Mobile App': return mobileTags;
      case 'UI/UX Design': return designTags;
      case 'Branding': return brandTags;
      case 'Illustration': return illustrationTags;
      case 'Game Design': return gameTags;
    }
  };
  
  // All available images - prioritize the newly uploaded anime images
  const projectImages = [
    // New anime images - prioritize these
    "/roshan-uploads/a68b43ed-2d14-421c-afa3-37f2a86a6910.png",
    "/roshan-uploads/aacab256-6acd-4c74-85ba-997c4f88ffc0.png",
    "/roshan-uploads/8961a269-c659-4678-85b7-69b5787776d6.png",
    "/roshan-uploads/70babae8-b638-4ea2-90d9-90e51e5da112.png",
    "/roshan-uploads/c9205b3a-aff1-4fa1-81c9-c47e217697c8.png",
    "/roshan-uploads/0ba9cf8c-b63a-42fc-8cba-ccd31a06bceb.png",
    "/roshan-uploads/197bca13-2193-462c-a006-d5463fa5b146.png",
    "/roshan-uploads/17973d62-44be-4d16-ab3e-c995e4f34270.png",
    "/roshan-uploads/9de3d4de-b73d-477c-b607-5c05c83d324e.png",
    "/roshan-uploads/76109c82-9f0f-4096-a208-ff0f670222b0.png",
    "/roshan-uploads/a665699e-ebdc-4063-b7a7-1a756babae15.png",
    "/roshan-uploads/b75cae58-f7fd-4d8c-bd04-1f3b6a644a52.png",
    "/roshan-uploads/158e22be-0a56-48ea-97f4-675bff34433f.png",
    "/roshan-uploads/7851deb1-fc95-4e9b-ba6d-77b844a49ce2.png",
    "/roshan-uploads/c23b2303-17fe-4f6a-a48a-d31ddf3e29b3.png",
    "/roshan-uploads/16c4051c-024e-4933-8630-88dc59ccc963.png",
    "/roshan-uploads/939f88a3-e0b1-4b35-bffd-a3caf7b943ab.png",
    "/roshan-uploads/eeae1e74-a6a2-421f-a49f-0b1ad476803a.png",
    "/roshan-uploads/abdd6e7c-7c37-41c1-a733-ff57f940bdf0.png",
    "/roshan-uploads/8b1eb019-db40-4a3e-ad2f-9436a8260b62.png",
    
    // Previously added images as backup
    "/roshan-uploads/92d67f78-cd26-4f87-874a-0123e7257943.png",
    "/roshan-uploads/ddfd2a75-f471-4195-bfdd-7e617a580a32.png",
    "/roshan-uploads/6641327f-ea60-4ccb-92a6-0ff708152211.png",
    "/roshan-uploads/c7d58d26-5095-4544-a5b8-c40c84b88c1f.png",
    "/roshan-uploads/7043a7e6-09ef-41ad-a8a4-da3c1db432e2.png",
    "/roshan-uploads/69e1431a-8cdb-432e-bec7-9e253ec80384.png",
    "/roshan-uploads/7627b101-2485-4cb8-baaa-090f476c669e.png",
    "/roshan-uploads/8accf1f9-bcc2-4114-ac84-9264230471df.png",
    "/roshan-uploads/ed529300-9da1-4b31-a472-adfa6878548f.png",
    "/roshan-uploads/2328de5b-9748-4760-a5bd-b1f14bd3f3c8.png",
    "/roshan-uploads/a9fa38e2-c95f-4e08-aac3-24a43e190df9.png",
    "/roshan-uploads/145c76fc-8fb4-4e97-8545-e0400a15e262.png",
    "/roshan-uploads/84eed588-f9b0-4d76-8b33-52607d01a533.png",
    "/roshan-uploads/e3c21b13-4ee5-4bce-8b19-44e54ec6da37.png",
    "/roshan-uploads/e530edac-4dc6-4b13-973b-9628cc411732.png",
    "/roshan-uploads/e94b65e7-17cf-4ed2-84eb-6e3f0e495fb0.png",
    "/roshan-uploads/79446a87-590a-4633-a733-685b6c3541ea.png",
    "/roshan-uploads/ae5998cf-fc1b-431f-9ec3-ea56127edfdc.png"
  ];

  for (let i = 0; i < 108; i++) {
    const categoryIndex = i % categories.length;
    const category = categories[categoryIndex];
    const purpose = purposes[Math.floor(Math.random() * purposes.length)];
    
    // Get project name by cycling through the list
    const projectName = projectNames[i % projectNames.length];
    
    // Get 2-3 tags based on the category
    const availableTags = getTagsByCategory(category);
    const numTags = 2 + Math.floor(Math.random() * 2); // 2 or 3 tags
    const shuffledTags = [...availableTags].sort(() => 0.5 - Math.random());
    const tags = shuffledTags.slice(0, numTags);
    
    // Create a descriptive name with variation
    const title = `${projectName} ${Math.floor(i / projectNames.length) + 1}`;

    // Cycle through our available images - make sure we use modulo to stay within bounds
    const image = projectImages[i % projectImages.length];
    
    // Determine if the project is featured (around 10% of projects)
    const featured = Math.random() < 0.1;

    projects.push({
      id: i + 1,
      title,
      description: `A ${purpose.toLowerCase()} ${category.toLowerCase()} project showcasing ${tags.join(', ')} skills.`,
      image,
      category,
      purpose,
      tags,
      featured,
    });
  }

  return projects;
};

export const projects = generateProjects();

export const getFilterOptions = () => {
  const categories = Array.from(new Set(projects.map(p => p.category)));
  const purposes = Array.from(new Set(projects.map(p => p.purpose)));
  return { categories, purposes };
};
