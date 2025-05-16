
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Badge = Tables<'travel_badges'>;
export type UserBadge = Tables<'user_badges'> & {
  travel_badges?: Badge | null;
};

/**
 * Fetches all available travel badges
 */
export const getAllBadges = async (): Promise<Badge[]> => {
  const { data, error } = await supabase
    .from('travel_badges')
    .select('*');
  
  if (error) {
    console.error("Error fetching badges:", error);
    throw error;
  }
  
  return data || [];
};

/**
 * Fetches badges earned by a specific user
 */
export const getUserBadges = async (userId: string): Promise<UserBadge[]> => {
  const { data, error } = await supabase
    .from('user_badges')
    .select(`
      *,
      travel_badges(*)
    `)
    .eq('user_id', userId);
  
  if (error) {
    console.error("Error fetching user badges:", error);
    throw error;
  }
  
  return data || [];
};

/**
 * Checks if a user has earned a specific badge
 */
export const hasUserEarnedBadge = async (userId: string, badgeId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', userId)
    .eq('badge_id', badgeId)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows returned
    console.error("Error checking if badge is earned:", error);
    throw error;
  }
  
  return !!data;
};

/**
 * Assigns a badge to a user
 */
export const awardBadgeToUser = async (userId: string, badgeId: string): Promise<void> => {
  const { error } = await supabase
    .from('user_badges')
    .insert({ user_id: userId, badge_id: badgeId })
    .single();
  
  if (error && error.code !== '23505') { // 23505 is the error code for unique_violation
    console.error("Error awarding badge:", error);
    throw error;
  }
};
