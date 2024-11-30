export interface GeoLocation {
  ip: string;
  country: string;
  country_name: string;
  country_code: string;
  city: string;
  region: string;
}

export async function getUserCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('Failed to fetch location');
    
    const data: GeoLocation = await response.json();
    console.log('country:', data.country_code);
    return data.country_code;
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'FR'; // Default to France if detection fails
  }
}