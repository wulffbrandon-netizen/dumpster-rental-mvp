export const LEAD_STATUSES = ["New", "Quoted", "Sent to Hauler", "Accepted", "Scheduled", "Delivered", "Picked Up", "Completed", "Lost"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type LeadInput = {
  customer_name: string; phone: string; email: string; address: string; city: string; zip: string;
  delivery_date: string; rental_duration_days: number; dumpster_size: string; project_type: string;
  material_type: string; estimated_weight_tons?: number; special_notes?: string; consent: boolean;
};
