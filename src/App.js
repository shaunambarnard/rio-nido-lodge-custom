import React, { useState, useMemo, useCallback } from 'react';
import { MapPin, Clock, Star, Users, Car, DollarSign, Navigation, Phone, Calendar, Coffee, Utensils, Camera, TreePine, Waves, Mountain, Wine, Home, Sparkles, Heart, Route, ExternalLink, Search, Plus, ChevronLeft, ChevronRight, Mail } from 'lucide-react';

// Move data to separate constants for better performance
const BUSINESSES = {
  food: [
    {
      name: "boon eat + drink",
      type: "Farm-to-Table Restaurant",
      description: "Celebrity Chef Crista Luedtke's flagship farm-to-table restaurant",
      rating: 4.9,
      budget: "splurge",
      hours: "5:00 PM - 9:00 PM",
      location: "16248 Main St, Guerneville",
      phone: "(707) 869-0780",
      website: "boonhotels.com",
      priceRange: "$$$",
      category: "restaurant"
    },
    {
      name: "Road Trip",
      type: "Casual American",
      description: "Chef Crista Luedtke's casual spot famous for the Mac Daddy burger",
      rating: 4.7,
      budget: "moderate",
      hours: "11:00 AM - 9:00 PM",
      location: "16248 Main St, Guerneville",
      phone: "(707) 869-0780",
      website: "boonhotels.com",
      priceRange: "$$",
      category: "restaurant"
    },
    {
      name: "El Barrio",
      type: "Mexican Cantina",
      description: "Lively spot with craft cocktails and elevated Mexican street food",
      rating: 4.6,
      budget: "budget",
      hours: "4:00 PM - 10:00 PM",
      location: "16233 Main St, Guerneville",
      phone: "(707) 604-7601",
      website: "elbarrioguerneville.com",
      priceRange: "$",
      category: "restaurant"
    },
    {
      name: "Pat's Restaurant",
      type: "Classic Diner",
      description: "Local breakfast favorite with hearty portions and friendly service",
      rating: 4.3,
      budget: "budget",
      hours: "7:00 AM - 2:00 PM",
      location: "16236 Main St, Guerneville",
      phone: "(707) 869-9904",
      website: "patsrestaurantguerneville.com",
      priceRange: "$",
      category: "restaurant"
    },
    {
      name: "The Farmhand",
      type: "Farm Fresh Restaurant",
      description: "Farm-fresh restaurant with craft cocktails and local ingredients",
      rating: 4.5,
      budget: "moderate",
      hours: "4:00 PM - 9:00 PM",
      location: "16235 Main St, Guerneville",
      phone: "(707) 604-7014",
      website: "thefarmhandguerneville.com",
      priceRange: "$$",
      category: "restaurant"
    },
    {
      name: "Seaside Metal",
      type: "Oyster Bar",
      description: "Fresh oysters and natural wines with Tuesday half-price nights",
      rating: 4.4,
      budget: "moderate",
      hours: "4:00 PM - 9:00 PM",
      location: "16222 Main St, Guerneville",
      phone: "(707) 604-7041",
      website: "seasidemetal.com",
      priceRange: "$$",
      category: "restaurant"
    },
    {
      name: "Hazel",
      type: "New American",
      description: "Farm-to-table restaurant with wine-focused menu and local ingredients",
      rating: 4.8,
      budget: "splurge",
      hours: "5:00 PM - 9:00 PM",
      location: "109 Plaza St, Sebastopol",
      phone: "(707) 827-3462",
      website: "hazelrestaurant.com",
      priceRange: "$$$",
      category: "restaurant"
    },
    {
      name: "Hole in the Wall",
      type: "Breakfast & Lunch",
      description: "Famous breakfast spot with Dutch baby pancakes and biscuits & gravy",
      rating: 4.6,
      budget: "budget",
      hours: "7:00 AM - 2:00 PM",
      location: "6940 Sebastopol Ave, Sebastopol",
      phone: "(707) 823-2484",
      website: "holeinthewall.com",
      priceRange: "$",
      category: "restaurant"
    }
  ],
  wine: [
    {
      name: "Williams Selyem Winery",
      type: "Legendary Pinot Noir",
      description: "Cult producer of Russian River Valley Pinot Noir, allocation-only wines",
      rating: 4.9,
      budget: "splurge",
      hours: "10:00 AM - 4:00 PM",
      location: "7227 Westside Rd, Healdsburg",
      phone: "(707) 433-6425",
      website: "williamsselyem.com",
      priceRange: "$$$",
      category: "winery"
    },
    {
      name: "Furthermore Wines",
      type: "Small-Production Artisan",
      description: "Family-owned, small production Pinot, winemaker often pours personally",
      rating: 4.8,
      budget: "moderate",
      hours: "11:00 AM - 5:00 PM",
      location: "8803 Bohemian Hwy, Occidental",
      phone: "(707) 874-8000",
      website: "furthermorewines.com",
      priceRange: "$$",
      category: "winery"
    },
    {
      name: "Porter Creek Vineyards",
      type: "Organic Family Winery",
      description: "Tiny organic winery with 1970s old-vine Pinot, hillside vineyard",
      rating: 4.7,
      budget: "moderate",
      hours: "10:30 AM - 4:30 PM",
      location: "8735 Westside Rd, Healdsburg",
      phone: "(707) 433-6321",
      website: "portercreekvineyards.com",
      priceRange: "$$",
      category: "winery"
    }
  ],
  activities: [
    {
      name: "Armstrong Redwoods State Natural Reserve",
      type: "Nature Reserve",
      description: "Ancient redwood forest with hiking trails among 800-year-old giants",
      rating: 4.8,
      budget: "budget",
      hours: "8:00 AM - sunset",
      location: "17000 Armstrong Woods Rd, Guerneville",
      phone: "(707) 869-2015",
      website: "parks.ca.gov",
      priceRange: "$",
      category: "nature"
    },
    {
      name: "Russian River Canoeing",
      type: "Water Recreation",
      description: "Peaceful canoe trips through redwood groves along the Russian River",
      rating: 4.6,
      budget: "moderate",
      hours: "9:00 AM - 6:00 PM",
      location: "20 Healdsburg Ave, Healdsburg",
      phone: "(707) 433-7247",
      website: "russianriveradventures.com",
      priceRange: "$$",
      category: "recreation"
    }
  ],
  coffee: [
    {
      name: "Coffee Bazaar",
      type: "Local Coffee Shop",
      description: "Longtime local favorite with house-roasted coffee and pastries",
      rating: 4.5,
      budget: "budget",
      hours: "6:00 AM - 3:00 PM",
      location: "14045 Armstrong Woods Rd, Guerneville",
      phone: "(707) 869-9706",
      website: "coffeebazaar.com",
      priceRange: "$",
      category: "coffee"
    },
    {
      name: "Big Bottom Market",
      type: "Gourmet Market & Cafe",
      description: "Gourmet market with artisanal coffee and famous biscuits",
      rating: 4.6,
      budget: "moderate",
      hours: "8:00 AM - 6:00 PM",
      location: "16228 Main St, Guerneville",
      phone: "(707) 604-7295",
      website: "bigbottommarket.com",
      priceRange: "$$",
      category: "coffee"
    }
  ],
  wellness: [
    {
      name: "Osmosis Day Spa Sanctuary",
      type: "Full-Service Spa",
      description: "Japanese-inspired cedar enzyme baths and massage treatments",
      rating: 4.7,
      budget: "splurge",
      hours: "9:00 AM - 6:00 PM",
      location: "209 Bohemian Hwy, Freestone",
      phone: "(707) 823-8231",
      website: "osmosis.com",
      priceRange: "$$$",
      category: "wellness"
    }
  ]
};

