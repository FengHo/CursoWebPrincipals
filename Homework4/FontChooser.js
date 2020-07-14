const COLOR_BLACK = "black";
const COLOR_RED = "red";

class FontChooser extends React.Component {

    constructor(props) {
        super(props);
        let min = props.min;
        let max = props.max;
        let bold;
        let size;
        let color;

        if (max < min) {
            let temp = max;
            max = min;
            min = temp;
        }

        if(Number(min) <= 0) {
            min = "1";
        }

        if(localStorage.textSize)
            size = localStorage.textSize;
        else {
            size = props.size;
            localStorage.textSize = size;
        }

        if(localStorage.color)
            color = localStorage.color;
        else {
            color = COLOR_BLACK
            localStorage.color = color;
        }

        if(Number(size) >= Number(max)) {
            size = max;
            localStorage.textSize = max;
            color = COLOR_RED
            localStorage.color = color;
        } else if(Number(size) <= Number(min)) {
            size = min;
            localStorage.textSize = min;
            color = COLOR_RED
            localStorage.color = color;
        }

        if(localStorage.isItBold) {
            if(localStorage.isItBold === 'true')
                bold = true;
            else
                bold = false;
        }else {
            if (props.bold === 'false')
                bold = false;
            else
                bold = true;

            localStorage.isItBold = bold.toString();
        }

        localStorage.initSize = props.size;

        if(Number(props.size) >= Number(max))
            localStorage.initSize = max;
        else if(Number(props.size) <= Number(min))
            localStorage.initSize = min;

        console.log(size);


        this.state = {
            minValue: min,
            maxValue: max,
            color: color,
            bold: bold,
            size: size,
            hidden: true,
        }

        this.handleClick = this.makeEverythingAppear.bind(this);
        this.handleChange = this.makeFontBold.bind(this);
        this.handleDecrease = this.decreaseFontSize.bind(this);
        this.handleIncrease = this.increaseFontSize.bind(this);
        this.handleDoubleClick = this.resetFontSize.bind(this);
    }

	makeEverythingAppear() {
        let hidden = this.state.hidden ? false : true;
		this.setState({hidden : hidden });
	}

	makeFontBold(){
        this.setState({bold: this.state.bold ? false: true})

        if(localStorage.isItBold === 'true')
            localStorage.isItBold = 'false';
        else
            localStorage.isItBold = 'true';
    }

    decreaseFontSize(){
        if(this.state.size === this.state.minValue)
            this.setState({size: this.state.minValue});
        else {
            localStorage.textSize = (this.state.size - 1).toString();
            this.setState({size: (this.state.size - 1).toString()});
            this.setState({color: COLOR_BLACK});
            localStorage.color = COLOR_BLACK;

            if((Number(this.state.size) - 1).toString()  === this.state.minValue) {
                this.setState({color: COLOR_RED});
                localStorage.color = COLOR_RED;
            }
        }
    }

    increaseFontSize(){
        if(this.state.size === this.state.maxValue) {
            this.setState({size: this.state.maxValue});
            this.setState({color: COLOR_RED});
        } else {
            localStorage.textSize = (Number(this.state.size) + 1).toString();
            this.setState({size: (Number(this.state.size) + 1).toString()});
            this.setState({color: COLOR_BLACK});
            localStorage.color = COLOR_BLACK;

            if((Number(this.state.size) + 1).toString() === this.state.maxValue) {
                this.setState({color: COLOR_RED});
                localStorage.color = COLOR_RED;
            }
        }
    }

    resetFontSize(){
        this.setState({size: localStorage.initSize});
        localStorage.textSize = localStorage.initSize;
        this.setState({color:COLOR_BLACK});

        if(localStorage.textSize === this.state.maxValue
        || localStorage.textSize === this.state.minValue) {
            this.setState({color:COLOR_RED});
            localStorage.color = COLOR_RED;
        }
    }

    render() {

        return (
            <div>
                <input type="checkbox" id="boldCheckbox"  hidden={this.state.hidden} onChange={this.handleChange} checked={this.state.bold}/>
                <button id="decreaseButton" hidden={this.state.hidden} onClick={this.handleDecrease}>-</button>
                <span id="fontSizeSpan" hidden={this.state.hidden} onDoubleClick={this.handleDoubleClick}>{this.state.size}</span>
                <button id="increaseButton" hidden={this.state.hidden} onClick={this.handleIncrease}>+</button>
                <span id="textSpan" style={{fontSize: Number(this.state.size), fontWeight: this.state.bold ? "bold":"normal", color: this.state.color }} onClick={this.handleClick} >{this.props.text}</span>
            </div>
        );
    }
}

