import React, { Component } from 'react';

/**
 * SVG Canvas
 * This component generates the base SVG
 * and sets up all the sub-components
 */
class Canvas extends Component {

    componentDidUpdate() {
        let { playerId, players } = this.props
        let player = players[playerId]
        let x = player.x
        let y = player.y
        this.svg.style.backgroundPositionX = `${x}px`
        this.svg.style.backgroundPositionY = `${y}px`
    }

    render() {
        let { w, h, children } = this.props

        const viewBox = [0, 0, w, h].join(' ');

        return (
            <svg version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="100%"
                 height="100%"
                 ref={node => {
                        this.svg = node
                    }}
                 viewBox={ viewBox }
                 style={ styles }>
                { children }
            </svg>
        );
    }
}

Canvas.propTypes = {
    h: React.PropTypes.number,
    w: React.PropTypes.number,
    children: React.PropTypes.node,
};

const styles = {display: 'block'};

export default Canvas;
