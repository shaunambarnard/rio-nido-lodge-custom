import React, { useState, useEffect } from 'react';

const RioNidoLodgeApp = () => {
  const [guestData, setGuestData] = useState({
    name: '',
    email: '',
    tripDuration: 1,
    interests: [],
    travelStyle: 'balanced',
    budget: 'moderate',
    allowAlternateDestinations: true,
    walkingRadius: 'half-mile'
  });

  const [generatedItinerary, setGeneratedItinerary] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const hotelConfig = {
    name: "Rio Nido Lodge",
    address: "14540 Canyon Two Road, Guerneville, CA 95446",
    phone: "(707) 869-0821",
    coordinates: { lat: 38.5024, lng: -122.9876 }
  };

  const interests = [
    { id: 'wine', label: 'Wine & Tastings', icon: '🍷' },
    { id: 'nature', label: 'Nature & Hiking', icon: '🌲' },
    { id: 'food', label: 'Food & Dining', icon: '🍽️' },
    { id: 'coast', label: 'Coastal Adventures', icon: '🌊' },
    { id: 'adventure', label: 'Outdoor Adventure', icon: '⛰️' },
    { id: 'relaxation', label: 'Relaxation & Spa', icon: '💆' }
  ];

  const budgetOptions = [
    { value: 'budget', label: 'Budget Conscious ($-$$)', icon: '💰', description: 'Great value, under $25-50 per person' },
    { value: 'moderate', label: 'Moderate Spending ($$-$$$)', icon: '💳', description: 'Balanced experiences, $50-100 per person' },
    { value: 'splurge', label: 'Luxury Experience ($$$-$$$$)', icon: '✨', description: 'Premium experiences, $100+ per person' }
  ];

  // Enhanced business database with budget categories and alternate destination data
  const businessDatabase = [
    // WINERIES & TASTINGS
    {
      category: 'wine',
      type: 'winery',
      name: 'Korbel Cellars',
      description: 'Historic sparkling wine producer with guided tours and tastings',
      address: '13250 River Rd, Guerneville, CA',
      distance: '2.5 miles',
      driveTime: '6 minutes',
      budget: 'moderate',
      price: '$20-30 tastings',
      rating: 4.4,
      hours: '10am-4:30pm daily',
      phone: '(707) 824-7000',
      specialties: ['Sparkling wines', 'Historic tours', 'Garden setting'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Guerneville town square', type: 'stop', driveTime: '3 min' },
        { name: 'Russian River beaches', type: 'detour', driveTime: '5 min' }
      ]
    },
    {
      category: 'wine',
      type: 'winery',
      name: 'Furthermore Wines',
      description: 'Boutique family winery specializing in Russian River Pinot Noir',
      address: '8465 Occidental Rd, Sebastopol, CA',
      distance: '15 miles',
      driveTime: '25 minutes',
      budget: 'moderate',
      price: '$25-35 tastings',
      rating: 4.6,
      hours: '11am-5pm Thu-Mon',
      phone: '(707) 823-1681',
      specialties: ['Pinot Noir', 'Estate wines', 'Intimate tastings'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Occidental village', type: 'stop', driveTime: '5 min' },
        { name: 'Bohemian Highway scenic drive', type: 'route', driveTime: '0 min' }
      ]
    },
    {
      category: 'wine',
      type: 'winery',
      name: 'Williams Selyem Winery',
      description: 'Prestigious Pinot Noir producer, reservations required',
      address: '7227 Westside Rd, Healdsburg, CA',
      distance: '18 miles',
      driveTime: '30 minutes',
      budget: 'splurge',
      price: '$45-75 tastings',
      rating: 4.8,
      hours: '11am-4pm by appointment',
      phone: '(707) 433-6425',
      specialties: ['Premium Pinot Noir', 'Vineyard designates', 'Exclusive allocation'],
      isSignature: true,
      bookingRequired: 'Advanced reservations essential',
      alternateDestinations: [
        { name: 'Westside Road scenic drive', type: 'route', driveTime: '0 min' },
        { name: 'Healdsburg town square', type: 'stop', driveTime: '10 min' }
      ]
    },

    // DINING ESTABLISHMENTS
    {
      category: 'food',
      type: 'restaurant',
      name: 'River\'s End Restaurant',
      description: 'Upscale California cuisine with Russian River mouth views',
      address: '11048 CA-1, Jenner, CA',
      distance: '12 miles',
      driveTime: '20 minutes',
      budget: 'splurge',
      price: '$40-65 entrees',
      rating: 4.3,
      hours: '4pm-8:30pm Wed-Sun',
      phone: '(707) 865-2484',
      specialties: ['Ocean views', 'California cuisine', 'Sunset dining'],
      isSignature: true,
      bookingRequired: 'Reservations recommended',
      alternateDestinations: [
        { name: 'Jenner headlands overlook', type: 'stop', driveTime: '2 min' },
        { name: 'Goat Rock Beach', type: 'detour', driveTime: '5 min' }
      ]
    },
    {
      category: 'food',
      type: 'restaurant',
      name: 'Seaside Metal Oyster Bar',
      description: 'Fresh oysters and seafood in a casual coastal setting',
      address: '16222 Main St, Guerneville, CA',
      distance: '1.2 miles',
      driveTime: '4 minutes',
      budget: 'moderate',
      price: '$18-35 entrees',
      rating: 4.5,
      hours: '4pm-9pm Wed-Sun',
      phone: '(707) 604-7250',
      specialties: ['Fresh oysters', 'Local seafood', 'Craft cocktails'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Guerneville town walk', type: 'stop', driveTime: '0 min' },
        { name: 'Russian River Art Gallery', type: 'stop', driveTime: '2 min' }
      ]
    },
    {
      category: 'food',
      type: 'restaurant',
      name: 'Terrapin Creek Cafe',
      description: 'Hidden culinary gem featuring seasonal coastal cuisine',
      address: '1580 Eastshore Rd, Bodega Bay, CA',
      distance: '25 miles',
      driveTime: '40 minutes',
      budget: 'splurge',
      price: '$38-55 entrees',
      rating: 4.7,
      hours: '5pm-9pm Thu-Mon',
      phone: '(707) 875-2700',
      specialties: ['Seasonal menu', 'Local ingredients', 'Wine pairings'],
      isSignature: true,
      bookingRequired: 'Advance reservations essential',
      alternateDestinations: [
        { name: 'Bodega Bay harbor', type: 'stop', driveTime: '5 min' },
        { name: 'Bodega Head scenic overlook', type: 'detour', driveTime: '8 min' }
      ]
    },
    {
      category: 'food',
      type: 'casual',
      name: 'Big Bottom Market',
      description: 'Gourmet market with prepared foods and local products',
      address: '16228 Main St, Guerneville, CA',
      distance: '1.3 miles',
      driveTime: '4 minutes',
      budget: 'budget',
      price: '$8-18 items',
      rating: 4.6,
      hours: '8am-7pm daily',
      phone: '(707) 604-7295',
      specialties: ['Gourmet sandwiches', 'Local products', 'Wine selection'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Guerneville town square', type: 'stop', driveTime: '1 min' },
        { name: 'Russian River Park', type: 'stop', driveTime: '3 min' }
      ]
    },

    // NATURE & OUTDOOR ACTIVITIES
    {
      category: 'nature',
      type: 'park',
      name: 'Armstrong Redwoods State Natural Reserve',
      description: 'Ancient coastal redwood grove with peaceful hiking trails',
      address: '17000 Armstrong Woods Rd, Guerneville, CA',
      distance: '2.8 miles',
      driveTime: '8 minutes',
      budget: 'budget',
      price: '$10 parking',
      rating: 4.8,
      hours: '8am-sunset daily',
      phone: '(707) 869-2015',
      specialties: ['Ancient redwoods', 'Easy hiking', 'Picnic areas'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Austin Creek Recreation Area', type: 'extension', driveTime: '10 min' },
        { name: 'Guerneville River Access', type: 'stop', driveTime: '8 min' }
      ]
    },
    {
      category: 'coast',
      type: 'beach',
      name: 'Goat Rock Beach',
      description: 'Dramatic coastline with harbor seals and stunning rock formations',
      address: 'Goat Rock Rd, Jenner, CA',
      distance: '13 miles',
      driveTime: '22 minutes',
      budget: 'budget',
      price: 'Free',
      rating: 4.6,
      hours: 'Sunrise-sunset',
      phone: 'N/A',
      specialties: ['Harbor seals', 'Photography', 'Tide pools'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Jenner village', type: 'stop', driveTime: '5 min' },
        { name: 'Russian River mouth overlook', type: 'stop', driveTime: '2 min' }
      ]
    },
    {
      category: 'adventure',
      type: 'activity',
      name: 'Redwood Canopy Tours',
      description: 'Zip-line adventure through the redwood canopy',
      address: '10 Kiln Ln, Occidental, CA',
      distance: '20 miles',
      driveTime: '35 minutes',
      budget: 'splurge',
      price: '$99-149 per person',
      rating: 4.9,
      hours: '9am-5pm daily, reservations required',
      phone: '(707) 847-3231',
      specialties: ['Zip-line tours', 'Canopy views', 'Adventure experience'],
      isSignature: true,
      bookingRequired: 'Advance booking required, weather dependent',
      alternateDestinations: [
        { name: 'Occidental village', type: 'stop', driveTime: '5 min' },
        { name: 'Bohemian Highway drive', type: 'route', driveTime: '0 min' }
      ]
    },

    // RELAXATION & SPA
    {
      category: 'relaxation',
      type: 'spa',
      name: 'Osmosis Day Spa Sanctuary',
      description: 'Japanese-inspired spa with cedar enzyme baths',
      address: '209 Bohemian Hwy, Freestone, CA',
      distance: '22 miles',
      driveTime: '35 minutes',
      budget: 'splurge',
      price: '$95-250 treatments',
      rating: 4.5,
      hours: '9am-6pm daily',
      phone: '(707) 823-8231',
      specialties: ['Cedar enzyme baths', 'Japanese gardens', 'Meditation gardens'],
      isSignature: true,
      bookingRequired: 'Advance reservations recommended',
      alternateDestinations: [
        { name: 'Freestone village', type: 'stop', driveTime: '3 min' },
        { name: 'Wild Flour Bread', type: 'stop', driveTime: '1 min' }
      ]
    },

    // ADDITIONAL SIGNATURE EXPERIENCES
    {
      category: 'wine',
      type: 'winery',
      name: 'Iron Horse Vineyards',
      description: 'Prestigious sparkling wine estate with stunning valley views',
      address: '9786 Ross Station Rd, Sebastopol, CA',
      distance: '16 miles',
      driveTime: '28 minutes',
      budget: 'splurge',
      price: '$35-65 tastings',
      rating: 4.9,
      hours: '10am-4:30pm daily',
      phone: '(707) 887-1507',
      specialties: ['Estate sparkling wines', 'Panoramic views', 'Historic ranch'],
      isSignature: true,
      bookingRequired: 'Reservations required for groups',
      alternateDestinations: [
        { name: 'Green Valley scenic drive', type: 'route', driveTime: '0 min' },
        { name: 'Sebastopol town square', type: 'stop', driveTime: '15 min' }
      ]
    },
    {
      category: 'food',
      type: 'restaurant',
      name: 'Farmhouse Inn Restaurant',
      description: 'Michelin-starred fine dining with farm-to-table excellence',
      address: '7871 River Rd, Forestville, CA',
      distance: '8 miles',
      driveTime: '15 minutes',
      budget: 'splurge',
      price: '$85-125 prix fixe',
      rating: 4.8,
      hours: '5:30pm-9pm Thu-Mon',
      phone: '(707) 887-3300',
      specialties: ['Michelin star', 'Farm-to-table', 'Wine pairings'],
      isSignature: true,
      bookingRequired: 'Advanced reservations essential',
      alternateDestinations: [
        { name: 'Forestville village', type: 'stop', driveTime: '2 min' },
        { name: 'Russian River vineyards', type: 'detour', driveTime: '5 min' }
      ]
    },
    {
      category: 'adventure',
      type: 'activity',
      name: 'Sonoma Canopy Tours',
      description: 'Spectacular zip-line adventure through ancient redwood forest',
      address: '6250 Bohemian Hwy, Occidental, CA',
      distance: '18 miles',
      driveTime: '32 minutes',
      budget: 'splurge',
      price: '$119-169 per person',
      rating: 4.9,
      hours: '9am-5pm daily, weather permitting',
      phone: '(707) 874-6060',
      specialties: ['Redwood canopy tours', 'Professional guides', 'All skill levels'],
      isSignature: true,
      bookingRequired: 'Advance booking required, weight restrictions apply',
      alternateDestinations: [
        { name: 'Occidental village square', type: 'stop', driveTime: '8 min' },
        { name: 'Bohemian Highway scenic drive', type: 'route', driveTime: '0 min' }
      ]
    },
    {
      category: 'coast',
      type: 'activity',
      name: 'Bodega Bay Sailing Adventures',
      description: 'Private sailing charters on the dramatic Sonoma Coast',
      address: '1875 Bay Flat Rd, Bodega Bay, CA',
      distance: '24 miles',
      driveTime: '38 minutes',
      budget: 'splurge',
      price: '$200-400 per person',
      rating: 4.7,
      hours: '9am-sunset, weather dependent',
      phone: '(707) 875-3495',
      specialties: ['Private sailing', 'Whale watching', 'Sunset cruises'],
      isSignature: true,
      bookingRequired: 'Advance reservations required, weather dependent',
      alternateDestinations: [
        { name: 'Bodega Bay harbor walk', type: 'stop', driveTime: '3 min' },
        { name: 'Bodega Head whale watching', type: 'detour', driveTime: '10 min' }
      ]
    },
    {
      category: 'nature',
      type: 'activity',
      name: 'Russian River Hot Air Balloon',
      description: 'Dawn balloon flights over Russian River wine country',
      address: 'Guerneville Airport, Guerneville, CA',
      distance: '3 miles',
      driveTime: '8 minutes',
      budget: 'splurge',
      price: '$225-295 per person',
      rating: 4.8,
      hours: 'Dawn flights daily, weather permitting',
      phone: '(707) 869-0404',
      specialties: ['Sunrise flights', 'Wine country views', 'Champagne toast'],
      isSignature: true,
      bookingRequired: 'Advance booking essential, early morning departure',
      alternateDestinations: [
        { name: 'Guerneville town square', type: 'stop', driveTime: '5 min' },
        { name: 'Russian River parks', type: 'stop', driveTime: '3 min' }
      ]
    },
    {
      category: 'relaxation',
      type: 'spa',
      name: 'Highland Dell Lodge Spa',
      description: 'Luxury spa treatments in a secluded redwood forest setting',
      address: '21050 River Blvd, Monte Rio, CA',
      distance: '4 miles',
      driveTime: '10 minutes',
      budget: 'splurge',
      price: '$150-300 treatments',
      rating: 4.6,
      hours: '9am-7pm daily',
      phone: '(707) 865-1759',
      specialties: ['Forest spa treatments', 'Couples massage', 'Redwood hot tubs'],
      isSignature: true,
      bookingRequired: 'Advance reservations recommended',
      alternateDestinations: [
        { name: 'Monte Rio village', type: 'stop', driveTime: '2 min' },
        { name: 'Russian River beach access', type: 'stop', driveTime: '1 min' }
      ]
    },
    {
      category: 'relaxation',
      type: 'spa',
      name: 'June Bug Skin & Body',
      description: 'Premier beauty boutique offering massage, facials, and full-body treatments',
      address: '16216 Main St, Guerneville, CA',
      distance: '1.1 miles',
      driveTime: '3 minutes',
      budget: 'moderate',
      price: '$75-150 treatments',
      rating: 4.5,
      hours: '10am-6pm Wed-Sun',
      phone: '(707) 869-4600',
      specialties: ['Lash extensions', 'Chemical peels', 'Spray tanning', 'Wedding services'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Guerneville town square', type: 'stop', driveTime: '1 min' },
        { name: 'Russian River Art Gallery', type: 'stop', driveTime: '2 min' }
      ]
    },
    {
      category: 'relaxation',
      type: 'retreat',
      name: 'Ratna Ling Retreat Center',
      description: 'Luxury meditation and yoga retreats in 120 acres of redwood forest',
      address: '3351 Cazadero Hwy, Cazadero, CA',
      distance: '20 miles',
      driveTime: '35 minutes',
      budget: 'splurge',
      price: '$300-500 per day',
      rating: 4.9,
      hours: 'Retreat schedules vary',
      phone: '(707) 632-5478',
      specialties: ['Buddhist meditation', 'Yoga retreats', 'Sound baths', 'Forest cottages'],
      isSignature: true,
      bookingRequired: 'Advanced booking essential for retreats',
      alternateDestinations: [
        { name: 'Cazadero village', type: 'stop', driveTime: '5 min' },
        { name: 'Austin Creek State Recreation Area', type: 'detour', driveTime: '15 min' }
      ]
    },
    {
      category: 'nature',
      type: 'wellness',
      name: 'Forest Bathing at Armstrong Woods',
      description: 'Guided Japanese forest bathing (shinrin-yoku) among ancient redwoods',
      address: '17000 Armstrong Woods Rd, Guerneville, CA',
      distance: '2.8 miles',
      driveTime: '8 minutes',
      budget: 'moderate',
      price: '$45-65 per person',
      rating: 4.7,
      hours: 'Morning sessions by appointment',
      phone: '(707) 869-2847',
      specialties: ['Mindfulness in nature', 'Stress reduction', 'Guided meditation walks'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Armstrong Redwoods visitor center', type: 'stop', driveTime: '0 min' },
        { name: 'Guerneville River Access', type: 'stop', driveTime: '8 min' }
      ]
    },
    {
      category: 'relaxation',
      type: 'wellness',
      name: 'Sound Bath Sessions',
      description: 'Therapeutic sound healing with crystal bowls and gongs in nature settings',
      address: 'Various outdoor locations near Guerneville',
      distance: '2-8 miles',
      driveTime: '5-15 minutes',
      budget: 'moderate',
      price: '$35-55 per session',
      rating: 4.6,
      hours: 'Evening sessions by appointment',
      phone: '(707) 604-9988',
      specialties: ['Crystal bowl healing', 'Group sessions', 'Private ceremonies'],
      isSignature: false,
      alternateDestinations: [
        { name: 'Russian River beaches', type: 'stop', driveTime: '3 min' },
        { name: 'Redwood grove locations', type: 'stop', driveTime: '5 min' }
      ]
    },
    {
      category: 'nature',
      type: 'wellness',
      name: 'Yoga Hiking at Sugarloaf Ridge',
      description: 'Guided hike combining easy trails with outdoor yoga and meditation',
      address: '2605 Adobe Canyon Rd, Kenwood, CA',
      distance: '25 miles',
      driveTime: '40 minutes',
      budget: 'moderate',
      price: '$55-75 per person',
      rating: 4.8,
      hours: 'Morning sessions, weather permitting',
      phone: '(707) 833-5712',
      specialties: ['Hiking + yoga', 'Nature meditation', 'Panoramic views'],
      isSignature: true,
      bookingRequired: 'Advance booking recommended, weather dependent',
      alternateDestinations: [
        { name: 'Kenwood village', type: 'stop', driveTime: '8 min' },
        { name: 'Sugarloaf State Park trails', type: 'extension', driveTime: '0 min' }
      ]
    },
    {
      category: 'relaxation',
      type: 'spa',
      name: 'Dawn Ranch Wellness Retreat',
      description: 'Comprehensive wellness retreat with forest bathing, yoga, and mindfulness',
      address: '16467 River Rd, Guerneville, CA',
      distance: '1.8 miles',
      driveTime: '5 minutes',
      budget: 'splurge',
      price: '$200-400 per day',
      rating: 4.7,
      hours: 'Day retreats and packages available',
      phone: '(707) 869-0656',
      specialties: ['Forest bathing', 'Meditation workshops', 'Holistic treatments', 'Healthy cuisine'],
      isSignature: true,
      bookingRequired: 'Advanced reservations required',
      alternateDestinations: [
        { name: 'Russian River access', type: 'stop', driveTime: '2 min' },
        { name: 'Guerneville downtown', type: 'stop', driveTime: '3 min' }
      ]
    },
    {
      category: 'nature',
      type: 'activity',
      name: 'Wild Mushroom & Foraging Walk',
      description: 'Expert-guided foraging in old-growth redwood understory with cooking lesson',
      address: 'Private forest preserve near Armstrong Woods',
      distance: '6 miles',
      driveTime: '12 minutes',
      budget: 'splurge',
      price: '$125-175 per person',
      rating: 4.9,
      hours: 'Morning tours by appointment',
      phone: '(707) 869-2847',
      specialties: ['Chanterelle mushrooms', 'Wild herbs', 'Seasonal foraging'],
      isSignature: true,
      bookingRequired: 'Advance booking essential, seasonal availability',
      alternateDestinations: [
        { name: 'Armstrong Redwoods visitor center', type: 'stop', driveTime: '3 min' },
        { name: 'Austin Creek hiking trails', type: 'extension', driveTime: '8 min' }
      ]
    }
  ];

  const signatureExperiences = businessDatabase.filter(business => business.isSignature);

  // Get signature experiences based on selected interests
  const getInterestBasedSignatureExperiences = () => {
    if (guestData.interests.length === 0) {
      // If no interests selected, show first 3 with variety
      return signatureExperiences.slice(0, 3);
    }

    // First, get signature experiences that match selected interests
    const matchingExperiences = signatureExperiences.filter(experience => 
      guestData.interests.includes(experience.category)
    );

    // Apply budget filtering to matching experiences
    const budgetFilteredMatching = filterBusinessesByBudget(matchingExperiences, guestData.budget);

    // Then get remaining signature experiences (different categories)
    const otherExperiences = signatureExperiences.filter(experience => 
      !guestData.interests.includes(experience.category)
    );
    const budgetFilteredOthers = filterBusinessesByBudget(otherExperiences, guestData.budget);

    // Create diverse mix: prioritize variety across categories and budgets
    const diverseExperiences = [];
    const usedCategories = new Set();
    const usedBudgets = new Set();

    // First pass: Add matching experiences with category/budget diversity
    for (const exp of budgetFilteredMatching) {
      if (diverseExperiences.length >= 3) break;
      if (!usedCategories.has(exp.category) || usedCategories.size < guestData.interests.length) {
        diverseExperiences.push(exp);
        usedCategories.add(exp.category);
        usedBudgets.add(exp.budget);
      }
    }

    // Second pass: Fill remaining slots prioritizing budget diversity
    const allAvailable = [...budgetFilteredMatching, ...budgetFilteredOthers];
    for (const exp of allAvailable) {
      if (diverseExperiences.length >= 3) break;
      if (!diverseExperiences.includes(exp)) {
        // Prefer experiences with different budget levels
        if (!usedBudgets.has(exp.budget) || usedBudgets.size < 2) {
          diverseExperiences.push(exp);
          usedBudgets.add(exp.budget);
        }
      }
    }

    // Third pass: Fill any remaining slots with best remaining options
    for (const exp of allAvailable) {
      if (diverseExperiences.length >= 3) break;
      if (!diverseExperiences.includes(exp)) {
        diverseExperiences.push(exp);
      }
    }
    
    // Return first 3 with maximum diversity
    return diverseExperiences.slice(0, 3);
  };

  const handleInterestToggle = (interestId) => {
    setGuestData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const filterBusinessesByBudget = (businesses, budget) => {
    if (budget === 'budget') {
      return businesses.filter(business => business.budget === 'budget' || business.budget === 'moderate');
    } else if (budget === 'moderate') {
      return businesses.filter(business => business.budget === 'moderate' || business.budget === 'splurge');
    } else { // splurge
      return businesses; // Show all options for splurge budget
    }
  };

  const generateItinerary = () => {
    if (!guestData.name || guestData.interests.length === 0) {
      alert('Please fill in your name and select at least one interest.');
      return;
    }

    // Get all businesses filtered by interests and budget
    let relevantBusinesses = businessDatabase.filter(business => 
      guestData.interests.includes(business.category)
    );
    relevantBusinesses = filterBusinessesByBudget(relevantBusinesses, guestData.budget);

    // Separate signature experiences from regular activities
    const availableSignatures = relevantBusinesses.filter(business => business.isSignature);
    const regularActivities = relevantBusinesses.filter(business => !business.isSignature);

    // Create diverse signature experience selection for itinerary
    const diverseSignatures = [];
    const usedCategories = new Set();
    const usedBudgets = new Set();

    // Prioritize diversity across categories and budgets
    for (const sig of availableSignatures) {
      if (diverseSignatures.length >= guestData.tripDuration) break;
      
      // Prefer experiences from different categories and budget levels
      const categoryBonus = !usedCategories.has(sig.category) ? 2 : 0;
      const budgetBonus = !usedBudgets.has(sig.budget) ? 1 : 0;
      
      if (diverseSignatures.length === 0 || categoryBonus > 0 || budgetBonus > 0) {
        diverseSignatures.push(sig);
        usedCategories.add(sig.category);
        usedBudgets.add(sig.budget);
      }
    }

    // Fill any remaining signature slots with best remaining options
    for (const sig of availableSignatures) {
      if (diverseSignatures.length >= guestData.tripDuration) break;
      if (!diverseSignatures.includes(sig)) {
        diverseSignatures.push(sig);
      }
    }

    // Sort regular activities by rating
    regularActivities.sort((a, b) => b.rating - a.rating);

    // Determine activities per day based on travel style
    const activitiesPerDay = {
      'relaxed': 2,
      'balanced': 3,
      'active': 4
    };

    const dailyCount = activitiesPerDay[guestData.travelStyle] || 3;

    // Create itinerary with one signature experience per day (if available)
    const itinerary = [];
    let regularActivityIndex = 0;

    for (let day = 1; day <= guestData.tripDuration; day++) {
      const dayActivities = [];
      
      // Add ONE signature experience for this day (if available)
      if (diverseSignatures[day - 1]) {
        dayActivities.push({
          time: '10:00 AM',
          activity: diverseSignatures[day - 1],
          hasAlternates: guestData.allowAlternateDestinations && diverseSignatures[day - 1].alternateDestinations?.length > 0,
          isAnchorExperience: true
        });
      }

      // Fill remaining slots with regular activities
      const remainingSlots = dailyCount - dayActivities.length;
      const timeSlots = ['9:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'];
      
      for (let i = 0; i < remainingSlots && regularActivityIndex < regularActivities.length; i++) {
        // Skip the signature experience time slot
        const timeIndex = dayActivities.length > 0 ? (i >= 1 ? i + 1 : 0) : i;
        
        dayActivities.push({
          time: timeSlots[timeIndex] || `${3 + i}:00 PM`,
          activity: regularActivities[regularActivityIndex],
          hasAlternates: guestData.allowAlternateDestinations && regularActivities[regularActivityIndex].alternateDestinations?.length > 0,
          isAnchorExperience: false
        });
        regularActivityIndex++;
      }

      // Sort activities by time for logical flow
      dayActivities.sort((a, b) => {
        const timeA = parseInt(a.time.split(':')[0]) + (a.time.includes('PM') && !a.time.includes('12:') ? 12 : 0);
        const timeB = parseInt(b.time.split(':')[0]) + (b.time.includes('PM') && !b.time.includes('12:') ? 12 : 0);
        return timeA - timeB;
      });

      if (dayActivities.length > 0) {
        itinerary.push({
          day,
          date: new Date(Date.now() + (day - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          }),
          activities: dayActivities,
          totalActivities: dayActivities.length,
          hasSignatureExperience: dayActivities.some(activity => activity.isAnchorExperience)
        });
      }
    }

    setGeneratedItinerary(itinerary);
    setCurrentDay(1);
  };

  const openExperienceModal = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const getBudgetIcon = (budget) => {
    switch(budget) {
      case 'budget': return '💰';
      case 'moderate': return '💳';
      case 'splurge': return '✨';
      default: return '💳';
    }
  };

  const getBudgetColor = (budget) => {
    switch(budget) {
      case 'budget': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-blue-600 bg-blue-50';
      case 'splurge': return 'text-purple-600 bg-purple-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const currentDayData = generatedItinerary.find(d => d.day === currentDay);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center">
          <div className="flex items-center space-x-4">
            {/* Logo placeholder - replace with actual logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center shadow-lg border-2 border-red-900 relative overflow-hidden">
              {/* Ornate vintage style inspired by their logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-900 to-red-800 opacity-90"></div>
              <div className="relative z-10 text-amber-100 font-bold text-lg tracking-wider">RN</div>
              {/* Decorative corners */}
              <div className="absolute top-1 left-1 w-2 h-2 border-l-2 border-t-2 border-amber-200 opacity-60"></div>
              <div className="absolute top-1 right-1 w-2 h-2 border-r-2 border-t-2 border-amber-200 opacity-60"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 border-l-2 border-b-2 border-amber-200 opacity-60"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-amber-200 opacity-60"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rio Nido Lodge</h1>
              <p className="text-sm text-red-700 font-medium">Mercantile & Cafe • Historic Retreat</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Guest Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Plan Your Perfect Stay
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Guest Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      placeholder="Enter your name"
                      value={guestData.name}
                      onChange={(e) => setGuestData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Trip Duration</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                      value={guestData.tripDuration}
                      onChange={(e) => setGuestData(prev => ({ ...prev, tripDuration: parseInt(e.target.value) }))}
                    >
                      {[1, 2, 3, 4, 5].map(days => (
                        <option key={days} value={days}>{days} day{days > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Budget Preference</label>
                  <div className="grid grid-cols-1 gap-3">
                    {budgetOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          guestData.budget === option.value
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setGuestData(prev => ({ ...prev, budget: option.value }))}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{option.icon}</span>
                            <div>
                              <p className="font-medium text-gray-900">{option.label}</p>
                              <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                          </div>
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            guestData.budget === option.value 
                              ? 'border-red-600 bg-red-600' 
                              : 'border-gray-300'
                          }`}>
                            {guestData.budget === option.value && (
                              <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
                  <select
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                    value={guestData.travelStyle}
                    onChange={(e) => setGuestData(prev => ({ ...prev, travelStyle: e.target.value }))}
                  >
                    <option value="relaxed">Relaxed Explorer (2 activities/day)</option>
                    <option value="balanced">Balanced Adventure (3 activities/day)</option>
                    <option value="active">Active Adventurer (4 activities/day)</option>
                  </select>
                </div>

                {/* Alternate Destinations Toggle */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Include Alternate Destinations</p>
                    <p className="text-sm text-gray-600">Show optional stops and detours along your routes</p>
                  </div>
                  <button
                    onClick={() => setGuestData(prev => ({ ...prev, allowAlternateDestinations: !prev.allowAlternateDestinations }))}
                    className={`w-12 h-6 rounded-full transition-all ${
                      guestData.allowAlternateDestinations ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      guestData.allowAlternateDestinations ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                {/* Interests Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">What interests you?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest) => {
                      const isSelected = guestData.interests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => handleInterestToggle(interest.id)}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            isSelected
                              ? 'border-red-600 bg-red-50 text-red-800'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className={`text-lg mb-2 ${isSelected ? 'text-red-700' : 'text-gray-500'}`}>
                            {interest.icon}
                          </div>
                          <p className="text-sm font-medium">{interest.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={generateItinerary}
                  className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-4 px-8 rounded-xl hover:from-red-800 hover:to-red-900 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Generate My Itinerary
                </button>
              </div>
            </div>

            {/* Signature Experiences */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-purple-600 text-2xl">✨</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Signature Experiences</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                  {guestData.interests.length > 0 
                    ? 'Premium anchor experiences - one per day to build your itinerary around' 
                    : 'Select your interests above to see personalized day-anchoring experiences'
                  }
                </p>
              </div>
              <div className="space-y-6">
                {getInterestBasedSignatureExperiences().map((experience, index) => {
                  const isMatchingInterest = guestData.interests.includes(experience.category);
                  return (
                  <div
                    key={index}
                    onClick={() => openExperienceModal(experience)}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      isMatchingInterest 
                        ? 'bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 shadow-md hover:shadow-lg' 
                        : 'bg-gray-50 border border-gray-200 hover:bg-purple-50 hover:border-purple-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{experience.name}</h4>
                          {isMatchingInterest && (
                            <span className="text-xs px-2 py-1 rounded-full bg-red-200 text-red-800">
                              Matches your interests
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{experience.description}</p>
                        <div className="flex items-center space-x-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${getBudgetColor(experience.budget)}`}>
                            {getBudgetIcon(experience.budget)} {experience.budget}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <span className="mr-1">🚗</span>
                            {experience.driveTime}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <span className="mr-1">⭐</span>
                            {experience.rating}
                          </span>
                        </div>
                      </div>
                      <span className="text-purple-400 ml-3 text-lg">✨</span>
                    </div>
                  </div>
                )})}
              </div>
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 italic">
                  {guestData.interests.length > 0 
                    ? 'Each signature experience becomes the anchor for one full day' 
                    : 'Select interests above to see day-anchoring experiences'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Generated Itinerary */}
          <div className="space-y-6">
            {generatedItinerary.length > 0 && (
              <>
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {guestData.name ? `${guestData.name}'s` : 'Your'} Hyperlocal Experience
                    </h2>
                    <p className="text-red-700">
                      {guestData.tripDuration} day{guestData.tripDuration > 1 ? 's' : ''} of curated local gems near {hotelConfig.name}
                    </p>
                    <div className="flex items-center justify-center space-x-4 mt-2">
                      <span className={`text-sm px-3 py-1 rounded-full ${getBudgetColor(guestData.budget)}`}>
                        {getBudgetIcon(guestData.budget)} {guestData.budget.charAt(0).toUpperCase() + guestData.budget.slice(1)} Budget
                      </span>
                      {guestData.allowAlternateDestinations && (
                        <span className="text-sm px-3 py-1 rounded-full bg-orange-50 text-orange-600">
                          <span className="mr-1">🗺️</span>
                          Alternate routes included
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Day Navigation */}
                  <div className="flex space-x-2 overflow-x-auto mb-6">
                    {generatedItinerary.map((dayData) => (
                      <button
                        key={dayData.day}
                        onClick={() => setCurrentDay(dayData.day)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                          currentDay === dayData.day
                            ? 'bg-red-700 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Day {dayData.day}
                        <span className="block text-xs opacity-75">
                          {dayData.totalActivities} activities
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Current Day Details */}
                  {currentDayData && (
                    <div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                          Day {currentDay}
                          {currentDayData.hasSignatureExperience && (
                            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600">
                              <span className="mr-1">✨</span>
                              Anchor Day
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600">{currentDayData.date}</p>
                      </div>

                      <div className="space-y-4">
                        {currentDayData.activities.map((item, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-gray-400">🕐</span>
                                  <span className="text-sm font-medium text-gray-600">{item.time}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getBudgetColor(item.activity.budget)}`}>
                                    {getBudgetIcon(item.activity.budget)} {item.activity.budget}
                                  </span>
                                  {item.activity.isSignature && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-purple-50 text-purple-600">
                                      <span className="mr-1">✨</span>
                                      {item.isAnchorExperience ? 'Anchor Experience' : 'Signature'}
                                    </span>
                                  )}
                                </div>
                                
                                <h4 className="font-semibold text-gray-900 mb-1">{item.activity.name}</h4>
                                <p className="text-gray-600 text-sm mb-2">{item.activity.description}</p>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <span>📍</span>
                                    <span>{item.activity.distance}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <span>🚗</span>
                                    <span>{item.activity.driveTime}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <span>⭐</span>
                                    <span>{item.activity.rating}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <span>💰</span>
                                    <span>{item.activity.price}</span>
                                  </div>
                                </div>

                                {/* Alternate Destinations */}
                                {item.hasAlternates && (
                                  <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                                    <p className="text-xs font-medium text-orange-700 mb-1">Alternative stops along the way:</p>
                                    <div className="space-y-1">
                                      {item.activity.alternateDestinations.map((alt, altIndex) => (
                                        <div key={altIndex} className="flex items-center space-x-2 text-xs text-orange-600">
                                          <span>🧭</span>
                                          <span>{alt.name}</span>
                                          <span className="text-orange-500">({alt.type}, +{alt.driveTime})</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {item.activity.isSignature && (
                                <button
                                  onClick={() => openExperienceModal(item.activity)}
                                  className="ml-4 text-purple-600 hover:text-purple-800"
                                >
                                  <span className="text-lg">✨</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {generatedItinerary.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full opacity-20"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ready to explore?</h3>
                <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                  Fill out your preferences above and we'll create a personalized itinerary featuring the best local experiences just for you.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      {isModalOpen && selectedExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedExperience.name}</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">{selectedExperience.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>{selectedExperience.distance} away</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>🕐</span>
                    <span>{selectedExperience.driveTime} drive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>⭐</span>
                    <span>{selectedExperience.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>💰</span>
                    <span>{selectedExperience.price}</span>
                  </div>
                </div>

                {selectedExperience.specialties && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.specialties.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedExperience.bookingRequired && (
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span>📅</span>
                      <span className="text-sm font-medium text-yellow-800">Booking Required</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">{selectedExperience.bookingRequired}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <a
                    href={`tel:${selectedExperience.phone}`}
                    className="flex-1 bg-red-700 text-white py-2 px-4 rounded-lg text-center hover:bg-red-800 transition-colors"
                  >
                    <span className="mr-2">📞</span>
                    Call to Book
                  </a>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RioNidoLodgeApp;
