import Coordinates from '../../interfaces/Coordinates.ts';
import PictureComponent from '../../components/PictureComponent.ts';
import TextComponent from '../../components/TextComponent.ts';

class Factory {
	
	public imageFactory = (coords: Coordinates): PictureComponent => {
		const picture = new PictureComponent(coords);
		return picture;
	}
	
	public textFactory = (coords: Coordinates): TextComponent => {
		const text = new TextComponent(coords);
		return text;
	}
	
}

export default Factory;