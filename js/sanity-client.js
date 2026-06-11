/**
 * ============================================================
 * SANITY-CLIENT.JS — Edgemont School
 * Sanity CMS Integration for Vanilla JS Frontend
 * ============================================================
 */
'use strict';

// ─── Sanity Configurations ────────────────────────────────────
// Replace these with your actual credentials when you create your Sanity Project
const SANITY_CONFIG = {
  projectId: '1n6mnv89', // Replace with your Project ID
  dataset: 'production',               // Usually 'production'
  apiVersion: '2023-05-03',            // API version date
  useCdn: true                         // Set to true for fast cached responses
};

let client = null;
let imageBuilder = null;

// Initialize Sanity Client if client library is loaded via CDN
if (typeof sanityClient !== 'undefined') {
  client = sanityClient.createClient(SANITY_CONFIG);

  if (typeof imageUrlBuilder !== 'undefined') {
    imageBuilder = imageUrlBuilder(client);
  }
} else {
  console.warn('Sanity Client SDK not loaded. Loading fallback static mock data.');
}

/**
 * Image URL Builder Helper
 * Converts a Sanity image reference to a CDN URL.
 */
function urlFor(source) {
  if (!imageBuilder || !source) return '';
  return imageBuilder.image(source).url();
}

// ─── Content Fetch API ───────────────────────────────────────

/**
 * Fetch notices from Notice Board
 * Returns latest 3 notices
 */
