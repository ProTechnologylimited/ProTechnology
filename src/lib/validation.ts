import { z } from "zod";
export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120), email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  subject: z.string().trim().min(3).max(160), service_of_interest: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000), consent: z.literal(true),
  website: z.string().max(0).optional(), // honeypot: real users leave this empty
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
export const enquiryStatuses = ["new", "contacted", "qualified", "proposal_sent", "won", "lost", "archived"] as const;
