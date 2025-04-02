export interface Launch {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    launch_success: boolean;
    details: string;
    links: {
      mission_patch_small: string;
    };
    rocket: { 
      rocket_id: string;
      rocket_name: string;
      rocket_type: string;
    };
    launch_site: {
      site_id: string;
      site_name: string;
      site_name_long: string;
    };

  }
  