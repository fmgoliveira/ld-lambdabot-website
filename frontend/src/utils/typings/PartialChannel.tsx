export type PartialChannel = {
  id: string;
  type: number;
  guild_id?: string;
  position?: number;
  permission_overwrites?: {
    id: string;
    type: number;
    allow: number;
    deny: number;
  }[];
  name?: string;
  topic?: string;
  nsfw?: boolean;
  last_message_id?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: string[];
  icon?: string;
  owner_id?: string;
  application_id?: string;
  parent_id?: string;
  last_pin_timestamp?: string;
  rtc_region?: string;
  video_quality_mode?: number;
  message_count?: number;
  member_count?: number;
  thread_metadata?: {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: string;
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: string;
  };
  member?: {
    id?: string;
    user_id?: string;
    join_timestamp: string;
    flags: number;
  };
  default_auto_archive_duration?: number;
  permissions?: string;
};