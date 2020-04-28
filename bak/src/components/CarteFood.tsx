import * as React from 'react';
import highlightStore from '../stores/highlightStore';
import extend from 'lodash-es/extend';

interface IProps {
  food: string
}

class CarteFood extends React.Component<IProps> {
  render() {
    let titleChunks = Array.from(Array(this.props.food.length), () => '');
    let styleChunks = Array.from(Array(this.props.food.length), () => ({}));

    let highlights = [...highlightStore.highlights].reverse();
    highlights.forEach(highlight => {
      highlight.words.forEach(h => {
        for (let i = -1; (i = this.props.food.indexOf(h, i + 1)) != -1;) {
          for (let j = 0; j < h.length; j++) {
            titleChunks[i + j] += `${highlight.name} `;
            extend(styleChunks[i + j], highlight.style);
          }
        }
      })
    });

    return (
      <React.Fragment>
        {this.props.food.split('').map((v, i) => <span key={i} title={titleChunks[i]} style={styleChunks[i]}>{v}</span>)}
      </React.Fragment>
    );
  }
}

export default CarteFood;
