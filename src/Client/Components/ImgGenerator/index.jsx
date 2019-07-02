import React from "react";
import html2canvas from "html2canvas";

import { UnconnectedBoard } from "../Board/index.jsx";

const randint = (n) => parseInt(Math.random() * n);

const generateDeadBlob = () => ({
    x: 0.,
    y: 0.,
    orientation: 0,
    alive: false,
    status: "normal",
})

const generateBlob = (forceAlive) => ({
    x: Math.random(),
    y: Math.random(),
    orientation: randint(4),
    alive: (forceAlive || (Math.random() < 0.8)),
    status: ["normal", "hat", "ghost"][randint(3)],
});

class ImgGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { i: 0 };
        this.data = {};
    }

    loadData = () => {
        const a = document.createElement('A');
        a.setAttribute('target', '_blank');
        a.setAttribute('download', 'data.json');
        a.setAttribute('href', `data:text/json;charset=utf-8,${encodeURI(JSON.stringify(this.data))}`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    saveImage = () => {
        const { i } = this.state;
        html2canvas(document.getElementsByClassName("board")[0]).then((canvas) => {
            const a = document.createElement('A');
            a.setAttribute('target', '_blank');
            a.setAttribute('download', i + '.png');
            a.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            if (i < 9999) {
                this.setState({ i: i + 1 });
            } else {
                setTimeout(this.loadData, 500); // without setTimeout, there are two <a> tags on the last iteration and the last image is lost
            }
        });
    }

    componentDidMount() {
        this.saveImage();
    }

    componentDidUpdate() {
        this.saveImage();
    }

    render () {
        // For generating data to train detection and localization
        // const army = [generateBlob(), generateBlob(), generateBlob()];
        // const enemy = [generateBlob(), generateBlob(), generateBlob()];

        // For generating data to train classification
        const army = [generateDeadBlob(), generateDeadBlob(), generateDeadBlob()];
        const enemy = [generateDeadBlob(), generateDeadBlob(), generateDeadBlob()];
        const i = randint(6)
        if (i < 3) {
            army[i] = generateBlob(true);
        } else {
            enemy[i - 3] = generateBlob(true);
        }

        this.data[this.state.i] = { army, enemy };
        const props = {
            cards: [{ title: "Card0", description: "" }, { title: "Card1", description: "" }],
            army,
            enemy,
            displayContainer: () => {},
            displayAlert: () => {},
            setDestination: () => {},
            triggerCard: () => {},
        }
        return <UnconnectedBoard {...props} />
    }
}

export default ImgGenerator;
