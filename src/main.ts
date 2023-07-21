import './style.css'
import ContextMenu from './context/ContextMenu.ts';

const contextMenu = new ContextMenu({rootComponent: document.body});

const onRightClick = (ev: MouseEvent) => {
	ev.preventDefault();
	contextMenu.open({ x: ev.clientX, y: ev.clientY });
};

const onLeftClick = (ev: MouseEvent) => {
	ev.preventDefault();
	contextMenu.close();
};

document.body.addEventListener('contextmenu', onRightClick);
document.body.addEventListener('click', onLeftClick)
