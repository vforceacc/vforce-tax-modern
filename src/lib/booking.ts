export const BOOKINGS_URL =
  'https://outlook.office.com/book/VForceTaxAdvisory@vforcetax.com.au/';

const MOBILE_PHONE_UA_REGEX =
  /Android.*Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function isMobilePhoneUserAgent(
  userAgent: string | null,
  secChUaMobile: string | null
): boolean {
  if (secChUaMobile === '?1') {
    return true;
  }
  if (!userAgent) {
    return false;
  }
  return MOBILE_PHONE_UA_REGEX.test(userAgent);
}
