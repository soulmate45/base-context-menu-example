import ContextMenu from './context/ContextMenu.ts';
import ComponentStorage from './context/components/ComponentStorage.ts';
import Injector from './context/injector/Injector.ts';
import ComponentManipulator from './context/components/ComponentManipulator.ts';
import './style.css'

const componentStorage = new ComponentStorage();
const injector = new Injector(componentStorage);
const componentData = new ComponentManipulator();
const contextMenu = new ContextMenu({rootComponent: document.body, componentStorage, injector});

const onRightClick = (ev: MouseEvent) => {
	ev.preventDefault();
	contextMenu.open({x: ev.clientX, y: ev.clientY}, ev.target as HTMLElement);
};

const onLeftClick = (ev: MouseEvent) => {
	ev.preventDefault();
	contextMenu.close();
};

const onMouseMove = (ev: MouseEvent) => {
	ev.preventDefault();
	const coords = {x: ev.clientX, y: ev.clientY}
	componentData.setCoordinates(coords);
	componentData.callMoveComponent();
};

const onMouseDown = (ev: MouseEvent) => {
	const coords = {x: ev.clientX, y: ev.clientY}
	const component = componentStorage.componentSearch(coords);
	if (component !== undefined) {
		componentData.setComponent(component, coords);
	}
};

const onMouseUp = (ev: MouseEvent) => {
	ev.preventDefault();
	componentData.stop();
};

document.body.addEventListener('contextmenu', onRightClick);
document.body.addEventListener('click', onLeftClick);
document.body.addEventListener('mousemove', onMouseMove);
document.body.addEventListener('mousedown', onMouseDown);
document.body.addEventListener('mouseup', onMouseUp);

