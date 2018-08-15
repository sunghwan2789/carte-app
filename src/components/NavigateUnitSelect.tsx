import * as React from 'react';
import { Select, MenuItem, FormControl } from '@material-ui/core';
import * as dayjs from 'dayjs';

interface IProps {
  navigateUnit: dayjs.UnitType;
  handleChange?: (unit: dayjs.UnitType) => void;
}

class NavigateUnitSelect extends React.Component<IProps> {
  render() {
    const items = [
      ['day', '일'],
      ['week', '주'],
      ['month', '월'],
    ];

    return (
      <FormControl>
        <Select style={{color: 'inherit'}}
          value={this.props.navigateUnit}
          onChange={e => this.props.handleChange && this.props.handleChange(e.target.value as dayjs.UnitType)}>
          {items.map(([value, text]) => <MenuItem value={value}>{text}</MenuItem>)}
        </Select>
      </FormControl>
    );
  }
}

export default NavigateUnitSelect;
