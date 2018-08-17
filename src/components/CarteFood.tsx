import * as React from 'react';
import Food from '../models/Food';

interface IProps {
  food: Food
}

class CarteFood extends React.Component<IProps> {
  render() {
    return (
      <div>{this.props.food}</div>
    );
  }
}

export default CarteFood;
