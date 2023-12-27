import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function bytesToMB(bytes:number) {
  const MB=1048576;
  return bytes/MB;
}

export function getRandomNumber(min: number, max: number): string {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}


export function extractUniqueKey(imageUrl:any) {
  const startIndex = imageUrl.indexOf('_public/') + '_public/'.length;
  return imageUrl.substring(startIndex);
}


export function FormateDate(date:string):string{
  return moment(date).fromNow()
}



