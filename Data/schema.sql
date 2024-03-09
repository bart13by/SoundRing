name	sql
bird_categories	CREATE TABLE `bird_categories` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `name` varchar(255) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
)
sqlite_sequence	CREATE TABLE sqlite_sequence(name,seq)
bird_category_manuscript	CREATE TABLE `bird_category_manuscript` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `bird_category_id` integer  NOT NULL
,  `manuscript_id` integer  NOT NULL
,  CONSTRAINT `bird_category_manuscript_bird_category_id_foreign` FOREIGN KEY (`bird_category_id`) REFERENCES `bird_categories` (`id`) ON DELETE CASCADE
,  CONSTRAINT `bird_category_manuscript_manuscript_id_foreign` FOREIGN KEY (`manuscript_id`) REFERENCES `manuscripts` (`id`) ON DELETE CASCADE
)
bird_records	CREATE TABLE `bird_records` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `key` varchar(255) NOT NULL
,  `value` text NOT NULL
,  `bird_id` integer  NOT NULL
,  `source` varchar(255) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  CONSTRAINT `bird_records_bird_id_foreign` FOREIGN KEY (`bird_id`) REFERENCES `birds` (`id`)
)
birds	CREATE TABLE `birds` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `universal_species_id` varchar(255) NOT NULL
,  `name` varchar(255) NOT NULL
,  `common_name` varchar(255) DEFAULT NULL
,  `scientific_name` varchar(255) NOT NULL
,  `conservation_status` varchar(255) DEFAULT NULL
,  `conservation_notes` text COLLATE BINARY
,  `xc_link` varchar(255) DEFAULT NULL
,  `body_mass_grams` integer  DEFAULT NULL
,  `category_id` integer  DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  CONSTRAINT `birds_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `bird_categories` (`id`)
)
facsimiles	CREATE TABLE `facsimiles` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `name` varchar(255) NOT NULL
,  `file_name` varchar(255) NOT NULL
,  `order` integer  NOT NULL DEFAULT '1'
,  `manuscript_id` integer  NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  CONSTRAINT `facsimiles_manuscript_id_foreign` FOREIGN KEY (`manuscript_id`) REFERENCES `manuscripts` (`id`)
)
failed_jobs	CREATE TABLE `failed_jobs` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `uuid` varchar(255) NOT NULL
,  `connection` text NOT NULL
,  `queue` text NOT NULL
,  `payload` longtext NOT NULL
,  `exception` longtext NOT NULL
,  `failed_at` timestamp NOT NULL DEFAULT current_timestamp
,  UNIQUE (`uuid`)
)
manuscript_circulations	CREATE TABLE `manuscript_circulations` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `manuscript_id` integer  NOT NULL
,  `person_id` integer  NOT NULL
,  `place_id` integer  NOT NULL
,  `year` varchar(255) DEFAULT NULL
,  `month` varchar(255) DEFAULT NULL
,  `mode_of_transport` varchar(255) DEFAULT NULL
,  `distance_traveled` text COLLATE BINARY
,  `route` text COLLATE BINARY
,  `form` varchar(255) DEFAULT NULL
,  `order` integer  NOT NULL DEFAULT '1'
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  CONSTRAINT `manuscript_circulations_manuscript_id_foreign` FOREIGN KEY (`manuscript_id`) REFERENCES `manuscripts` (`id`)
,  CONSTRAINT `manuscript_circulations_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`)
,  CONSTRAINT `manuscript_circulations_place_id_foreign` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`)
)
manuscript_records	CREATE TABLE `manuscript_records` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `key` varchar(255) NOT NULL
,  `value` text NOT NULL
,  `manuscript_id` integer  NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  CONSTRAINT `manuscript_records_manuscript_id_foreign` FOREIGN KEY (`manuscript_id`) REFERENCES `manuscripts` (`id`)
)
manuscripts	CREATE TABLE `manuscripts` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `franklin_id` varchar(255) DEFAULT NULL
,  `ms_id` varchar(255) DEFAULT NULL
,  `name` varchar(255) NOT NULL
,  `first_line` varchar(255) NOT NULL
,  `year` varchar(255) DEFAULT NULL
,  `month` varchar(255) DEFAULT NULL
,  `season` varchar(255) DEFAULT NULL
,  `does_not_mention_birds` integer NOT NULL
,  `state` varchar(255) NOT NULL
,  `setting` varchar(255) DEFAULT NULL
,  `paper` varchar(255) DEFAULT NULL
,  `circulation` varchar(255) DEFAULT NULL
,  `transcription` text COLLATE BINARY
,  `mutilated` integer NOT NULL
,  `missing_leaves` integer NOT NULL
,  `printed_from_lost_sent_manuscript` integer DEFAULT NULL
,  `poem_id` integer  DEFAULT NULL
,  `placeholder_ms_image` varchar(255) DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  CONSTRAINT `manuscripts_poem_id_foreign` FOREIGN KEY (`poem_id`) REFERENCES `poems` (`id`)
)
migrations	CREATE TABLE `migrations` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `migration` varchar(255) NOT NULL
,  `batch` integer NOT NULL
)
password_reset_tokens	CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL
,  `token` varchar(255) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  PRIMARY KEY (`email`)
)
people	CREATE TABLE `people` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `name` varchar(255) NOT NULL
,  `ui_name` varchar(255) NOT NULL
,  `relation_to_dickinson` varchar(255) DEFAULT NULL
,  `dates_of_correspondence` varchar(255) DEFAULT NULL
,  `notes` text COLLATE BINARY
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
)
personal_access_tokens	CREATE TABLE `personal_access_tokens` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `tokenable_type` varchar(255) NOT NULL
,  `tokenable_id` integer  NOT NULL
,  `name` varchar(255) NOT NULL
,  `token` varchar(64) NOT NULL
,  `abilities` text COLLATE BINARY
,  `last_used_at` timestamp NULL DEFAULT NULL
,  `expires_at` timestamp NULL DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  UNIQUE (`token`)
)
places	CREATE TABLE `places` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `name` varchar(255) NOT NULL
,  `address` varchar(255) DEFAULT NULL
,  `latitude` decimal(10,8) DEFAULT NULL
,  `longitude` decimal(11,8) DEFAULT NULL
,  `notes` text COLLATE BINARY
,  `start_date` varchar(255) DEFAULT NULL
,  `end_date` varchar(255) DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
)
poems	CREATE TABLE `poems` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `name` varchar(255) NOT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
)
users	CREATE TABLE `users` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `name` varchar(255) NOT NULL
,  `email` varchar(255) NOT NULL
,  `email_verified_at` timestamp NULL DEFAULT NULL
,  `password` varchar(255) NOT NULL
,  `remember_token` varchar(100) DEFAULT NULL
,  `created_at` timestamp NULL DEFAULT NULL
,  `updated_at` timestamp NULL DEFAULT NULL
,  UNIQUE (`email`)
)