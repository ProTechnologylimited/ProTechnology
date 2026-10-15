-- DEVELOPMENT / STARTER DATA. Example plans from the spec; administrators can edit them. Safe to re-run.
insert into pricing_plans (slug,name,description,amount_minor,currency,billing_interval,display_order) values
 ('starter','Starter','Small businesses beginning with AI tools and basic automation resources.',2900,'USD','monthly',1),
 ('growth','Growth','Ongoing automation resources and agreed support.',9900,'USD','monthly',2),
 ('professional','Professional','More advanced automation services and implementation.',29900,'USD','monthly',3),
 ('enterprise','Enterprise','Customised workflows, integrations or service agreements.',null,'USD','custom',4)
on conflict (slug) do nothing;
-- Grant the first admin manually in the Supabase SQL editor (never from the app):
-- insert into user_roles (user_id, role) values ('<auth user uuid>', 'admin');
