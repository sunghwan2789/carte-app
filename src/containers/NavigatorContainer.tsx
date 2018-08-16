import * as React from 'react';
import { inject, observer } from 'mobx-react';
import navigationStore from '../stores/navigationStore';
import Navigator from '../components/Navigator';
import NavigateButtons from '../components/NavigateButtons';
import NavigateUnitSelect from '../components/NavigateUnitSelect';
import * as dayjs from 'dayjs';

@observer
class NavigatorContainer extends React.Component {
  handleBackward = () => {
    navigationStore.backward();
  }

  handleForward = () => {
    navigationStore.forward();
  }

  handleUnitChange = (unit: dayjs.UnitType) => {
    navigationStore.navigationUnit = unit;
  }

  render() {
    return (
      <React.Fragment>
        <NavigateButtons
          handleBackward={this.handleBackward}
          handleForward={this.handleForward} />
        <Navigator currentDate={navigationStore.currentDate} navigateUnit={navigationStore.navigationUnit} />
      </React.Fragment>
    );
  }
}

export default NavigatorContainer;
