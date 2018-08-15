import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { DateNavigationStore } from '../stores/dateNavigationStore';
import Navigator from '../components/Navigator';
import NavigateButtons from '../components/NavigateButtons';
import NavigateUnitSelect from '../components/NavigateUnitSelect';
import * as dayjs from 'dayjs';

interface IPropsInjected {
  dateNavigationStore: DateNavigationStore;
}

@inject('dateNavigationStore')
@observer
class NavigatorContainer extends React.Component {
  handleBackward = () => {
    this.injected.dateNavigationStore.backward();
  }

  handleForward = () => {
    this.injected.dateNavigationStore.forward();
  }

  handleUnitChange = (unit: dayjs.UnitType) => {
    this.injected.dateNavigationStore.navigationUnit = unit;
  }

  get injected() {
    return this.props as IPropsInjected;
  }

  render() {
    const { dateNavigationStore: store } = this.injected;

    return (
      <React.Fragment>
        <NavigateButtons
          handleBackward={this.handleBackward}
          handleForward={this.handleForward} />
        <Navigator currentDate={store.currentDate} navigateUnit={store.navigationUnit} />
        <NavigateUnitSelect
          navigateUnit={store.navigationUnit}
          handleChange={this.handleUnitChange} />
      </React.Fragment>
    );
  }
}

export default NavigatorContainer;
