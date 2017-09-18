import buttonLeftClick from "./ButtonLeftClick.png";
import buttonRightClick from "./ButtonRightClick.png";
import buttonSpace from "./ButtonSpace.png";
import buttonRightClickBlue from "./ButtonRightClickBlue.png";
import buttonSpaceBlue from "./ButtonSpaceBlue.png";

import blob0 from "./Blob0.png";
import blob1 from "./Blob1.png";
import blob2 from "./Blob2.png";
import blob3 from "./Blob3.png";

import enemy0 from "./Enemy0.png";
import enemy1 from "./Enemy1.png";
import enemy2 from "./Enemy2.png";
import enemy3 from "./Enemy3.png";

import hat0 from "./Hat0.png";
import hat1 from "./Hat1.png";
import hat2 from "./Hat2.png";
import hat3 from "./Hat3.png";
import hat4 from "./Hat4.png";
import hat5 from "./Hat5.png";

import pointerW from "./PointerW.png";
import pointerE from "./PointerE.png";
import pointerR from "./PointerR.png";
import pointerActive from "./PointerActive.png";

import dices from "./Dices.png";
import cards from "./Cards.png";

import logo from "./Logo.png";
import login from "./Login.png";

export const buttons = {
	normal: {
		left: buttonLeftClick,
		right: buttonRightClick,
		space: buttonSpace
	},
	blue: {
		right: buttonRightClickBlue,
		space: buttonSpaceBlue
	}	
}

export const blobs = [blob0, blob1, blob2, blob3];

export const enemies = [enemy0, enemy1, enemy2, enemy3];

export const hats = [hat0, hat1, hat2, hat3, hat4, hat5];

export const pointers = {
	w: pointerW,
	e: pointerE,
	r: pointerR,
	active: pointerActive
}

export { dices, cards, logo, login };
