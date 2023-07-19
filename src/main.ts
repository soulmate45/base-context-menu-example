import './style.css'
import ContextMenu from './ContextMenu.ts';

const contextMenu = new ContextMenu(document.body);

const onBodyClick = (ev: MouseEvent) => {
	ev.preventDefault();
	contextMenu.open(ev.clientX, ev.clientY, ev.target);
};

const onLeftClick = (ev: MouseEvent) => {
	ev.preventDefault();
	contextMenu.close();
};

document.body.addEventListener('contextmenu', onBodyClick);
document.body.addEventListener('click',onLeftClick)
