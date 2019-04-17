export interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
  isPlusOne: boolean;
  isAttending: boolean;
  hasRSVPd: boolean;
  isValid: boolean;
  sortOrder: number;
}
