/**
 * DEMO DATA — fictional sample data for Group 32 coursework prototype.
 * Not connected to any real database or backend.
 */

export const HELP_TYPES = [
  { value: 'Medical',      label: 'Medical',      icon: '🏥' },
  { value: 'Food & Water', label: 'Food & Water', icon: '🍚' },
  { value: 'Shelter',      label: 'Shelter',      icon: '🏠' },
  { value: 'Evacuation',   label: 'Evacuation',   icon: '🚨' },
  { value: 'Other',        label: 'Other',        icon: '🔧' },
];

// Legacy alias kept for CoordinatorDashboard filter chips
export const AID_TYPES = HELP_TYPES.map(h => h.value);

export const URGENCY_LEVELS = [
  { value: 'critical', label: 'Critical — Life Threatening', color: '#ef4444' },
  { value: 'high',     label: 'High — Severe Impact',        color: '#f97316' },
  { value: 'medium',   label: 'Medium — Significant Need',   color: '#eab308' },
  { value: 'low',      label: 'Low — Manageable Situation',  color: '#22c55e' },
];

export const SAMPLE_REQUESTS = [
  {
    id: 'REQ-001',
    citizenName: 'Amara Nwosu',
    phone: '+94711234567',
    aidType: 'Medical',
    urgency: 'critical',
    description:
      'Three injured survivors from collapsed building. Need bandages, antiseptic, and splints urgently. One person has a suspected broken leg.',
    location: 'District 4, Sector B — near the old market square',
    landmark: 'Old Market Square, Colombo',
    peopleAffected: 3,
    latitude: 6.9271,
    longitude: 79.8612,
    submittedAt: '2026-11-19T05:12:00Z',
    status: 'pending',
    aiRecommendation: {
      priorityScore: 97,
      priorityLabel: 'CRITICAL — Dispatch Immediately',
      reasoning:
        'Patient presents with high-probability fracture and open wounds in a collapsed-structure scenario. Delay risk exceeds 2 hours before sepsis probability rises significantly. No medical facility within 5 km. Recommend dispatching mobile trauma unit within 30 minutes.',
      suggestedResources: ['Mobile Trauma Unit', 'Paramedic Team (×2)', 'Emergency Stretcher', 'First Aid Kit (Advanced)'],
      estimatedResponseTime: '20–35 min',
      confidenceLevel: 'High (94%)',
    },
  },
  {
    id: 'REQ-002',
    citizenName: 'Lena Hoffmann',
    phone: '+94722345678',
    aidType: 'Food & Water',
    urgency: 'high',
    description:
      'Approximately 40 people stranded at community centre for 36 hours with no food or clean water. Children and elderly are showing signs of dehydration.',
    location: 'Green Valley Community Centre, Block 7',
    landmark: 'Green Valley Community Centre',
    peopleAffected: 40,
    latitude: 7.2906,
    longitude: 80.6337,
    submittedAt: '2026-11-19T06:30:00Z',
    status: 'assigned',
    aiRecommendation: {
      priorityScore: 82,
      priorityLabel: 'HIGH — Deploy Within 2 Hours',
      reasoning:
        'Large group with vulnerable populations (minors and elderly) experiencing prolonged food and water deprivation. Dehydration signs in elderly individuals indicate deteriorating situation. Recommend water purification tablets plus bottled supply, and calorie-dense non-perishable food packs.',
      suggestedResources: ['Water Tanker (500L)', 'Food Packs (×50)', 'Oral Rehydration Salts', 'Volunteer Team (×4)'],
      estimatedResponseTime: '45–70 min',
      confidenceLevel: 'High (89%)',
    },
  },
  {
    id: 'REQ-003',
    citizenName: 'Carlos Mendoza',
    phone: '+94733456789',
    aidType: 'Shelter',
    urgency: 'high',
    description:
      'Family of 6 displaced after flood damage destroyed their home. Currently exposed to rain. No relatives nearby. Requesting emergency housing or temporary shelter.',
    location: 'Riverside Lane 12, Flood Zone C',
    landmark: 'Riverside Lane, Galle',
    peopleAffected: 6,
    latitude: 6.0535,
    longitude: 80.2210,
    submittedAt: '2026-11-19T07:45:00Z',
    status: 'pending',
    aiRecommendation: {
      priorityScore: 78,
      priorityLabel: 'HIGH — Action Needed Today',
      reasoning:
        'Prolonged exposure to rain without shelter poses hypothermia risk, especially for young children in the family. Flood zone C is under continuing water ingress advisory. Recommend emergency tent allocation or transport to nearest relief camp (2.4 km away).',
      suggestedResources: ['Emergency Tent (4-person ×2)', 'Blankets (×8)', 'Transport Vehicle', 'Relief Camp Registration'],
      estimatedResponseTime: '1–2 hours',
      confidenceLevel: 'Medium (76%)',
    },
  },
  {
    id: 'REQ-004',
    citizenName: 'Priya Rajan',
    phone: '+94744567890',
    aidType: 'Evacuation',
    urgency: 'critical',
    description:
      'Elderly woman (age 78) trapped on second floor due to rising flood water. Cannot descend stairs alone. Requires immediate evacuation.',
    location: 'Palm Street No. 3, East Quarter',
    landmark: 'Palm Street, Jaffna',
    peopleAffected: 1,
    latitude: 9.6615,
    longitude: 80.0255,
    submittedAt: '2026-11-19T08:00:00Z',
    status: 'in-progress',
    aiRecommendation: {
      priorityScore: 99,
      priorityLabel: 'CRITICAL — Immediate Evacuation Required',
      reasoning:
        'Single elderly individual with limited mobility trapped in actively flooding structure. Water rise rate in East Quarter estimated at 8 cm/hour. Upper-floor entrapment window closing. High cardiac event risk under prolonged stress. Dispatch boat or aerial unit immediately.',
      suggestedResources: ['Rescue Boat', 'Paramedic (×1)', 'Life Jacket', 'Stretcher (Collapsible)'],
      estimatedResponseTime: '10–20 min',
      confidenceLevel: 'High (97%)',
    },
  },
  {
    id: 'REQ-005',
    citizenName: 'James Okafor',
    phone: '+94755678901',
    aidType: 'Medical',
    urgency: 'medium',
    description:
      'Community group of ~15 survivors from the earthquake showing signs of acute trauma: panic attacks, inability to sleep, withdrawal. Requesting counsellors or crisis support.',
    location: 'Eastside Relief Camp, Tent Area 3',
    landmark: 'Eastside Relief Camp, Kandy',
    peopleAffected: 15,
    latitude: 7.2906,
    longitude: 80.6337,
    submittedAt: '2026-11-19T09:15:00Z',
    status: 'pending',
    aiRecommendation: {
      priorityScore: 55,
      priorityLabel: 'MEDIUM — Schedule Within 24 Hours',
      reasoning:
        'Acute stress reactions post-disaster are expected but require timely intervention to prevent PTSD progression. Group setting allows efficient use of one counsellor. Priority lower than life-threatening physical needs but should not be deferred beyond 24 hours.',
      suggestedResources: ['Crisis Counsellor (×1)', 'Psychosocial Support Kit', 'Information Leaflets (trauma)', 'Referral Hotline Cards'],
      estimatedResponseTime: '3–6 hours',
      confidenceLevel: 'Medium (71%)',
    },
  },
  {
    id: 'REQ-006',
    citizenName: 'Sofia Al-Rashid',
    phone: '+94766789012',
    aidType: 'Other',
    urgency: 'low',
    description:
      'Family of 4 at temporary shelter lost all clothing and hygiene items. Children need appropriate-sized clothing. No urgent health risk but significant dignity concern.',
    location: 'North Relief Hub, Registration Desk 2',
    landmark: 'North Relief Hub, Trincomalee',
    peopleAffected: 4,
    latitude: 8.5874,
    longitude: 81.2152,
    submittedAt: '2026-11-19T10:00:00Z',
    status: 'resolved',
    aiRecommendation: {
      priorityScore: 28,
      priorityLabel: 'LOW — Address Within 48 Hours',
      reasoning:
        'No immediate health or safety risk identified. Basic dignity and hygiene needs should be addressed to maintain morale and prevent secondary health issues (skin infections). Clothing size data for children available through registration form.',
      suggestedResources: ['Clothing Bundle (Adult ×2, Child ×2)', 'Hygiene Kit (×4)', 'Laundry Voucher'],
      estimatedResponseTime: '24–48 hours',
      confidenceLevel: 'High (91%)',
    },
  },
];

