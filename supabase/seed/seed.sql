insert into pricing_rules (rule_type, key, value) values
('base_price','10 yd',375),('base_price','15 yd',425),('base_price','20 yd',475),('base_price','30 yd',575),
('city_surcharge','Irvine',35),('city_surcharge','Huntington Beach',45),
('material_surcharge','Concrete',120),('material_surcharge','Dirt',100),('material_surcharge','Mixed',0)
on conflict do nothing;

insert into partner_haulers (company_name,contact_name,phone,email,service_cities,dumpster_sizes_offered,base_pricing,notes,active) values
('Pacific Roll-Offs','Maria Lopez','714-555-1001','dispatch@pacificrolloffs.com','{"Anaheim","Orange","Fullerton"}','{"10 yd","20 yd","30 yd"}','{"10 yd":320,"20 yd":395,"30 yd":470}','Fast dispatch',true),
('Coastal Bin Hauling','Devin Park','714-555-2020','ops@coastalbinhauling.com','{"Irvine","Santa Ana","Huntington Beach"}','{"15 yd","20 yd"}','{"15 yd":350,"20 yd":410}','Great for remodel debris',true)
on conflict do nothing;