const SIGNATURE_EXPERIENCES = [
  {
    id: 'redwood_meditation',
    name: 'Private Redwood Grove Meditation',
    description: 'Guided meditation among 800-year-old redwoods at dawn',
    location: 'Armstrong Redwoods State Natural Reserve',
    distance: '8 miles',
    duration: '90 minutes',
    price: '$45 per person',
    budget: 'budget',
    category: 'wellness',
    bestTime: 'sunrise',
    includes: ['Private certified guide', 'Meditation mat', 'Light refreshments']
  },
  {
    id: 'wine_blending',
    name: 'Master Winemaker Blending Session',
    description: 'Create your own custom wine blend with master winemaker at Furthermore Wines',
    location: 'Furthermore Wines',
    distance: '8 miles',
    duration: '2.5 hours',
    price: '$125 per person',
    budget: 'moderate',
    category: 'wine',
    bestTime: 'afternoon',
    includes: ['Private winemaker session', 'Premium barrel tastings', 'Custom bottle creation']
  },
  {
    id: 'vintner_dinner',
    name: 'Williams Selyem Vintner\'s Dinner',
    description: 'Exclusive 5-course dinner with winemaker and vineyard tour',
    location: 'Williams Selyem Winery',
    distance: '12 miles',
    duration: '4 hours',
    price: '$285 per person',
    budget: 'splurge',
    category: 'wine',
    bestTime: 'evening',
    includes: ['5-course chef dinner', 'Rare wine library tastings', 'Private vineyard tour', 'Meet the winemaker']
  }
];