async function fetchNotices() {
  if (!client) return getMockNotices();
  try {
    const query = `*[_type == "notice"] | order(date desc)[0...3] {
      title,
      date,
      tag,
      content
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch notices from Sanity:', error);
    return getMockNotices(); // Fallback to mock content
  }
}

/**
 * Fetch news & events cards
 */
async function fetchNews() {
  if (!client) return getMockNews();
  try {
    const query = `*[_type == "news"] | order(date desc) {
      title,
      date,
      category,
      summary,
      mainImage,
      infoBox
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch news from Sanity:', error);
    return getMockNews(); // Fallback to mock content
  }
}

/**
 * Fetch facilities
 */
async function fetchFacilities() {
  if (!client) return getMockFacilities();
  try {
    const query = `*[_type == "facility"] | order(title asc) {
      title,
      description,
      mainImage,
      label,
      benefits,
      tags,
      isAdditional
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch facilities from Sanity:', error);
    return getMockFacilities(); // Fallback to mock content
  }
}

/**
 * Fetch Testimonials
 */
async function fetchTestimonials() {
  if (!client) return getMockTestimonials();
  try {
    const query = `*[_type == "testimonial"] | order(_createdAt desc)[0...3] {
      stars,
      text,
      authorName,
      authorRole
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error('Failed to fetch testimonials from Sanity:', error);
    return getMockTestimonials(); // Fallback to mock content
  }
}

// ─── Local Fallback / Mock Data ────────────────────────────────
// These match the initial static contents of the site so the layout never breaks

function getMockNotices() {
  return [
    {
      title: "Annual Science & Innovation Fair 2025",
      date: "2025-06-15",
      tag: "Event",
      content: "Students from Classes 6–12 will present research models and innovation projects on campus."
    },
    {
      title: "Admissions Open for Academic Year 2025–26",
      date: "2025-06-10",
      tag: "Admission",
      content: "Applications are open for Classes 1 to 11. Parents are requested to complete inquiries early."
    },
    {
      title: "State Cricket Championship Victory",
      date: "2025-06-05",
      tag: "Achievement",
      content: "Congratulations to our Under-17 team for winning the State Cricket Trophy."
    }
  ];
}

function getMockNews() {
  return [
    {
      title: "Edgemont Wins State Cricket Championship for Second Consecutive Year",
      date: "2025-06-10",
      category: "achievement",
      summary: "Our Under-17 cricket team defeated 42 schools across Delhi NCR to claim the prestigious State Cricket Championship trophy. Captain Rohit Verma (Class 11) led the team brilliantly with a century in the final.",
      mainImage: { alt: "State Cricket Championship Winner" },
      imageUrl: "images/sports_complex.png",
      infoBox: "The team will now represent Delhi at the National School Games in August 2025."
    },
    {
      title: "Annual Science & Innovation Fair 2025 — Open to Parents",
      date: "2025-06-15",
      category: "event",
      summary: "Students from Classes 6–12 will present 80+ science, technology, and social projects. Three IIT Delhi professors have been invited as judges. All parents are warmly invited.",
      mainImage: { alt: "Annual Science & Innovation Fair" },
      imageUrl: "images/science_fair.png"
    },
    {
      title: "Admissions Now Open for Academic Year 2025–26",
      date: "2025-06-05",
      category: "announcement",
      summary: "We are pleased to announce that applications are now being accepted for Classes Nursery to Class 11 for the upcoming academic year. Limited seats are available.",
      mainImage: { alt: "Admissions Open 2026-27" },
      imageUrl: "images/admissions.png"
    },
    {
      title: "12 Students Win Medals at National Science Olympiad 2025",
      date: "2025-05-28",
      category: "achievement",
      summary: "Edgemont School students swept the National Science Olympiad with 4 Gold, 5 Silver, and 3 Bronze medals. We ranked 2nd overall among 1,200 participating schools.",
      mainImage: { alt: "National Science Olympiad Medals" },
      imageUrl: "images/olympiad.png"
    },
    {
      title: "Class 10 & 12 CBSE Board Results — 100% Pass Rate",
      date: "2025-05-20",
      category: "exam",
      summary: "Edgemont School proudly announces 100% results for the 15th consecutive year. 45 students scored above 95% in Class 12 and 62 students in Class 10. Topper: Priya Sharma (99.4%).",
      mainImage: { alt: "CBSE Board Examination Results" },
      imageUrl: "images/smart_classroom.png"
    },
    {
      title: "Annual Cultural Fest \"Utsav 2025\" — A Grand Celebration",
      date: "2025-05-10",
      category: "event",
      summary: "Over 600 students performed in 3-day cultural extravaganza featuring classical dance, western music, drama, debate, and art exhibitions. Event was attended by 2,000+ parents and guests.",
      mainImage: { alt: "Annual Cultural Fest Performance" },
      imageUrl: "images/cultural_fest.png"
    },
    {
      title: "Summer Vacation: 15 May to 30 June 2025",
      date: "2025-04-30",
      category: "announcement",
      summary: "The school will remain closed for summer vacation from 15th May to 30th June 2025. Summer camp sessions (optional) will be held from 1–14 June. Registration open on school portal.",
      mainImage: { alt: "Summer Camp Vacation Activities" },
      imageUrl: "images/summer_camp.png"
    }
  ];
}

function getMockFacilities() {
  return [
    {
      title: "Smart Classrooms",
      description: "Interactive digital boards and audio-visual systems create engaging lessons that bring concepts to life. Climate-controlled environment with ergonomic furniture.",
      label: "80 Classrooms",
      isAdditional: false,
      benefits: [
        "Interactive digital whiteboard in every classroom",
        "Live streaming and recording capabilities for remote learning",
        "Individual tablet access for Classes 6 and above",
        "Climate-controlled environment with ergonomic furniture",
        "Noise-cancelling acoustic panels for focused learning"
      ],
      mainImage: { alt: "Smart Classroom" },
      imageUrl: "images/smart_classroom.png"
    },
    {
      title: "Science Laboratories",
      description: "Separate labs for Physics, Chemistry, and Biology equipped with advanced instruments for practical learning. safety-first design with trained assistants.",
      label: "3 Labs",
      isAdditional: false,
      benefits: [
        "Advanced microscopes, spectroscopes, and scientific instruments",
        "Chemical fume hoods and safety showers in Chemistry lab",
        "Digital oscilloscopes and physics measurement kits",
        "Trained lab assistants for guided experiments",
        "Safety-first design with fire extinguishers and first-aid kits"
      ],
      mainImage: { alt: "Science Laboratory" },
      imageUrl: "images/science_laboratory.png"
    },
    {
      title: "Computer Laboratory",
      description: "200+ high-performance computers with fiber-optic internet, licensed software, coding tools, and a 3D printing studio.",
      label: "200+ PCs",
      isAdditional: false,
      benefits: [
        "200+ Intel Core i7 workstations with 16GB RAM",
        "Dedicated Robotics and AI/ML lab for Classes 9–12",
        "1 Gbps fiber internet with content filtering",
        "Python, JavaScript, and block-based coding programs",
        "3D printing and design studio"
      ],
      mainImage: { alt: "Computer Laboratory" },
      imageUrl: "images/computer_laboratory.png"
    },
    {
      title: "Library & Resource Centre",
      description: "Our library houses over 25,000 books, periodicals, and digital resources. It's a quiet haven for readers, researchers, and curious minds of all ages.",
      label: "25,000+ Books",
      isAdditional: false,
      benefits: [
        "25,000+ books across fiction, non-fiction, and reference",
        "Digital library with access to 1 lakh+ e-books and journals",
        "Newspaper and magazine reading area",
        "Audiobook and language learning resources",
        "Dedicated children's reading corner for primary students"
      ],
      mainImage: { alt: "Library & Resource Centre" },
      imageUrl: "images/school_library.png"
    },
    {
      title: "Sports Complex",
      description: "A comprehensive sports complex that develops physical fitness, team spirit, and athletic excellence. Students have represented Delhi at state and national levels.",
      label: "Multi-Sport",
      isAdditional: false,
      benefits: [
        "Olympic-size 50m swimming pool with trained coaches",
        "Full-size cricket ground with floodlights",
        "Basketball, volleyball, and badminton courts",
        "400m athletic track with synthetic surface",
        "Indoor sports hall for table tennis, chess, and gymnastics"
      ],
      mainImage: { alt: "Sports Complex" },
      imageUrl: "images/sports_complex.png"
    },
    {
      title: "Transport Facility",
      description: "GPS-tracked AC buses covering 40+ routes across Delhi NCR with trained drivers and attendants.",
      isAdditional: true,
      tags: ["40+ Routes", "GPS Tracked", "AC Buses"],
      mainImage: { alt: "Transport Facility" },
      imageUrl: "images/school_bus.png"
    },
    {
      title: "Cafeteria",
      description: "Hygienic, FSSAI-certified cafeteria serving nutritious vegetarian meals and snacks. Monthly menu shared with parents.",
      isAdditional: true,
      tags: ["FSSAI Certified", "Vegetarian", "Nutritious"],
      mainImage: { alt: "Cafeteria" },
      imageUrl: "images/school_cafeteria.png"
    },
    {
      title: "Medical Room",
      description: "Full-time nurse and visiting doctor 3 days a week. Fully equipped first-aid center for student health emergencies.",
      isAdditional: true,
      tags: ["Full-time Nurse", "Doctor Visits", "First Aid"],
      mainImage: { alt: "Medical Room" },
      imageUrl: "images/medical_room.png"
    }
  ];
}

function getMockTestimonials() {
  return [
    {
      stars: 5,
      text: "The transformation in my daughter since she joined Edgemont has been remarkable. The teachers genuinely care about every child's growth, and the facilities are outstanding.",
      authorName: "Sunita Agarwal",
      authorRole: "Parent of Class 8 Student"
    },
    {
      stars: 5,
      text: "My son was shy and reserved, but Edgemont's holistic approach — sports, drama, academics — brought out the best in him. He's now confident and thriving.",
      authorName: "Rakesh Malhotra",
      authorRole: "Parent of Class 10 Student"
    },
    {
      stars: 5,
      text: "The school's focus on values and character, alongside academics, is what sets it apart. My children have learnt discipline, empathy, and leadership here.",
      authorName: "Priya Nair",
      authorRole: "Parent of Two Students"
    }
  ];
}
