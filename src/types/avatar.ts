export type AvatarSkin = 'white' | 'yellow' | 'brown' | 'default';
export type AvatarBackgroundColor =
  | 'purple'
  | 'green'
  | 'aqua'
  | 'pink'
  | 'gold'
  | 'blue'
  | 'orange'
  | 'default';
export type AvatarHair =
  | 'long'
  | 'middle'
  | 'short'
  | 'cut'
  | 'old'
  | 'wool'
  | 'sports'
  | 'default';
export type AvatarFacialHair = 'default';
export type AvatarColor = 'golden' | 'brown' | 'black' | 'default' | 'empty';
export type AvatarAccessories = 'default';
export type AvatarType = {
  name?: string;
  size?: number;
  skin?: AvatarSkin;
  glass?: AvatarAccessories;
  background?: AvatarBackgroundColor;
  hair?: AvatarHair;
  beard?: AvatarFacialHair;
  color?: AvatarColor;
};
