export interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
  isPlusOne: boolean;
  isAttending: boolean;
  canSeeHotel: boolean;
  hasRSVPd: boolean;
  isValid: boolean;
}
