import * as React from 'react';

interface IProps {
  food: string
}

class CarteFood extends React.Component<IProps> {
  render() {
    return (
      <div>{this.props.food}</div>
    );
  }
}

export default CarteFood;
