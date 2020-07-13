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

        if(localStorage.textSize) {
            size = localStorage.textSize;
        } else {
            size = props.size;
            localStorage.textSize = size;
        }

        if(localStorage.color)
            color = localStorage.color;
        else {
            color = "black"
            localStorage.color = color;
        }

        if(Number(size) >= Number(max)) {
            size = max;
            localStorage.textSize = max;
            color = "red"
            localStorage.color = color;
        } else if(Number(size) <= Number(min)) {
            size = min;
            localStorage.textSize = min;
            color = "red"
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

        if(Number(size) >= Number(max)) {
            localStorage.initSize = max;
        } else if(Number(size) <= Number(min)) {
            localStorage.initSize = min;
        } else {
            localStorage.initSize = props.size;
        }

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

        console.log(localStorage.isItBold);
    }

    decreaseFontSize(){
        if(this.state.size === this.state.minValue) {
            this.setState({size: this.state.minValue});
        } else {
            localStorage.textSize = (this.state.size - 1).toString();
            this.setState({size: (this.state.size - 1).toString()});
            this.setState({color: "black"});
            localStorage.color = "black";

            if((Number(this.state.size) - 1).toString()  === this.state.minValue) {
                this.setState({color: "red"});
                localStorage.color = "red";
            }
        }
    }

    increaseFontSize(){
        if(this.state.size === this.state.maxValue) {
            this.setState({size: this.state.maxValue});
            this.setState({color: "red"});
        } else {
            localStorage.textSize = (Number(this.state.size) + 1).toString();
            this.setState({size: (Number(this.state.size) + 1).toString()});
            this.setState({color: "black"});
            localStorage.color = "black";

            if((Number(this.state.size) + 1).toString() === this.state.maxValue) {
                this.setState({color: "red"});
                localStorage.color = "red";
            }
        }
    }

    resetFontSize(){
        this.setState({size: localStorage.initSize});
        localStorage.textSize = localStorage.initSize;
        if(localStorage.textSize === this.state.maxValue
        || localStorage.textSize === this.state.minValue) {
            this.state.color = "red";
            localStorage.color = "red";
        }
        console.log(localStorage.textSize)
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

