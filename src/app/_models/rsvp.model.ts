import { Guest } from "./guest.model";

export interface RSVP {
  _id: string;
  userId: string;
  comments: string;
  dateSubmitted: Date;
}

export interface uiRsvp {
  email: string;
  comments: string;
  guests: Guest[];
}

export interface detailedRsvp {
  guests: Guest[];
  rsvp: RSVP;
  email: string;
}