export const STATUS_META = {
  pending:      { label: 'Pending',     color: '#f97316', bg: 'rgba(249,115,22,0.15)' },
  assigned:     { label: 'Assigned',    color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
  'in-progress':{ label: 'In Progress', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  resolved:     { label: 'Resolved',    color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
};

/** Demo volunteer accounts */
export const DEMO_VOLUNTEERS = [
  { id: 'V-001', name: 'Ruwan Perera',   skill: 'Medical First Aid',    area: 'Colombo',     status: 'active',   tasksCompleted: 12 },
  { id: 'V-002', name: 'Nimal Fernando', skill: 'Logistics & Transport', area: 'Kandy',       status: 'active',   tasksCompleted: 8 },
  { id: 'V-003', name: 'Sanduni Silva',  skill: 'Counselling',           area: 'Galle',       status: 'standby',  tasksCompleted: 5 },
  { id: 'V-004', name: 'Kasun Jayawardena', skill: 'Search & Rescue',   area: 'Jaffna',      status: 'active',   tasksCompleted: 17 },
];

/** Demo citizen past requests (shown in citizen dashboard) */
export const DEMO_CITIZEN_REQUESTS = [
  {
    id: 'MY-001',
    aidType: 'Medical',
    urgency: 'high',
    status: 'in-progress',
    submittedAt: '2026-11-18T14:30:00Z',
    location: 'Nugegoda, Colombo',
    latitude: 6.8734,
    longitude: 79.8900,
    peopleAffected: 2,
    description: 'Two people with minor injuries from roof collapse, need medical assistance.',
  },
  {
    id: 'MY-002',
    aidType: 'Food & Water',
    urgency: 'medium',
    status: 'resolved',
    submittedAt: '2026-11-17T09:15:00Z',
    location: 'Maharagama',
    latitude: 6.8459,
    longitude: 79.9269,
    peopleAffected: 5,
    description: 'Family of 5 without food supplies for 2 days after flooding.',
  },
];
