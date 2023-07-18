import './style.css'
import ContextMenu from './ContextMenu.ts';

const contextMenu = new ContextMenu(document.body);

const onBodyClick = (ev: MouseEvent) => {
	ev.preventDefault();
	contextMenu.open(ev.clientX, ev.clientY);
};

document.body.addEventListener('contextmenu', onBodyClick);

