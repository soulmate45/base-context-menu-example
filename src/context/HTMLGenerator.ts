class HTMLGenerator {
	private readonly COMPONENT_IMG_TEXT = 'img';
	private readonly COMPONENT_DIV_TEXT = 'div';
	
	public getImage = (): HTMLImageElement => {
		return document.createElement(this.COMPONENT_IMG_TEXT);
	}
	
	public getDiv = (): HTMLElement => {
		return document.createElement(this.COMPONENT_DIV_TEXT);
	}
}

export default HTMLGenerator;