import { Song } from '../types';
import { twinkleTwinkle } from './twinkleTwinkle';
import { maryHadALittleLamb } from './maryHadALittleLamb';
import { odeToJoy } from './odeToJoy';
import { furElise } from './furElise';
import { happyBirthday } from './happyBirthday';
import { theScientist } from './theScientist';
import { skyfall } from './skyfall';

export const BUILT_IN_SONGS: Song[] = [
  maryHadALittleLamb,
  twinkleTwinkle,
  odeToJoy,
  happyBirthday,
  furElise,
  theScientist,
  skyfall,
];

export { twinkleTwinkle, maryHadALittleLamb, odeToJoy, furElise, happyBirthday, theScientist, skyfall };
