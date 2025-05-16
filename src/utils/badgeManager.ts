
import { supabase } from "@/integrations/supabase/client";
import { awardBadgeToUser, getAllBadges, hasUserEarnedBadge } from "@/services/badgeService";

/**
 * Initializes the default badges in the database if they don't exist
 */
export const initializeDefaultBadges = async () => {
  // Check if we have any badges already
  const { count, error: countError } = await supabase
    .from('travel_badges')
    .select('*', { count: 'exact', head: true });
    
  if (countError) {
    console.error("Error checking for existing badges:", countError);
    return;
  }
  
  // If we already have badges, don't create the default ones
  if (count && count > 0) {
    return;
  }
  
  // Default badges to create
  const defaultBadges = [
    {
      name: "Borobudur Explorer",
      description: "Visited the magnificent Borobudur Temple in Central Java",
      image_url: "https://i.imgur.com/FaaFHjK.png"
    },
    {
      name: "Bali Beach Connoisseur",
      description: "Explored at least 5 different beaches in Bali",
      image_url: "https://i.imgur.com/UBjdQpb.png"
    },
    {
      name: "Culinary Adventurer",
      description: "Tried 10 different traditional Indonesian dishes",
      image_url: "https://i.imgur.com/7nkXJMZ.png"
    },
    {
      name: "Komodo Dragon Spotter",
      description: "Spotted the legendary Komodo dragons in their natural habitat",
      image_url: "https://i.imgur.com/mXeyR3w.png"
    },
    {
      name: "Temple Pilgrim",
      description: "Visited at least 5 ancient temples across Indonesia",
      image_url: "https://i.imgur.com/tY8ygd3.png"
    }
  ];
  
  // Insert the default badges
  const { error } = await supabase
    .from('travel_badges')
    .insert(defaultBadges);
    
  if (error) {
    console.error("Error creating default badges:", error);
  }
};

/**
 * Checks and awards a badge to a user if they've completed certain actions.
 * This would be called after relevant actions (like visits, activities, etc.)
 */
export const checkAndAwardBadge = async (
  userId: string,
  badgeName: string,
  condition: boolean
) => {
  if (!userId || !condition) return false;
  
  try {
    // Get all badges to find the one we want to award
    const badges = await getAllBadges();
    const badgeToAward = badges.find(badge => badge.name === badgeName);
    
    if (!badgeToAward) {
      console.error(`Badge "${badgeName}" not found`);
      return false;
    }
    
    // Check if user already has this badge
    const alreadyHasBadge = await hasUserEarnedBadge(userId, badgeToAward.id);
    
    if (alreadyHasBadge) {
      return false; // User already has this badge
    }
    
    // Award the badge
    await awardBadgeToUser(userId, badgeToAward.id);
    return true; // Badge was awarded
    
  } catch (error) {
    console.error("Error checking/awarding badge:", error);
    return false;
  }
};
