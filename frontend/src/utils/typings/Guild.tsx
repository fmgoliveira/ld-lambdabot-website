export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: string | boolean;
  permissions: string;
  features: string[];
  botIn?: boolean;
  role?: 'admin' | 'owner' | 'manager' | 'none';
};