const INTERESTS = [
  { id: 'wine', name: 'Wine Tasting', icon: Wine },
  { id: 'nature', name: 'Nature & Hiking', icon: TreePine },
  { id: 'food', name: 'Food & Dining', icon: Utensils },
  { id: 'adventure', name: 'Outdoor Adventure', icon: Mountain },
  { id: 'wellness', name: 'Relaxation & Spa', icon: Heart },
  { id: 'culture', name: 'Arts & Culture', icon: Camera }
];

const RioNidoLodgeApp = () => {
  const [guestData, setGuestData] = useState({
    name: '',
    tripDuration: 3,
    budget: 'moderate',
    travelStyle: 'moderate',
    interests: []
  });

  const [generatedItinerary, setGeneratedItinerary] = useState([]);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedSignatureExperience, setSelectedSignatureExperience] = useState(null);
  const [alternativesModal, setAlternativesModal] = useState({ 
    isOpen: false, 
    dayIndex: null, 
    activityIndex: null, 
    alternatives: [] 
  });

  // Improved time parsing with proper AM/PM handling
  const parseTime = useCallback((timeStr) => {
    if (!timeStr) return null;
    
    try {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      
      let hour24 = hours;
      if (period === 'PM' && hours !== 12) {
        hour24 += 12;
      } else if (period === 'AM' && hours === 12) {
        hour24 = 0;
      }
      
      return hour24;
    } catch (error) {
      console.warn('Failed to parse time:', timeStr);
      return null;
    }
  }, []);

  const isBusinessOpen = useCallback((business) => {
    if (!business?.hours) return true;
    
    const now = new Date();
    const currentHour = now.getHours();
    
    try {
      const [openStr, closeStr] = business.hours.split(' - ');
      const openHour = parseTime(openStr);
      const closeHour = parseTime(closeStr);
      
      if (openHour === null || closeHour === null) return true;
      
      // Handle overnight hours (e.g., 10 PM - 2 AM)
      if (closeHour < openHour) {
        return currentHour >= openHour || currentHour < closeHour;
      }
      
      return currentHour >= openHour && currentHour < closeHour;
    } catch (error) {
      console.warn('Error checking business hours:', error);
      return true;
    }
  }, [parseTime]);

  // Memoized calculations
  const allBusinesses = useMemo(() => [
    ...BUSINESSES.food,
    ...BUSINESSES.wine,
    ...BUSINESSES.activities,
    ...BUSINESSES.coffee,
    ...BUSINESSES.wellness
  ], []);

  const filteredBusinesses = useMemo(() => 
    allBusinesses.filter(business => 
      guestData.budget === 'splurge' || 
      business.budget === guestData.budget || 
      business.budget === 'budget'
    ), [allBusinesses, guestData.budget]
  );

  const diverseSignatureExperiences = useMemo(() => {
    const budgetFiltered = SIGNATURE_EXPERIENCES.filter(exp => 
      guestData.budget === 'splurge' || exp.budget === guestData.budget || exp.budget === 'budget'
    );

    const budget = budgetFiltered.filter(exp => exp.budget === 'budget');
    const moderate = budgetFiltered.filter(exp => exp.budget === 'moderate');
    const splurge = budgetFiltered.filter(exp => exp.budget === 'splurge');

    const diverse = [];
    
    if (budget.length > 0) diverse.push(budget[0]);
    if (moderate.length > 0 && diverse.length < 3) diverse.push(moderate[0]);
    if (splurge.length > 0 && diverse.length < 3 && guestData.budget === 'splurge') {
      diverse.push(splurge[0]);
    }

    const remaining = budgetFiltered.filter(exp => !diverse.includes(exp));
    while (diverse.length < 3 && remaining.length > 0) {
      diverse.push(remaining.shift());
    }

    return diverse.slice(0, 3);
  }, [guestData.budget]);

  const getBudgetIcon = useCallback((budget) => {
    const icons = { budget: '$', moderate: '$$', splurge: '$$$' };
    return icons[budget] || '$$';
  }, []);

  const generateItinerary = useCallback(() => {
    if (!guestData.name.trim()) {
      alert('Please fill in your name');
      return;
    }

    const usedBusinesses = new Set();
    const days = [];

    for (let day = 1; day <= guestData.tripDuration; day++) {
      const dayActivities = [];
      
      // Morning activity
      const morningOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'nature' || b.category === 'coffee' ||
         (b.category === 'winery' && b.hours.includes('10:00 AM')))
      );
      
      if (morningOptions.length > 0) {
        const morning = morningOptions[Math.floor(Math.random() * morningOptions.length)];
        usedBusinesses.add(morning.name);
        dayActivities.push({
          time: '10:00 AM',
          activity: morning,
          alternatives: morningOptions.filter(b => 
            b.name !== morning.name && !usedBusinesses.has(b.name)
          ).slice(0, 3)
        });
      }

      // Lunch
      const lunchOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        b.category === 'restaurant' && 
        (b.hours.includes('11:') || b.hours.includes('12:') || b.hours.includes('7:00 AM'))
      );
      
      if (lunchOptions.length > 0) {
        const lunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
        usedBusinesses.add(lunch.name);
        dayActivities.push({
          time: '1:00 PM',
          activity: lunch,
          alternatives: lunchOptions.filter(b => 
            b.name !== lunch.name && !usedBusinesses.has(b.name)
          ).slice(0, 3)
        });
      }

      // Afternoon activity
      const afternoonOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'winery' || b.category === 'wellness' || b.category === 'recreation')
      );
      
      if (afternoonOptions.length > 0) {
        const afternoon = afternoonOptions[Math.floor(Math.random() * afternoonOptions.length)];
        usedBusinesses.add(afternoon.name);
        dayActivities.push({
          time: '3:30 PM',
          activity: afternoon,
          alternatives: afternoonOptions.filter(b => 
            b.name !== afternoon.name && !usedBusinesses.has(b.name)
          ).slice(0, 3)
        });
      }

      // Dinner (only if not relaxed pace)
      if (guestData.travelStyle !== 'relaxed') {
        const dinnerOptions = filteredBusinesses.filter(b => 
          !usedBusinesses.has(b.name) && 
          b.category === 'restaurant' && 
          (b.hours.includes('5:00 PM') || b.hours.includes('6:00 PM'))
        );
        
        if (dinnerOptions.length > 0) {
          const dinner = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
          usedBusinesses.add(dinner.name);
          dayActivities.push({
            time: '7:00 PM',
            activity: dinner,
            alternatives: dinnerOptions.filter(b => 
              b.name !== dinner.name && !usedBusinesses.has(b.name)
            ).slice(0, 3)
          });
        }
      }

      days.push({
        day: day,
        date: new Date(Date.now() + day * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        }),
        activities: dayActivities
      });
    }

    setGeneratedItinerary(days);
  }, [guestData, filteredBusinesses]);

  const refreshSingleActivity = useCallback((dayIndex, activityIndex) => {
    const currentActivity = generatedItinerary[dayIndex].activities[activityIndex];
    const timeSlot = currentActivity.time;
    
    const usedBusinesses = new Set();
    generatedItinerary.forEach((day, dIndex) => {
      day.activities.forEach((act, aIndex) => {
        if (!(dIndex === dayIndex && aIndex === activityIndex)) {
          usedBusinesses.add(act.activity.name);
        }
      });
    });

    let availableOptions = [];

    if (timeSlot.includes('10:00 AM')) {
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'nature' || b.category === 'coffee' ||
         (b.category === 'winery' && b.hours.includes('10:00 AM')))
      );
    } else if (timeSlot.includes('1:00 PM')) {
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        b.category === 'restaurant'
      );
    } else if (timeSlot.includes('3:30 PM')) {
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        (b.category === 'winery' || b.category === 'wellness' || b.category === 'recreation')
      );
    } else if (timeSlot.includes('7:00 PM')) {
      availableOptions = filteredBusinesses.filter(b => 
        !usedBusinesses.has(b.name) && 
        b.category === 'restaurant'
      );
    }

    if (availableOptions.length > 0) {
      const newActivity = availableOptions[Math.floor(Math.random() * availableOptions.length)];
      const updatedItinerary = [...generatedItinerary];
      
      updatedItinerary[dayIndex].activities[activityIndex] = {
        time: timeSlot,
        activity: newActivity,
        alternatives: availableOptions.filter(b => b.name !== newActivity.name).slice(0, 3)
      };
      
      setGeneratedItinerary(updatedItinerary);
    } else {
      alert('No more options available for this time slot. Try using the alternatives instead.');
    }
  }, [generatedItinerary, filteredBusinesses]);

  const showAlternatives = useCallback((dayIndex, activityIndex, alternatives) => {
    setAlternativesModal({
      isOpen: true,
      dayIndex,
      activityIndex,
      alternatives
    });
  }, []);

  const replaceActivity = useCallback((dayIndex, activityIndex, newActivity) => {
    const updatedItinerary = [...generatedItinerary];
    const originalActivity = updatedItinerary[dayIndex].activities[activityIndex].activity;
    
    updatedItinerary[dayIndex].activities[activityIndex] = {
      ...updatedItinerary[dayIndex].activities[activityIndex],
      activity: newActivity,
      alternatives: [originalActivity, ...updatedItinerary[dayIndex].activities[activityIndex].alternatives.filter(alt => alt.name !== newActivity.name)].slice(0, 3)
    };
    
    setGeneratedItinerary(updatedItinerary);
    setAlternativesModal({ isOpen: false, dayIndex: null, activityIndex: null, alternatives: [] });
  }, [generatedItinerary]);

  const handleSignatureExperienceClick = useCallback((experience) => {
    setSelectedSignatureExperience(experience);
    setShowSignatureModal(true);
  }, []);

  const addSignatureExperience = useCallback((experience) => {
    if (generatedItinerary.length === 0) {
      alert('Please generate an itinerary first');
      return;
    }

    const updatedItinerary = [...generatedItinerary];
    if (updatedItinerary[0] && updatedItinerary[0].activities.length < 5) {
      updatedItinerary[0].activities.splice(1, 0, {
        time: experience.bestTime === 'sunrise' ? '7:00 AM' : 
              experience.bestTime === 'evening' ? '6:00 PM' : '11:00 AM',
        activity: {
          name: experience.name,
          type: experience.category,
          description: experience.description,
          location: experience.location,
          phone: 'Contact concierge',
          rating: 5.0,
          budget: experience.budget,
          category: 'signature',
          priceRange: experience.price,
          hours: 'By appointment'
        },
        alternatives: []
      });
      setGeneratedItinerary(updatedItinerary);
      setShowSignatureModal(false);
      alert(`${experience.name} added to your itinerary!`);
    } else {
      alert('Day 1 is full. Please remove an activity first or contact our concierge.');
    }
  }, [generatedItinerary]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-red-800 to-red-900 rounded-lg flex items-center justify-center shadow-lg relative border-2 border-yellow-500">
                <span className="text-white font-bold text-xl tracking-tight z-10">RN</span>
                <div className="absolute inset-0 rounded-lg border border-yellow-400 opacity-70"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-800">Rio Nido Lodge</h1>
                <p className="text-stone-600 text-sm">Mercantile & Cafe • Historic Retreat</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {generatedItinerary.length === 0 ? (
          // Guest Information Form
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-stone-800 mb-2">Plan Your Perfect Stay</h2>
            </div>

            <div className="space-y-6">
              {/* Name and Trip Duration */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Guest Name</label>
                  <input
                    type="text"
                    value={guestData.name}
                    onChange={(e) => setGuestData({...guestData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Trip Duration</label>
                  <select
                    value={guestData.tripDuration}
                    onChange={(e) => setGuestData({...guestData, tripDuration: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value={1}>1 day</option>
                    <option value={2}>2 days</option>
                    <option value={3}>3 days</option>
                    <option value={4}>4 days</option>
                  </select>
                </div>
              </div>

              {/* Budget Preference */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">Budget Preference</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'budget', title: 'Budget Conscious ($-$$)', desc: 'Great value under $25-50 per person' },
                    { id: 'moderate', title: 'Moderate Spending ($$-$$$)', desc: 'Balanced experiences, $50-100 per person' },
                    { id: 'splurge', title: 'Luxury Experience ($$$-$$$$)', desc: 'Premium experiences, $100+ per person' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setGuestData({...guestData, budget: option.id})}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        guestData.budget === option.id
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="font-medium">{option.title}</div>
                      <div className="text-sm text-stone-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Travel Style</label>
                <select
                  value={guestData.travelStyle}
                  onChange={(e) => setGuestData({...guestData, travelStyle: e.target.value})}
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="relaxed">Relaxed (2 activities/day)</option>
                  <option value="moderate">Moderate (3 activities/day)</option>
                  <option value="fast-paced">Fast Paced (4 activities/day)</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-3">What interests you?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {INTERESTS.map(interest => {
                    const IconComponent = interest.icon;
                    return (
                      <button
                        key={interest.id}
                        onClick={() => {
                          const newInterests = guestData.interests.includes(interest.id)
                            ? guestData.interests.filter(i => i !== interest.id)
                            : [...guestData.interests, interest.id];
                          setGuestData({...guestData, interests: newInterests});
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          guestData.interests.includes(interest.id)
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 mb-2" />
                        <div className="text-sm font-medium">{interest.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center pt-6">
                <button
                  onClick={generateItinerary}
                  className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Generate My Itinerary
                </button>
              </div>
            </div>

            {/* Signature Experiences */}
            <div className="mt-16 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-stone-900 mb-2">Signature Experiences</h2>
                <p className="text-stone-600">Premium experiences to anchor your stay</p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="grid md:grid-cols-3 gap-6">
                    {diverseSignatureExperiences.map((experience) => (
                      <div 
                        key={experience.id}
                        className="border border-stone-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleSignatureExperienceClick(experience)}
                      >
                        <h3 className="font-bold text-stone-800 text-sm mb-3">{experience.name}</h3>
                        <p className="text-stone-600 text-xs mb-3 line-clamp-2">{experience.description}</p>
                        
                        <div className="space-y-1 text-xs text-stone-500">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{experience.distance}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            <span className="font-medium text-red-600">{experience.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Generated Itinerary Display
          <div className="space-y-8">
            {/* Itinerary Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-stone-800">Your Personal Itinerary</h2>
                  <p className="text-stone-600">Created for {guestData.name} • {guestData.tripDuration} day{guestData.tripDuration > 1 ? 's' : ''}</p>
                </div>
                <button
                  onClick={() => setGeneratedItinerary([])}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Start Over
                </button>
              </div>
            </div>

            {/* Daily Itinerary */}
            <div className="space-y-6">
              {generatedItinerary.map((day, dayIndex) => (
                <div key={`day-${day.day}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-red-800 to-red-900 p-6 text-white">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white bg-opacity-20 rounded-lg p-2">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Day {day.day}</h3>
                        <p className="text-red-100">{day.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      {day.activities.map((item, actIndex) => (
                        <div key={`activity-${actIndex}`} className="flex space-x-4">
                          <div className="flex-shrink-0">
                            <div className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium">
                              {item.time}
                            </div>
                          </div>
                          
                          <div className="flex-grow bg-stone-50 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-grow">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-semibold text-stone-800">{item.activity.name}</h4>
                                  {isBusinessOpen(item.activity) && (
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                      Open Now
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-stone-600 text-sm mb-2">{item.activity.type}</p>
                                <p className="text-stone-700 mb-3">{item.activity.description}</p>
                                
                                <div className="flex items-center space-x-4 text-sm text-stone-600">
                                  <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                    <span>{item.activity.rating}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{item.activity.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{item.activity.hours}</span>
                                  </div>
                                  <span className="font-medium">{getBudgetIcon(item.activity.budget)}</span>
                                </div>
                              </div>
                              
                              <div className="flex-shrink-0 ml-4 space-x-2">
                                <button 
                                  onClick={() => refreshSingleActivity(dayIndex, actIndex)}
                                  className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
                                  title="Get a different suggestion for this time slot"
                                >
                                  ↻ Refresh
                                </button>
                                
                                {item.alternatives && item.alternatives.length > 0 && (
                                  <button 
                                    onClick={() => showAlternatives(dayIndex, actIndex, item.alternatives)}
                                    className="px-3 py-1 text-xs bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                                  >
                                    Alternatives
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Signature Experience Modal */}
      {showSignatureModal && selectedSignatureExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4 text-red-900">{selectedSignatureExperience.name}</h3>
            <p className="text-stone-700 mb-4">{selectedSignatureExperience.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-stone-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{selectedSignatureExperience.location} • {selectedSignatureExperience.distance}</span>
                </div>
                <div className="flex items-center text-sm text-stone-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{selectedSignatureExperience.duration}</span>
                </div>
                <div className="flex items-center text-sm text-stone-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="font-medium text-red-600">{selectedSignatureExperience.price}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-stone-800 mb-2">Includes:</h4>
                <ul className="text-sm text-stone-600 space-y-1">
                  {selectedSignatureExperience.includes.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => addSignatureExperience(selectedSignatureExperience)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add to Itinerary
              </button>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alternatives Modal */}
      {alternativesModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-red-900">Alternative Options</h3>
            
            <div className="space-y-4">
              {alternativesModal.alternatives?.map((business, index) => (
                <div 
                  key={`alt-${business.name}-${index}`} 
                  className="border border-stone-200 rounded-lg p-4 hover:bg-stone-50 cursor-pointer"
                  onClick={() => replaceActivity(alternativesModal.dayIndex, alternativesModal.activityIndex, business)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-stone-800">{business.name}</h4>
                      <p className="text-stone-600 text-sm">{business.type}</p>
                      <p className="text-stone-700 text-sm mt-1">{business.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-stone-600 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{business.rating}</span>
                        </div>
                        <span>{business.priceRange}</span>
                      </div>
                    </div>
                    
                    <ExternalLink className="w-5 h-5 text-stone-400" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setAlternativesModal({ isOpen: false, dayIndex: null, activityIndex: null, alternatives: [] })}
                className="bg-stone-200 hover:bg-stone-300 text-stone-700 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RioNidoLodgeApp;
